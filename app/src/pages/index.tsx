/* eslint-disable tailwindcss/no-custom-classname */
import { getAuth } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ResPostThread } from '@/bff/types/thread';
import { ChatLog } from '@/frontend/components/ChatLog';
import { ChatMessageForm } from '@/frontend/components/ChatMessageForm';
import { LeftSidebar } from '@/frontend/components/LeftSidebar';
import { RightSidebar } from '@/frontend/components/RightSidebar';
import { TopBar } from '@/frontend/components/TopBar';
import { currentUserState } from '@/frontend/globalStates/atoms/currentUserAtom';

export default function Home() {
  const currentUser = useRecoilValue(currentUserState);

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

    console.log('threadList', resBody);
  };

  return (
    <>
      <Head>
        <title>BambooGPT</title>
      </Head>
      <div className="top-main flex h-full w-full">
        <LeftSidebar />
        <div className="top-body flex w-full flex-auto flex-col">
          <TopBar />

          <button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={createThread}
          >
            thread作る
          </button>
          <div className="top-chat flex h-full flex-1">
            <div className="top-content relative flex h-screen min-w-0 flex-auto flex-col">
              <ChatLog />
              <ChatMessageForm />
            </div>

            <RightSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
