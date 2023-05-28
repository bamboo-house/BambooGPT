import { getAuth } from '@firebase/auth';
import Head from 'next/head';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ResPostThread } from '@/bff/types/thread';
import { Firebase } from '@/frontend/components/Firebase';
import { Form } from '@/frontend/components/Form';
import { currentUserState } from '@/frontend/globalStates/atoms/currentUserAtom';
import { threadListState } from '@/frontend/globalStates/atoms/threadAtom';
import { useCurrentUserSetter } from '@/frontend/utils/firebaseAuth';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [result, setResult] = useState('');

  // ユーザーを指定
  useCurrentUserSetter();

  const handleAccumulatingResult = (text: string) => {
    setResult((prevResult) => prevResult + text);
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
        onClick={() => {
          console.log('test');
        }}
      >
        thread作る
      </button>

      <button
        className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
        onClick={() => {
          console.log('test');
        }}
      >
        thread取得する
      </button>

      <button
        className="rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-red-700"
        onClick={() => {
          console.log('test');
        }}
      >
        sample
      </button>

      <Firebase />
    </>
  );
}
