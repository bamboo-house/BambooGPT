import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getFirestore, doc, getDoc, Firestore, DocumentReference } from '@firebase/firestore';
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
    const auth = getAuth().currentUser;

    // if (!currentUser.uid) {
    //   // TODO: ログインしていない場合なので、ログイン画面に飛ばす
    //   return;
    // }
    // const reqBody: ReqCreateThread = { uid: currentUser.uid };

    const reqBody = {
      idToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2h1dG8gVGFrZXVjaGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4WkJGSHBjUGxVN3pxNmM1NzNUdmVJQ1FHUHBNZWp0blh5YmpXU1k9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmFtYm9vZ3B0IiwiYXVkIjoiYmFtYm9vZ3B0IiwiYXV0aF90aW1lIjoxNjgzMzg1MDAyLCJ1c2VyX2lkIjoiT3B2OVAxWG9wcVhlak5aN3BCOGRoc0VHcnBTMiIsInN1YiI6Ik9wdjlQMVhvcHFYZWpOWjdwQjhkaHNFR3JwUzIiLCJpYXQiOjE2ODMzODUwMDMsImV4cCI6MTY4MzM4ODYwMywiZW1haWwiOiJ0YWtlc2h1MDAxb3BlcmF0aW9uQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyODQ4MzE4MjEyNzI5OTEzNzMxIl0sImVtYWlsIjpbInRha2VzaHUwMDFvcGVyYXRpb25AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.CxaXYoMEN75JtrwgHnnmdldJ2nC9piOAHzm_PnIQXP5XYM32OhU8hCP8DdANTyay-LEMHMeeUtHbOR9fhGcSoEqzll76irk0RsEK4mlFnfV6UhOYerqNAj7brH8LCq05HEWDfAZ7kWTlgfZg_YZgKQpLndUkDW-bhOLldae51stKce--PfeZ61SQmzLa4xFAN-onn5z1I4Br0kDGqu3R72Ow1TJxsLs19QlxNuZ2KopZu9HPEzy-rTSNqEOmQtZ4G05vvzyxxWNZAFjDKr5EdRVJ7l11Z-eGj6bmZKEdGmH4eIH5jW3JJKikvIVuIl7XnW4C7KRA_4mVEuEwYRikGA',
    };

    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${reqBody.idToken}`,
      },
      body: JSON.stringify({ uid: currentUser.uid }),
    });
    const resBody: ResCreateThread = await response.json();
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
