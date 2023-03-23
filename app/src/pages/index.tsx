import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { Form } from '@/components/Form';

export default function Home() {
  const [result, setResult] = useState('');

  return (
    <>
      <Head>
        <title>BambooGPT</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bamboogpt-icon.png" />
      </Head>

      <Form setResult={setResult} />
      <div>{result}</div>
    </>
  );
}
