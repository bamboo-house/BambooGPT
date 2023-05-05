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
        'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2NzE1ZTJmZjcxZDIyMjQ5ODk1MDAyMzY2ODMwNDc3Mjg2Nzg0ZTMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoi5LyB5qWt5ZCR44GR44Kz44Oz44OG44Oz44OEIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGIzT28yRTNoQVN2V0puQlZnRTFKOWEzM0hfOHNHM2ZGMkZBLVU4PXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2JhbWJvb2dwdCIsImF1ZCI6ImJhbWJvb2dwdCIsImF1dGhfdGltZSI6MTY4MzI4MzIwOSwidXNlcl9pZCI6IlRKN09LSExNVUhXZ1JQQUVIaTJ1S1h5YTVMSTIiLCJzdWIiOiJUSjdPS0hMTVVIV2dSUEFFSGkydUtYeWE1TEkyIiwiaWF0IjoxNjgzMjgzMjEwLCJleHAiOjE2ODMyODY4MTAsImVtYWlsIjoidGFrZXNodTAwMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwNzI3NzIwMjE4ODcxMzQxOTYyNiJdLCJlbWFpbCI6WyJ0YWtlc2h1MDAyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.oWU7qyi4bKeTdDE5FdvaqZ4Qv1AKUrLsPkRV04i9Ftx24paw-jRl8GimDhrgVDgzHlk4xi3hU7oCejFtJyT7O2jaARbLp8jl-Fn6bP5UTqf6ed0uP5-_tJRByVJ8PPTJ9ZzAyaCZT9seLwX5w4w44HdpX70RT2AgiO3Rm2UL5s3pA-Lzr3kw34uKcfOD0zwaVvdeduh_yMfkEpNwLLrV7c9tq5nryYex9n8ve64MPrcxCB3oSjR952SDGEUrXv7uACibO3pjPe07_T-yBxl9rJr_SwBOWZA3FQopezRMU3K7kmVDbOx5w1S6CmYl8XfBT1g1P8IEpras1hyi2DfCvQ',
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
