import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import Head from 'next/head';
import React, { useState } from 'react';
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
      const result: any = await signInWithPopup(auth, provider);
      // ログイン成功時にサーバーサイドのAPIにIDトークンを送信
      const idToken = await result.user.getIdToken(true);
      console.log(idToken);
      const response = await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      // ログイン成功の処理
      const data = await response.json();
      console.log(data);
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

      <Firebase />
    </>
  );
}
