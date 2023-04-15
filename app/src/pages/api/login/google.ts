import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { initializeFirebase } from '@/backend/openai/infrastructure/initializeFirebase';

type User = {
  idToken: string;
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
  providerId: string;
  createdAt: string;
  creationTime: string;
  lastLoginAt: string;
  lastSignInTime: string;
  lastRefreshAt: string;
};

// api/login/googleの理由は、twitterやfacebookなどのログインも増える可能性を考慮するため
// あと、loginは割と特殊な処理なので、api/login/以下にまとめておきたい
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // firebase初期化
  initializeFirebase();
  // IdToken検証する
  if (req.method === 'POST') {
    // クライアントサイドから送信されたIDトークンを取得
    const user = req.body.user;
    console.log(user);

    try {
      // IDトークンを検証して認証情報を取得
      const decodedToken = await getAuth().verifyIdToken(user.idToken);
      const { uid } = decodedToken;

      if (uid !== user.uid) {
        res.status(400).json({ success: false, message: '無効なリクエストです' });
      }

      // usersドキュメントに登録されているか確認する
      //  されている場合は
      //    - フィールドを取得する
      //  されてない場合は
      //    - usersコレクションにドキュメント追加する
      // フィールド情報を返す
      //  - name
      //  - email
      // Firestoreへの操作を行う（例: ドキュメントの作成）
      // const firestore = getFirestore();
      // await firestore.collection('users').doc(uid).set({ email });

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
