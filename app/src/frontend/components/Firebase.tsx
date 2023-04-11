import { initializeApp, getApps } from 'firebase/app';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserState';
import { useAuth } from '../utils/googleAuth';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

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

export const Firebase = () => {
  const { loginWithGoogle, logout } = useAuth();
  const currentUser = useRecoilValue(currentUserState);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log('authchanged', user);
  //       setCurrentUser({
  //         uid: user.uid,
  //         name: user.displayName,
  //         photoURL: user.photoURL,
  //       });
  //     } else {
  //       console.log('なし');
  //     }
  //   });
  //   console.log('currentUser', auth.currentUser);
  //   return unsubscribe;
  // }, []);

  return (
    <>
      <button
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={logout}
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
          onClick={loginWithGoogle}
        >
          Googleでログイン
        </button>
      )}
    </>
  );
};
