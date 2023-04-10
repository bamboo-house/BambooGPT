import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserState';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_AMESUREMENT_ID,
};

// Initialize Firebase
// const analytics = getAnalytics(app);
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const Firebase = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const auth = getAuth();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result: any = await signInWithPopup(auth, provider);
      console.log(result.user);
      setCurrentUser({
        uid: result.user.uid,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
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

  return (
    <>
      <button
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={handleLogout}
      >
        ログアウト
      </button>
      {currentUser.uid ? (
        <div>
          <p>
            ログインしました:{currentUser.name}, {currentUser.uid}
          </p>
        </div>
      ) : (
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={handleGoogleLogin}
        >
          Googleでログイン
        </button>
      )}
    </>
  );
};
