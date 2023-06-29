import { getAuth } from '@firebase/auth';
import Head from 'next/head';
import React, { use, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SWRConfig } from 'swr';
import { ResPostThread } from '@/bff/types/thread';
import { Firebase } from '@/frontend/components/Firebase';
import { Form } from '@/frontend/components/Form';
import { TestSWR } from '@/frontend/components/TestSWR';
import { currentUserState } from '@/frontend/globalStates/atoms/currentUserAtom';
import { threadListState } from '@/frontend/globalStates/atoms/threadAtom';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [result, setResult] = useState('');
  const [threadList, setThreadList] = useRecoilState(threadListState);

  const handleAccumulatingResult = (text: string) => {
    setResult((prevResult) => prevResult + text);
  };

  // Todo: これは後々削除する
  // ======================================================================================
  const showThreadList = async () => {
    console.log('threadList', threadList);
  };

  const getThread = async () => {
    const user = getAuth().currentUser;
    if (!user) {
      return;
    }
    const idToken = await user.getIdToken();
    // console.log('idToken', idToken);

    // const response = await fetch(`/api/threads/${threadList[0].threadId}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${idToken}`,
    //   },
    // });

    const response = await fetch('/api/threads', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    const resBody: ResPostThread = await response.json();
    console.log('resBody of getThread:', resBody);
  };

  const createThread = async () => {
    // idTokenを取得するが、これは後々クッキーで管理すべき

    const user = getAuth().currentUser;
    if (!user) {
      return;
    }
    const idToken = await user.getIdToken();
    // console.log('idToken', idToken);

    const response = await fetch('/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    const resBody: ResPostThread = await response.json();
    console.log('resBody of createThread:', resBody);

    setThreadList((prevThreadList: any) => [...prevThreadList, resBody.body]);
  };
  // ======================================================================================

  return (
    <>
      <Head>
        <title>BambooGPT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bamboogpt_icon.png" />
      </Head>

      <div className="mx-10">
        <Form onChangeResult={handleAccumulatingResult} />
        <div style={{ whiteSpace: 'pre-line' }}>{result}</div>
      </div>

      <SWRConfig>
        <TestSWR threadList={threadList} />
      </SWRConfig>
      <button
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={createThread}
      >
        thread作る
      </button>

      <button
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={getThread}
      >
        thread取得する
      </button>

      <button
        className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={showThreadList}
      >
        showThreadList
      </button>

      <Firebase />
    </>
  );
}
