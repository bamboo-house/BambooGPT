import { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-row">
        <Sidebar />
        <main className="grow">{children}</main>
      </div>
      <Footer />
    </>
  );
};
