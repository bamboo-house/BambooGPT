import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';
import { ReqLoginGoogle, ResLoginGoogle } from '@/bff/types/login';

export const useFirebaseAuth = () => {
  const auth = getAuth();
  const setCurrentUser = useSetRecoilState(currentUserState);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      // ログイン成功時にサーバーサイドのAPIにIDトークンを送信
      const idToken = await result.user.getIdToken(true);
      console.log('ログインに成功しました', idToken);

      const metadata: any = result.user.metadata;
      const googleUserInfo: GoogleUserInfo = {
        displayName: result.user.displayName,
        email: result.user.email,
        phoneNumber: result.user.phoneNumber,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
        providerId: result.user.providerId,
        createdAt: metadata.createdAt,
        creationTime: metadata.creationTime,
        lastLoginAt: metadata.lastLoginAt,
        lastSignInTime: metadata.lastSignInTime,
        lastRefreshAt: metadata.lastRefreshAt,
      };
      const reqBody: ReqLoginGoogle = { googleUserInfo };

      const response = await fetch('/api/login/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(reqBody),
      });

      // ログイン成功の処理
      const resBody: ResLoginGoogle = await response.json();
      console.log('resBody', resBody);

      if (resBody.body) {
        setCurrentUser({
          uid: result.user.uid,
          name: resBody.body.name,
          image: resBody.body.image,
          idToken: idToken,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        console.log('ログアウトしました');
      })
      .catch((e) => {
        alert('ログアウトに失敗しました');
        console.log(e);
      });

    setCurrentUser({
      uid: '',
      name: null,
      image: null,
      idToken: '',
    });
  };

  return { loginWithGoogle, logout };
};
