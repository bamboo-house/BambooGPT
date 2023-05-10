import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getFirestore, doc, getDoc, Firestore, DocumentReference } from '@firebase/firestore';
import Head from 'next/head';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ResPostThread } from '@/bff/types/thread';
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

  const hello = async () => {
    // idTokenを取得するが、これは後々クッキーで管理すべき

    const user = getAuth().currentUser;
    if (!user) {
      return;
    }
    const idToken = await user.getIdToken();

    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    const resBody: ResPostThread = await response.json();
    console.log('resBody of createThread:', resBody);
  };

  const createThread = async () => {
    // idTokenを取得するが、これは後々クッキーで管理すべき

    const user = getAuth().currentUser;
    if (!user) {
      return;
    }
    const idToken = await user.getIdToken();
    // console.log('idToken', idToken);

    const response = await fetch('/api/thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    const resBody: ResPostThread = await response.json();
    console.log('resBody of createThread:', resBody);
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
        onClick={hello}
      >
        thread作る
      </button>

      <Firebase />
    </>
  );
}
