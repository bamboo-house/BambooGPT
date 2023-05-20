import { NextApiRequest, NextApiResponse } from 'next';
import { ThreadGateway } from '@/backend/infrastructure/threadGateway';
import { verifyAndAuthForFirestore } from '@/backend/utils/verifyAndAuthForFirestore';
import { ResGetThread, ResPostThread } from '@/bff/types/thread';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
    const user = await verifyAndAuthForFirestore(idToken as string);
    const threadGateway = new ThreadGateway();

    switch (req.method) {
      case 'GET':
        const threadRecords = await threadGateway.getAll(user.uid);
        const result = threadRecords.map((threadRecord) => {
          return { threadId: threadRecord.threadId, name: threadRecord.name };
        });

        const resGetBody: ResGetThread = {
          body: result,
        };
        res.status(200).json(resGetBody);
        break;
      case 'POST':
        const threadRecord = await threadGateway.create(user.uid, 'new thread');

        const resPostBody: ResPostThread = {
          body: {
            threadId: threadRecord.threadId,
            name: threadRecord.name,
          },
        };
        res.status(200).json(resPostBody);
        break;

      default:
        res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
  } catch (e) {
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e } });
  }
}