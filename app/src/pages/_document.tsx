import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/bamboogpt_icon.png" />
      </Head>
      <body className="overflow-hidden bg-gray-100 dark:bg-gpt-gray">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
