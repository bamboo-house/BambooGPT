import Head from 'next/head';
import React from 'react';
import { Top } from '@/frontend/components/Top';
import { useCurrentUserSetter } from '@/frontend/utils/firebaseAuth';
import styles from '@/styles/Home.module.css';

export default function Home() {
  // ユーザーをセットする
  useCurrentUserSetter();

  return (
    <>
      <Head>
        <title>BambooGPT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bamboogpt_icon.png" />
      </Head>
      <Top />
    </>
  );
}
