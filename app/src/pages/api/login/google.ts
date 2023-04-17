import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { initializeFirebase } from '@/backend/openai/infrastructure/initializeFirebase';

type GoogleUserInfo = {
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

type User = {
  name: string;
  description: string | null;
  image: string;
  googleUserInfo: GoogleUserInfo;
};

type ReqLoginGoogleBody = {
  googleUserInfo: GoogleUserInfo;
};

type ResLoginGoogle = {
  name: string;
  image: string;
};

// api/login/googleの理由は、twitterやfacebookなどのログインも増える可能性を考慮するため
// あと、loginは割と特殊な処理なので、api/login/以下にまとめておきたい
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  initializeFirebase();
  const body: ReqLoginGoogleBody = req.body;

  if (req.method === 'POST') {
    const googleUserInfo: GoogleUserInfo = req.body.googleUserInfo;

    try {
      // IDトークンを検証して認証情報を取得
      const decodedToken = await getAuth().verifyIdToken(googleUserInfo.idToken);
      const { uid } = decodedToken;

      if (uid !== googleUserInfo.uid) {
        throw new Error('IDトークンの検証に失敗しました');
      }

      const firestore = getFirestore();
      const userRef = firestore.collection('users').doc(uid);

      let name;
      let image;
      await userRef.get().then((docSnapshot) => {
        console.log('docSnapshot', docSnapshot.exists);
        if (docSnapshot.exists) {
          // TODO: GoogleUserInfoが変更されていたら、その変更を反映する
          const data = docSnapshot.data() as User;
          // nameとimageを保持する
          name = data.name;
          image = data.image;
        } else {
          userRef.set({
            name: googleUserInfo.displayName,
            description: null,
            image: googleUserInfo.photoURL,
            googleUserInfo: googleUserInfo,
          });
          // nameとimgaeを保持する
          name = googleUserInfo.displayName;
          image = googleUserInfo.photoURL;
        }
      });

      const resBody: ResLoginGoogle = {
        name: name || '',
        image: image || '',
      };

      res.status(200).json(resBody);
    } catch (e) {
      res.status(500).json({ error: { message: e.message } });
    }
  } else {
    res.status(400).json({ error: { message: '無効なリクエストです' } });
  }
}
