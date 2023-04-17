import { GoogleAuthProvider, UserMetadata, getAuth, signInWithPopup } from 'firebase/auth';
import Head from 'next/head';
import React, { useState } from 'react';
import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';
import { ReqLoginGoogle, ResLoginGoogle } from '@/bff/types/login';
import { Firebase } from '@/frontend/components/Firebase';
import { Form } from '@/frontend/components/Form';
import { useCurrentUserSetter } from '@/frontend/utils/firebaseAuth';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [result, setResult] = useState('');

  // ユーザーを指定
  useCurrentUserSetter();

  const handleAccumulatingResult = (text: string) => {
    setResult((prevResult) => prevResult + text);
  };

  const handleHelloGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // ログイン成功時にサーバーサイドのAPIにIDトークンを送信
      const idToken = await result.user.getIdToken(true);

      const metadata: any = result.user.metadata;
      const googleUserInfo: GoogleUserInfo = {
        idToken: idToken,
        displayName: result.user.displayName,
        email: result.user.email,
        phoneNumber: result.user.phoneNumber,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
        providerId: result.user.providerId,
        createdAt: metadata.createdAt,
        creationTime: metadata.creationTime,
        lastLoginAt: metadata.lastLoginAt,
        lastSignInTime: metadata.lastSignInTime,
        lastRefreshAt: metadata.lastRefreshAt,
      };
      const reqBody: ReqLoginGoogle = { googleUserInfo };

      const response = await fetch('/api/login/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });

      // ログイン成功の処理
      const resBody: ResLoginGoogle = await response.json();
      console.log(resBody);
    } catch (error) {
      console.error(error);
      // ログイン失敗の処理
    }
  };

  return (
    <>
      <Head>
        <title>BambooGPT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bamboogpt-icon.png" />
      </Head>

      <div className="mx-10">
        <Form onChangeResult={handleAccumulatingResult} />
        <div style={{ whiteSpace: 'pre-line' }}>{result}</div>
      </div>

      <button onClick={handleHelloGoogleLogin}>butom</button>

      <Firebase />
    </>
  );
}
