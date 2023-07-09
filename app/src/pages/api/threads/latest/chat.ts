import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGateway } from '@/backend/infrastructure/chatGateway';
import { ThreadGateway } from '@/backend/infrastructure/threadGateway';
import { verifyAndAuthenticateUser } from '@/backend/utils/verifyAndAuthenticateUser';

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

        let result: { threadId: string; name: string; chatId: string }[] = [];
        let chatId: string = '';
        // ループの中で非同期の解決を行うために、for ofを使う。forEachは非同期の解決を行わない。
        for (const threadRecord of threadRecords) {
          chatId = await chatGateway.getLatestChatIdByThread(threadRecord.docRef);
          if (chatId) {
            result.push({
              threadId: threadRecord.threadId,
              name: threadRecord.name,
              chatId: chatId,
            });
          }
        }

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
