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
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2h1dG8gVGFrZXVjaGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4WnhycGJ0YmtXUWEtdG55azhMZjdpcjQ4TVlmTFptWUptTk9IVTIxQT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9iYW1ib29ncHQiLCJhdWQiOiJiYW1ib29ncHQiLCJhdXRoX3RpbWUiOjE2ODMwOTQ4MzIsInVzZXJfaWQiOiJsMmpCMmJIYWFmYVNCOFlQM3dNaUhqd1hPcjMyIiwic3ViIjoibDJqQjJiSGFhZmFTQjhZUDN3TWlIandYT3IzMiIsImlhdCI6MTY4MzA5NDgzMiwiZXhwIjoxNjgzMDk4NDMyLCJlbWFpbCI6InRha2VzaHUwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTc1OTMyMTkyMzI2Mjg0NTQ3MDciXSwiZW1haWwiOlsidGFrZXNodTAwMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.GwXbCz7QHExJsrHdL9moH8jT7tTglAryUjceBnXvNOVyNWe_JitUQStdVsfMWUww2vlvuZcV1RlNqs8Sb88CBZqZkUJn1lalJ5KizBY4ds1EugAGq8-sHDdjO6a5vpWU5FH8QXAm-yAmLH4_PoOVjPPgKvJWUArZB1HP6j_-MT-RCO2dZJED0lMzPiuV_6LoJAwGmG2HL9UsOloxkPx--IN1iXk-VWt1Rroq4ZgbJsi81_dV9m0nrG2uOV3SBpeXp1cRmmFhdxFXYWvR1OYXF7kJaqdTt2k3e0K7O-6viL9ExLbNpR015baV_1lNh5EYngEbdgIFCJ6MgRjUHu7gRA',
    };

    const response = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    });
    const resBody: ResCreateThread = await response.json();

    // const uid = 'l2jB2bHaafaSB8YP3wMiHjwXOr32';
    // const db: Firestore = getFirestore();
    // const userRef: DocumentReference = doc(db, 'users', uid);
    // const docSnapshot = await getDoc(userRef);
    // if (docSnapshot.exists()) {
    //   console.log('Document data:', docSnapshot.data());
    // } else {
    //   console.log('No such document!');
    // }
    // console.log('user', getAuth().currentUser);
    // console.log(response);
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
