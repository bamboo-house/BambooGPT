// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getFirestore,
  doc,
  getDoc,
  Firestore,
  DocumentReference,
  collection,
  setDoc,
} from '@firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAndAuthForFirestore } from '@/backend/utils/verifyAndAuthForFirestore';

// クライアントサイドからのGoogleログイン処理
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('process.env', process.env.NODE_ENV);
  if (req.method === 'POST') {
    // クライアントサイドから送信されたIDトークンを取得
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      res.status(400).json({ success: false, message: '無効なリクエストです' });
    }
    const user = await verifyAndAuthForFirestore(idToken as string);
    console.log(user.uid);

    try {
      const threadCol = collection(getFirestore(), 'threads');
      const threadDoc = doc(threadCol, 'testtest');
      await setDoc(threadDoc, {
        user: 'unko',
      });

      res.status(200).json({ success: true, message: 'Firestore操作が完了しました' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'サーバーエラーが発生しました' });
    }
  } else {
    res.status(400).json({ success: false, message: '無効なリクエストです' });
  }
}
