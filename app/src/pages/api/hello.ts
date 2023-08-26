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
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { initializeFirebaseForBE } from '@/backend/utils/initializeFirebaseForBE';
import prisma from '@/backend/utils/prisma';
import { verifyAndAuthenticateUser } from '@/backend/utils/verifyAndAuthenticateUser';

// クライアントサイドからのGoogleログイン処理
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // クライアントサイドから送信されたIDトークンを取得
    // const idToken = req.headers.authorization?.split('Bearer ')[1];
    // if (!idToken) {
    //   res.status(400).json({ success: false, message: '無効なリクエストです' });
    // }

    const session = await getServerSession(req, res, authOptions);
    console.log('sessionですよー');
    console.dir(session);
    const token = await getToken({ req });
    console.log('tokenですよー');
    console.dir(token);

    // const user = await verifyAndAuthenticateUser(idToken as string);

    try {
      // const threadCol = collection(getFirestore(), 'threads');
      // const threadDoc = doc(threadCol, 'testtest');
      // await setDoc(threadDoc, {
      //   user: 'unko',
      // });

      const user = await prisma.user.findMany();

      console.dir(user);

      res.status(200).json({ success: true, message: 'Firestore操作が完了しました' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'サーバーエラーが発生しました' });
    }
  } else {
    res.status(400).json({ success: false, message: '無効なリクエストです' });
  }
}
