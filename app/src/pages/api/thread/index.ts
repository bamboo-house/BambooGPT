import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
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
        // threadの全てを返すようにする
        // => [{threadId: 'threadId', name: 'threadName'}, ...}]

        // userがusers/uidに該当するthreadを全て取得する

        const userDocRef = doc(getFirestore(), 'users', user.uid);

        const q = query(collection(getFirestore(), 'threads'), where('name', '==', 'new thread'));

        const threadDocSnapshot = await getDocs(q);
        threadDocSnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
        });

        res.status(200).json({ success: true, message: 'GETリクエストが成功しました' });
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
    console.error('Error(500): ', e);
    res.status(500).json({ error: { message: e } });
  }
}
