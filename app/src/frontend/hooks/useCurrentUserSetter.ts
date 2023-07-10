import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { useFirebaseAuth } from './useFirebaseAuth.ts';

export const useCurrentUserSetter = () => {
  const auth = getAuth();
  const setCurrentUser = useSetRecoilState(currentUserState);
  const { logout } = useFirebaseAuth();
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
