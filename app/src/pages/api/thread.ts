import { NextApiRequest, NextApiResponse } from 'next';
import { ThreadGateway } from '@/backend/openai/infrastructure/threadGateway';
import { ResCreateThread } from '@/bff/types/thread';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: { message: '無効なリクエストです' } });
  } else if (!req.body.uid) {
    res.status(400).json({ error: { message: '無効なユーザーです' } });
  }
  try {
    const uid = req.body.uid;

    // スレッドのドキュメント作成する
    // create
    const threadGateway = new ThreadGateway();
    const threadRecord = await threadGateway.create(uid);

    // スレッドのドキュメントIDを返す

    const resBody: ResCreateThread = {
      body: {
        threadId: threadRecord.threadId,
      },
    };

    res.status(200).json(resBody);
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
}
