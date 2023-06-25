import { NextApiRequest, NextApiResponse } from 'next';
import { ThreadGateway } from '@/backend/infrastructure/threadGateway';
import { verifyAndAuthenticateUser } from '@/backend/utils/verifyAndAuthenticateUser';
import { ResGetThreadThreadId } from '@/bff/types/thread';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // headersの取得・認証
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      res.status(400).json({ success: false, message: '無効なリクエストです' });
    }
    await verifyAndAuthenticateUser(idToken as string);

    const threadGateway = new ThreadGateway();

    switch (req.method) {
      case 'GET':
        const threadId = req.query.threadId as string;
        const threadRecord = await threadGateway.get(threadId);
        if (threadRecord === undefined) {
          res.status(400).json({ error: { message: 'スレッドが存在しません' } });
          break;
        }

        const resGetBody: ResGetThreadThreadId = {
          body: { threadId: threadRecord.threadId, name: threadRecord.name },
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
