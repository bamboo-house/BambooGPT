import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import { AppWrapper } from './AppWrapper';
import { initializeFirebaseForFE } from '@/frontend/utils/initializeFirebaseForFE';

export default function App({ Component, pageProps }: AppProps) {
  // firebase/authの初期化
  initializeFirebaseForFE();

  const DebugObserver = () => {
    const snapshot: any = useRecoilSnapshot();
    useEffect(() => {
      for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
        console.debug(node.key, snapshot.getLoadable(node));
      }
    }, [snapshot]);

    return null;
  };

  return (
    <RecoilRoot>
      <DebugObserver />
      <ThemeProvider attribute="class" defaultTheme="dark">
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </ThemeProvider>
    </RecoilRoot>
  );
}
