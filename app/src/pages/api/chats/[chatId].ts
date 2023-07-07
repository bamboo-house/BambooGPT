import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGateway } from '@/backend/infrastructure/chatGateway';
import { ThreadGateway } from '@/backend/infrastructure/threadGateway';
import { verifyAndAuthenticateUser } from '@/backend/utils/verifyAndAuthenticateUser';
import { ResGetChat } from '@/bff/types/chat';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // headersの取得・認証
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      return res.status(400).json({ success: false, message: '無効なリクエストです' });
    }
    await verifyAndAuthenticateUser(idToken as string);

    const chatGateway = new ChatGateway();

    switch (req.method) {
      case 'GET':
        const chatId = req.query.chatId as string;
        const chatRecord = await chatGateway.get(chatId);

        if (chatRecord === undefined) {
          res.status(400).json({ error: { message: 'chatが存在しません' } });
          break;
        }

        const resGetBody: ResGetChat = {
          body: {
            chatId: chatRecord.chatId,
            uid: chatRecord.user.id,
            threadId: chatRecord.thread.id,
            chatContent: chatRecord.chatContent,
          },
        };
        res.status(200).json(resGetBody);
        break;
      default:
        res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e.toString() } });
  }
}
