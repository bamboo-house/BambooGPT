import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';
import { ReqLoginGoogle, ResLoginGoogle } from '@/bff/types/login';

export const useCurrentUserSetter = () => {
  const auth = getAuth();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('authchanged', user);
        const idToken = await user.getIdToken();
        setCurrentUser({
          uid: user.uid,
          name: user.displayName,
          image: user.photoURL,
          idToken: idToken,
        });
      } else {
        console.log('not logged in');
        // ログインしていない場合はログイン画面に遷移する
        // Todo:2023/6/23 AppWrapperで実行しているので全てのページでリダイレクトする仕様だが、ページによって処理を変える場合は、カスタムフックなどでカプセル化する
        router.push('/login');
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
