// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectFirestore } from '@/backend/openai/infrastructure/connectFirestore';

// クライアントサイドからのGoogleログイン処理
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  connectFirestore();
  console.log('=====================================');
  console.log(req.body);
  if (req.method === 'POST') {
    // クライアントサイドから送信されたIDトークンを取得
    const { idToken } = req.body;

    try {
      // IDトークンを検証して認証情報を取得
      const decodedToken = await getAuth().verifyIdToken(idToken);
      const { uid, email } = decodedToken;
      console.log('uid:', uid);
      console.log('email:', email);

      // Firestoreへの操作を行う（例: ドキュメントの作成）
      const firestore = getFirestore();
      await firestore.collection('users').doc(uid).set({ email });

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
