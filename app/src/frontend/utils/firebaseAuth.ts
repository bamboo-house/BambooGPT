import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserState';
import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';
import { ReqLoginGoogle, ResLoginGoogle } from '@/bff/types/login';

export const useCurrentUserSetter = () => {
  const auth = getAuth();
  const setCurrentUser = useSetRecoilState(currentUserState);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('authchanged', user);
        setCurrentUser({
          uid: user.uid,
          name: user.displayName,
          image: user.photoURL,
        });
      } else {
        console.log('なし');
      }
    });
    console.log('currentUser', auth.currentUser);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useFirebaseAuth = () => {
  const auth = getAuth();
  const setCurrentUser = useSetRecoilState(currentUserState);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result: any = await signInWithPopup(auth, provider);
      // ログイン成功時にサーバーサイドのAPIにIDトークンを送信
      const idToken = await result.user.getIdToken(true);

      const metadata: any = result.user.metadata;
      const googleUserInfo: GoogleUserInfo = {
        idToken: idToken,
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
        },
        body: JSON.stringify(reqBody),
      });

      // ログイン成功の処理
      const resBody: ResLoginGoogle = await response.json();
      console.log(reqBody);

      // console.log(result.user);
      if (resBody.body) {
        setCurrentUser({
          uid: result.user.uid,
          name: resBody.body.name,
          image: resBody.body.image,
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
      uid: null,
      name: null,
      image: null,
    });
  };

  return { loginWithGoogle, logout };
};
