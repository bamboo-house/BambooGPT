/* eslint-disable tailwindcss/no-custom-classname */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { ChatLog } from '@/frontend/components/ChatLog';
import { ChatMessageForm } from '@/frontend/components/ChatMessageForm';
import { RightSidebar } from '@/frontend/components/RightSidebar';
import { TopBar } from '@/frontend/components/TopBar';
import { useFirebaseAuth } from '@/frontend/utils/firebaseAuth';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const { logout } = useFirebaseAuth();
  const router = useRouter();

  const handleChangeLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>BambooGPT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bamboogpt_icon.png" />
      </Head>
      <div className="top-main flex h-full w-full">
        <div className="top-leftsidebar relative h-full w-64 flex-none md:w-0">
          <div className="fixed left-0 top-0 h-full w-[inherit] bg-gpt-dark md:hidden">
            {/* 下記、LeftSidebarコンポーネントにできる */}
            <div className="">LeftSidebar</div>
            <button
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={handleChangeLogout}
            >
              ログアウト
            </button>
          </div>
        </div>

        <div className="top-body flex w-full flex-auto flex-col">
          <TopBar />

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
