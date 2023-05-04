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
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiU2h1dG8gVGFrZXVjaGkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4WnhycGJ0YmtXUWEtdG55azhMZjdpcjQ4TVlmTFptWUptTk9IVTIxQT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9iYW1ib29ncHQiLCJhdWQiOiJiYW1ib29ncHQiLCJhdXRoX3RpbWUiOjE2ODMxODc3MzEsInVzZXJfaWQiOiJsMmpCMmJIYWFmYVNCOFlQM3dNaUhqd1hPcjMyIiwic3ViIjoibDJqQjJiSGFhZmFTQjhZUDN3TWlIandYT3IzMiIsImlhdCI6MTY4MzE4NzczMSwiZXhwIjoxNjgzMTkxMzMxLCJlbWFpbCI6InRha2VzaHUwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTc1OTMyMTkyMzI2Mjg0NTQ3MDciXSwiZW1haWwiOlsidGFrZXNodTAwMUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.w8bjOBuOCDD07G3DJW800IwyYhm0T9PkIuPsh6zBxGC6FBgjg2zLl2djDSYC4l5uCQjxXx5wiRqhwpLzdjfl2Py-HWbl9lJt5EjlKzFJen0K3IFTZGdhte_AI2PXRGZ_MQE1_5IPYsxExgG2eydF5RdIGkDSh7FxOuNRbJ7oBrerFXUVhTIIGDzPHhmsywKGJ22Z_xhZnCtOD86Gz7ZjqQM6RUhsfG_zKtS4JACbgWP-VbNeFxeGWH2XfbSEsqFo2g-NssiArpL7ibt2pail7euLLA9x_29SMJ1fKkVxG1pdyE9TcrjXogzvuXi9iiGKk-_V-9_tBJ1Wa5kvhbb6rQ',
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
