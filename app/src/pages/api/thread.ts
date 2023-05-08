import { NextApiRequest, NextApiResponse } from 'next';
import { ThreadGateway } from '@/backend/openai/infrastructure/threadGateway';
import { ResPostThread } from '@/bff/types/thread';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        break;

      case 'POST':
        console.log('==================================');
        console.log('req', req);
        console.log('==================================');

        const reqBody = req.body;
        console.log('reqBody', reqBody);

        // スレッドのドキュメント作成する
        // create
        // const threadGateway = new ThreadGateway();
        // const threadRecord = await threadGateway.create();

        // スレッドのドキュメントIDを返す
        const resBody: ResPostThread = {
          body: {
            threadId: 'testtest',
            name: 'shuto',
          },
        };

        res.status(200).json(resBody);
        break;

      default:
        res.status(400).json({ error: { message: '無効なリクエストです' } });
    }
  } catch (e) {
    console.error('Error(500): ', e.message);
    res.status(500).json({ error: { message: e.message } });
  }
}
