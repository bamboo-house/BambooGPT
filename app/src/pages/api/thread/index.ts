import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { ThreadGateway } from '@/backend/infrastructure/threadGateway';
import { verifyAndAuthForFirestore } from '@/backend/utils/verifyAndAuthForFirestore';
import { ResPostThread } from '@/bff/types/thread';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      res.status(400).json({ success: false, message: '無効なリクエストです' });
    }
    const user = await verifyAndAuthForFirestore(idToken as string);
    console.log(user.uid);

    switch (req.method) {
      case 'GET':
        const collection1 = collection(getFirestore(), 'threads');
        const threadDocSnapshot = await getDoc(doc(collection1, '9apVCtuea8PVkgnpOAP2'));
        console.log('threadDocSnapshot', threadDocSnapshot.data());

        break;

      case 'POST':
        // スレッドのドキュメント作成する
        // create
        const threadGateway = new ThreadGateway();
        const threadRecord = await threadGateway.create(user.uid, 'new thread');

        // スレッドのドキュメントIDを返す
        const resBody: ResPostThread = {
          body: {
            threadId: threadRecord.threadId,
            name: threadRecord.name,
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
