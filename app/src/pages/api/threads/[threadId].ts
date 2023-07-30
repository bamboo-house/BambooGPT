import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGateway } from '@/backend/infrastructure/chatGateway';
import { ThreadGateway } from '@/backend/infrastructure/threadGateway';
import { verifyAndAuthenticateUser } from '@/backend/utils/verifyAndAuthenticateUser';
import { ResGetThread } from '@/bff/types/thread';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // headersの取得・認証
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res.status(400).json({ success: false, message: '無効なリクエストです' });
    }
    await verifyAndAuthenticateUser(idToken as string);

    const threadGateway = new ThreadGateway();
    const chatGateway = new ChatGateway();
    const threadId = req.query.threadId as string;

    switch (req.method) {
      case 'GET':
        const threadRecord = await threadGateway.get(threadId);
        if (threadRecord === undefined) {
          res.status(400).json({ error: { message: 'スレッドが存在しません' } });
          break;
        }

        const resGetBody: ResGetThread = {
          body: { threadId: threadRecord.threadId, name: threadRecord.name },
        };
        res.status(200).json(resGetBody);
        break;
      case 'DELETE':
        /* 
          threadを削除するとき、threadに紐づくchatも削除しても良い。
          「threadは削除されているが、chatは残っている」という状態は、ビジネス的にもないため。（フロントでリクエストを分けることもない）
          ThreadGateWayでchat削除しないのは、ThreadGatewayはthreadに対してのみ操作対象とするため。
        */
        await threadGateway.delete(threadId);
        await chatGateway.deleteAllByThreadId(threadId);
        res.status(200).json({ success: true });
        break;
      default:
        res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e.message } });
  }
}
