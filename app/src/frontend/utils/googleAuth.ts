// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// export const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_AMESUREMENT_ID,
// };

// export const handleGoogleLogin = async () => {
//   const provider = new GoogleAuthProvider();
//   try {
//     const result: any = await signInWithPopup(auth, provider);
//     console.log(result.user);
//   } catch (error) {
//     console.log(error);
//   }
//   setCurrentUser(result.user.displayName);
// };

// export const handleLogout = async () => {
//   await signOut(auth)
//     .then(() => {
//       console.log('ログアウトしました');
//     })
//     .catch((e) => {
//       alert('ログアウトに失敗しました');
//       console.log(e);
//     });

//   setCurrentUser(null);
// };
