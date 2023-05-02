// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  Firestore,
  DocumentReference,
  getDoc,
} from 'firebase/firestore/lite';

import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeFirebase } from '@/backend/openai/infrastructure/initializeFirebase';

// クライアントサイドからのGoogleログイン処理
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // initializeFirebase();
  console.log('=====================================');
  console.log(req.body);
  if (req.method === 'POST') {
    // クライアントサイドから送信されたIDトークンを取得
    const { uid } = req.body;

    try {
      // console.log(apps);
      // Firestoreへの操作を行う（例: ドキュメントの作成）
      const db: Firestore = getFirestore();
      const userRef: DocumentReference = doc(db, 'users', uid);
      // console.log(user);

      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        console.log('Document data:', docSnapshot.data());
      } else {
        console.log('No such document!');
      }

      // レスポンスを返す
      res.status(200).json({ success: true, message: 'Firestore操作が完了しました' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'サーバーエラーが発生しました' });
    }
  } else {
    res.status(400).json({ success: false, message: '無効なリクエストです' });
  }
}
