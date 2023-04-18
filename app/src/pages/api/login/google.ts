import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { initializeFirebase } from '@/backend/openai/infrastructure/initializeFirebase';
import { UsersGateway } from '@/backend/openai/infrastructure/usersGateway';
import { GoogleUserInfo, User } from '@/bff/types/firestore/usersCollection';
import { ReqLoginGoogle, ResLoginGoogle } from '@/bff/types/login';

// api/login/googleの理由は、twitterやfacebookなどのログインも増える可能性を考慮するため
// あと、loginは割と特殊な処理なので、api/login/以下にまとめておきたい
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    initializeFirebase();
    // リクエストボディの取得
    const reqBody: ReqLoginGoogle = req.body;
    const googleUserInfo: GoogleUserInfo = reqBody.googleUserInfo;

    try {
      // IDトークンの検証
      const decodedToken = await getAuth().verifyIdToken(googleUserInfo.idToken);
      const { uid } = decodedToken;
      if (uid !== googleUserInfo.uid) {
        throw new Error('IDトークンの検証に失敗しました');
      }

      const firestore = getFirestore();
      const usersCollectionRef = firestore.collection('users');
      const userDocRef = usersCollectionRef.doc(uid);

      let name;
      let image;

      const usersGateway = new UsersGateway();
      const user = await usersGateway.getUser(uid);
      console.log(user)

      usersGateway.create(uid, googleUserInfo.displayName, null, googleUserInfo.photoURL, googleUserInfo);


      // await userDocRef.get().then((docSnapshot) => {
      //   console.log('docSnapshot', docSnapshot.data());
      //   if (docSnapshot.exists) {
      //     // TODO: GoogleUserInfoが変更されていたら、その変更を反映する
      //     const data = docSnapshot.data() as User;
      //     // nameとimageを保持する
      //     name = data.name;
      //     image = data.image;
      //   } else {
      //     userDocRef.set({
      //       name: googleUserInfo.displayName,
      //       description: null,
      //       image: googleUserInfo.photoURL,
      //       googleUserInfo: googleUserInfo,
      //     });
      //     // nameとimgaeを保持する
      //     name = googleUserInfo.displayName;
      //     image = googleUserInfo.photoURL;
      //   }
      // });

      const resBody: ResLoginGoogle = { 
        body: {
          name: name || '',
          image: image || '',
        }
      };

      res.status(200).json(resBody);
    } catch (e) {
      res.status(500).json({ error: { message: e.message } });
    }
  } else {
    res.status(400).json({ error: { message: '無効なリクエストです' } });
  }
}
