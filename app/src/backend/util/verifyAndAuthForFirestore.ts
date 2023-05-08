import { getAuth, signInWithCustomToken } from 'firebase/auth';
import * as admin from 'firebase-admin';

export const verifyAndAuthForFirestore = async (idToken: string) => {
  // クライアントサイドから送信されたJWTトークンを検証
  const adminAuth = admin.auth();
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  const { uid } = decodedToken;

  // カスタムトークンを作成
  const customToken = await adminAuth.createCustomToken(uid);

  // firebase authで認証
  const auth = getAuth();
  await signInWithCustomToken(auth, customToken);
};
