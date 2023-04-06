import { initializeApp, getApps } from 'firebase/app';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  Auth,
} from 'firebase/auth';
import { useEffect, useState } from 'react';

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
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const auth = getAuth();
      const result: any = await signInWithPopup(auth, provider);
      console.log(result.user);
      setUser(result.user.displayName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    console.log('getApps()', getApps());

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('authchanged', user);
      } else {
        console.log('なし');
      }
    });
    console.log('currentUser', auth.currentUser);

    // const user: any = currentUser(auth);
    // if (user) {
    //   console.log('current', user);
    // } else {
    //   console.log('なし');
    // }
  }, []);
  return (
    <>
      {user ? (
        <p>ログインしました: {user}</p>
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
