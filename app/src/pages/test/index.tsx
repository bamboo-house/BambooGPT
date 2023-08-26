import Head from 'next/head';
import React, { use, useEffect, useState } from 'react';

export default function Home() {
  useEffect(() => {
    sampe();
  }, []);

  const sampe = async () => {
    const response = await fetch('/api/threads/latest/chat', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // レスポンスをJSONとしてパース
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>BambooAGI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bamboogpt-icon.png" />
      </Head>
      <h1>Test</h1>
    </>
  );
}
