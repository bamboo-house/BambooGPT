import { Header } from './Header';
import { Footer } from './Footer';
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <article className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
        <Sidebar />
        <main>{children}</main>
      </article>
      <Footer />
    </>
  );
};
