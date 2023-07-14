import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { useFirebaseAuth } from './useFirebaseAuth.ts';

// Todo: 2023/7/14 idTokenはcurrentUserStateで管理しない、
// アクセスした時一番にcurrentUserを埋める、埋めれない場合はログイン画面に遷移する

export const useCurrentUserSetter = () => {
  const auth = getAuth();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('authchanged', user);
        await user
          .getIdToken()
          .then((token) => {
            setCurrentUser({
              uid: user.uid,
              name: user.displayName,
              image: user.photoURL,
              idToken: token,
            });
          })
          .catch((error) => {
            console.error(error);
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
