import Head from 'next/head';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ReqCreateThread, ResCreateThread } from '@/bff/types/thread';
import { Firebase } from '@/frontend/components/Firebase';
import { Form } from '@/frontend/components/Form';
import { currentUserState } from '@/frontend/globalStates/atoms/currentUserAtom';
import { useCurrentUserSetter } from '@/frontend/utils/firebaseAuth';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [result, setResult] = useState('');

  const currentUser = useRecoilValue(currentUserState);

  // ユーザーを指定
  useCurrentUserSetter();

  const handleAccumulatingResult = (text: string) => {
    setResult((prevResult) => prevResult + text);
  };

  const firebaseYaru = async () => {
    // if (!currentUser.uid) {
    //   // TODO: ログインしていない場合なので、ログイン画面に飛ばす
    //   return;
    // }
    // const reqBody: ReqCreateThread = { uid: currentUser.uid };

    const reqBody = { uid: '77bYuSRZs2YzWp4GdFOuKgBdCOw2' };

    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });
    // const resBody: ResCreateThread = await response.json();
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

      <button
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
        onClick={firebaseYaru}
      >
        firebaseやるべ
      </button>

      <Firebase />
    </>
  );
}
