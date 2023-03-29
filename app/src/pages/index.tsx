import React, { useEffect } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { Form } from '@/components/Form';

export default function Home() {
  const [result, setResult] = useState('');

  const accumulateResult = (str: string) => {
    setResult((prevResult) => prevResult + str);
  };

  // useEffect(() => {
  //   const fetchChat = async () => {
  //     try {
  //       const response = await fetch('/api/hello');
  //       const data = await response.json();
  //       console.log(response);
  //       console.log(data);
  //       if (!response.ok) {
  //         throw new Error(data.name);
  //       }
  //       console.log('呼び出し');
  //       console.log(data);
  //     } catch (error) {
  //       console.log('errorの呼び出し');
  //       console.error(error);
  //     }
  //   };
  //   fetchChat();
  // }, []);

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
    </>
  );
}
