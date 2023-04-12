import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/frontend/components/layout/Layout';
import { RecoilRoot } from 'recoil';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/frontend/utils/googleAuth';

export default function App({ Component, pageProps }: AppProps) {
  // firebase/authの初期化
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
