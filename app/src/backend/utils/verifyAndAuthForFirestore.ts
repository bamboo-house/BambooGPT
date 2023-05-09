import { User, getAuth, signInWithCustomToken } from 'firebase/auth';
import * as admin from 'firebase-admin';
import { initializeFirebaseForBE } from './initializeFirebaseForBE';

export const verifyAndAuthForFirestore = async (idToken: string): Promise<User> => {
  initializeFirebaseForBE();

  // クライアントサイドから送信されたJWTトークンを検証
  const adminAuth = admin.auth();
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  const { uid } = decodedToken;
  console.log('トークン検証成功');

  // カスタムトークンを作成
  const customToken = await adminAuth.createCustomToken(uid);

  // firebase authで認証
  const auth = getAuth();
  const usercredential = await signInWithCustomToken(auth, customToken);
  const user = usercredential.user;
  console.log('firebase authで認証成功');
  return user;
};
