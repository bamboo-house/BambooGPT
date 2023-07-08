import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGateway } from '@/backend/infrastructure/chatGateway';
import { ThreadGateway } from '@/backend/infrastructure/threadGateway';
import { verifyAndAuthenticateUser } from '@/backend/utils/verifyAndAuthenticateUser';
import { ChatRecord } from '@/backend/infrastructure/chatRecord';

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

    switch (req.method) {
      case 'GET':
        const threadRecords = await threadGateway.getAll(user.uid);
        const threads = threadRecords.map((threadRecord) => {
          return { threadId: threadRecord.threadId, name: threadRecord.name };
        });

        console.log('リクエストきたー');

        // threadId[]からchatRecordsを取得する
        threadRecords.forEach(async (threadRecord) => {
          // console.log(threadRecord.threadId);
          console.log('threadId', threadRecord.threadId);
          let chatRecords = await chatGateway.getWithThread(threadRecord.docRef);
          // chatRecords.forEach((chatRecord) => {
          //   console.log(chatRecord.chatId, chatRecord.updatedAt);
          // });
        });

        const result = '';

        const resGetBody = {
          body: result,
        };
        res.status(200).json(resGetBody);
        break;

      default:
        res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e } });
  }
}
