import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGateway } from '@/backend/infrastructure/chatGateway';
import { ThreadGateway } from '@/backend/infrastructure/threadGateway';
import { ThreadRecord } from '@/backend/infrastructure/threadRecord';
import { verifyAndAuthenticateUser } from '@/backend/utils/verifyAndAuthenticateUser';
import { ReqCreateThread, ResGetThreads, ResPostThread } from '@/bff/types/thread';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // headersの取得・認証
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res.status(400).json({ error: { message: 'idTokenで無効なリクエストです' } });
    }
    const user = await verifyAndAuthenticateUser(idToken as string);

    const threadGateway = new ThreadGateway();
    const chatGateway = new ChatGateway();
    let threadRecords: ThreadRecord[];

    switch (req.method) {
      case 'GET':
        threadRecords = await threadGateway.getAll(user.uid);
        const result = threadRecords.map((threadRecord) => {
          return { threadId: threadRecord.threadId, name: threadRecord.name };
        });

        const resGetBody: ResGetThreads = {
          body: result,
        };
        res.status(200).json(resGetBody);
        break;
      case 'POST':
        const reqBody: ReqCreateThread = req.body;
        const { name } = reqBody;

        const threadRecord = await threadGateway.create(user.uid, name);

        const resPostBody: ResPostThread = {
          body: {
            threadId: threadRecord.threadId,
            name: threadRecord.name,
          },
        };
        res.status(200).json(resPostBody);
        break;
      case 'DELETE':
        /* 
          threadを削除するとき、threadに紐づくchatも削除しても良い。
          「threadは削除されているが、chatは残っている」という状態は、ビジネス的にもないため。（フロントでリクエストを分けることもない）
          ThreadGateWayでchat削除しないのは、ThreadGatewayはthreadに対してのみ操作対象とするため。
        */
        threadRecords = await threadGateway.getAll(user.uid);
        await threadGateway.deleteAll(user.uid);
        threadRecords.forEach(async (threadRecord) => {
          await chatGateway.deleteAllByThreadId(threadRecord.threadId);
        });

      default:
        res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e.message } });
  }
}
