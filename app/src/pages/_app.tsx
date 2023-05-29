import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';
import { initializeFirebaseForFE } from '@/frontend/utils/initializeFirebaseForFE';

export default function App({ Component, pageProps }: AppProps) {
  // firebase/authの初期化
  initializeFirebaseForFE();

  return (
    <RecoilRoot>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
