import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserState';
import { useEffect } from 'react';

export const useFirebaseAuthEffect = () => {
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
