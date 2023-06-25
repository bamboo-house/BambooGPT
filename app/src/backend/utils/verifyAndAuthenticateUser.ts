import { User, getAuth, signInWithCustomToken } from 'firebase/auth';
import * as admin from 'firebase-admin';
import { initializeFirebaseForBE } from './initializeFirebaseForBE';

export const verifyAndAuthenticateUser = async (idToken: string): Promise<User> => {
  initializeFirebaseForBE();

  // クライアントサイドから送信されたJWTトークンを検証
  const adminAuth = admin.auth();
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  const { uid } = decodedToken;

  // カスタムトークンを作成
  const customToken = await adminAuth.createCustomToken(uid);

  // firebase authで認証
  const auth = getAuth();
  const usercredential = await signInWithCustomToken(auth, customToken);
  const user = usercredential.user;
  return user;
};
