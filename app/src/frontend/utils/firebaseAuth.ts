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
          photoURL: user.photoURL,
        });
      } else {
        console.log('なし');
      }
    });
    console.log('currentUser', auth.currentUser);
    return unsubscribe;
  }, []);
};

export const useFirebaseAuth = () => {
  const auth = getAuth();
  const setCurrentUser = useSetRecoilState(currentUserState);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result: any = await signInWithPopup(auth, provider);
      // signInWithPopupが成功したら、POSTリクエスト
      // const idToken = await result.user.getIdToken(true);
      // POST /api/login/google { idToken }
      // response => なし？

      console.log(result.user);
      setCurrentUser(result.user.displayName);
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
      photoURL: null,
    });
  };

  return { loginWithGoogle, logout };
};
