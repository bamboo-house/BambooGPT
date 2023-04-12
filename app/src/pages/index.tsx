import React from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { Form } from '@/frontend/components/Form';
import { Firebase } from '@/frontend/components/Firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useAuthEffect } from '@/frontend/utils/googleAuth';

export default function Home() {
  const [result, setResult] = useState('');

  // ユーザーを指定
  useAuthEffect();

  const accumulateResult = (text: string) => {
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
      await fetch('/api/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      // ログイン成功の処理
      console.log('ログイン成功');
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
        <Form onChangeResult={accumulateResult} />
        <div style={{ whiteSpace: 'pre-line' }}>{result}</div>
      </div>

      <button
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
        onClick={handleHelloGoogleLogin}
      >
        Helloボタン
      </button>

      <Firebase />
    </>
  );
}
