// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { getApps } from 'firebase/app';
import { getApps } from '@firebase/app';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getFirestore, doc, getDoc, Firestore, DocumentReference } from '@firebase/firestore';
// import { getAuth } from 'firebase-admin/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeFirebase } from '@/backend/openai/infrastructure/initializeFirebase';

// クライアントサイドからのGoogleログイン処理
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // initializeFirebase();
  console.log('=====================================');
  console.log(req.body);
  if (req.method === 'POST') {
    // クライアントサイドから送信されたIDトークンを取得
    const { uid } = req.body;

    initializeFirebase;
    try {
      // console.log(apps);
      // Firestoreへの操作を行う（例: ドキュメントの作成）
      // const db: Firestore = getFirestore();
      // const userRef: DocumentReference = doc(db, 'users', uid);
      // // console.log(user);

      // const docSnapshot = await getDoc(userRef);
      // if (docSnapshot.exists()) {
      //   console.log('Document data:', docSnapshot.data());
      // } else {
      //   console.log('No such document!');
      // }
      const idToken =
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2h1dG8gVGFrZXVjaGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4WnhycGJ0YmtXUWEtdG55azhMZjdpcjQ4TVlmTFptWUptTk9IVTIxQT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9iYW1ib29ncHQiLCJhdWQiOiJiYW1ib29ncHQiLCJhdXRoX3RpbWUiOjE2ODMwMjA0MDksInVzZXJfaWQiOiJsMmpCMmJIYWFmYVNCOFlQM3dNaUhqd1hPcjMyIiwic3ViIjoibDJqQjJiSGFhZmFTQjhZUDN3TWlIandYT3IzMiIsImlhdCI6MTY4MzAyMDQxMCwiZXhwIjoxNjgzMDI0MDEwLCJlbWFpbCI6InRha2VzaHUwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTc1OTMyMTkyMzI2Mjg0NTQ3MDciXSwiZW1haWwiOlsidGFrZXNodTAwMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.M-KJLOzc69CJlIILsWKo_mE9Y7z2tDozoLLGM5uo0M8G_S83EuadHIxVQmXQHbp6ZVGKM6ex4FJLf1NGpIBfH2RXNK2dkCQhQ_9kLpQKtvX9Ar-sGU9LhKzBeMFG7u2S-mQQ1KHBUQqDnIAgj12hLkE98rLj3Z7weu1ezHZ8jgX5RKWxXf_MIruoExP9H2hHBXrWDJAdg84Bc9vPQ7bliGkf4rLSONFtRvCf4mdm1mKa_ZyLfTeU0G0ggAZ5n8h3auHnOlT29rL7S-d-MRZ8kmGlqURUOlnRkKDU47aSn8H4iX_HAwC4qTar70ziZKi_TOoFHGfrEgZ6JStxLFIjZA';

      const decodedToken = await getAuth().verifyIdToken(idToken);
      const { uid } = decodedToken;
      console.log('uid', decodedToken);
      const auth = await getAuth().getUser(uid);
      console.log('auth', auth);
      // const apps = getApps();
      // console.log(apps);
      // console.log('=====================================');
      // const auth = getAuth(apps[0]);
      // console.log('auth', auth.currentUser);

      // レスポンスを返す
      res.status(200).json({ success: true, message: 'Firestore操作が完了しました' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'サーバーエラーが発生しました' });
    }
  } else {
    res.status(400).json({ success: false, message: '無効なリクエストです' });
  }
}
