import { getAuth, signInWithCustomToken } from '@firebase/auth';
import * as admin from 'firebase-admin';
// import { getAuth } from 'firebase-admin/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { LoginService } from '@/backend/openai/application/loginService';
import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';
import { ReqLoginGoogle, ResLoginGoogle } from '@/bff/types/login';

// api/login/googleの理由は、twitterやfacebookなどのログインも増える可能性を考慮するため
// あと、loginは割と特殊な処理なので、api/login/配下にまとめておきたい
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: { message: '無効なリクエストです' } });
  }

  // headersの取得
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
    res.status(400).json({ success: false, message: '無効なリクエストです' });
  }
  // リクエストボディの取得
  const reqBody: ReqLoginGoogle = req.body;
  const googleUserInfo: GoogleUserInfo = reqBody.googleUserInfo;

  try {
    // TODO：トークン検証と認証の処理、共通化したい
    // クライアントサイドから送信されたJWTトークンを検証
    const adminAuth = admin.auth();
    const decodedToken = await adminAuth.verifyIdToken(idToken as string);
    const { uid } = decodedToken;
    if (uid !== googleUserInfo.uid) {
      console.log('IDトークンの検証に失敗しました');
      throw new Error('IDトークンの検証に失敗しました');
    }
    // カスタムトークンを作成
    const customToken = await adminAuth.createCustomToken(uid);

    // ここからはfirebase/auth
    // firebase authで認証
    const auth = getAuth();
    await signInWithCustomToken(auth, customToken);
    ///////////////////////

    const loginService = new LoginService();
    const user = await loginService.loginWithGoogle(googleUserInfo);

    const resBody: ResLoginGoogle = {
      body: {
        name: user.name || '',
        image: user.image || '',
      },
    };
    console.log('resBody', resBody);

    res.status(200).json(resBody);
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
}
