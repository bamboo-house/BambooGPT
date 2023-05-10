// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  getFirestore,
  doc,
  getDoc,
  Firestore,
  DocumentReference,
  collection,
  setDoc,
} from '@firebase/firestore';
import { connectAuthEmulator, getAuth, signInWithCustomToken } from 'firebase/auth';
import * as admin from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeFirebaseForBE } from '@/backend/utils/initializeFirebaseForBE';
import { verifyAndAuthForFirestore } from '@/backend/utils/verifyAndAuthForFirestore';
import { connectFirestoreEmulator } from 'firebase/firestore';

// クライアントサイドからのGoogleログイン処理
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('process.env', process.env.NODE_ENV);
  if (req.method === 'POST') {
    // クライアントサイドから送信されたIDトークンを取得
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
      res.status(400).json({ success: false, message: '無効なリクエストです' });
    }
    console.log('idToken', idToken);

    initializeFirebaseForBE();

    // クライアントサイドから送信されたJWTトークンを検証
    const adminAuth = admin.auth();
    // console.log('adminAuth', adminAuth);
    // console.log('idToken', idToken);
    const decodedToken = await adminAuth.verifyIdToken(idToken as string);
    // console.log('decodedToken', decodedToken);
    const { uid } = decodedToken;
    console.log('トークン検証成功');

    // カスタムトークンを作成
    const customToken = await adminAuth.createCustomToken(uid);
    // console.log('customToken', customToken);

    console.log('appの名前', admin.app().name);

    // firebase authで認証
    const auth = getAuth();
    console.log('サインインします');
    const usercredential = await signInWithCustomToken(auth, customToken);
    const user = usercredential.user;
    console.log('firebase authで認証成功');

    // try {
    //   const threadCol = collection(getFirestore(), 'threads');
    //   const threadDoc = doc(threadCol, 'testtest');
    //   await setDoc(threadDoc, {
    //     user: 'unko',
    //   });

    //   res.status(200).json({ success: true, message: 'Firestore操作が完了しました' });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ success: false, message: 'サーバーエラーが発生しました' });
    // }
  } else {
    res.status(400).json({ success: false, message: '無効なリクエストです' });
  }
}
