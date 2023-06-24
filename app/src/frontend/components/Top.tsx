/* eslint-disable tailwindcss/no-custom-classname */
import { useRouter } from 'next/router';
import { useFirebaseAuth } from '../utils/firebaseAuth';
import { ChatLog } from './ChatLog';
import { ChatMessageForm } from './ChatMessageForm';
import { RightSidebar } from './RightSidebar';
import { TopBar } from './TopBar';

export const Top = () => {
  const { logout } = useFirebaseAuth();
  const router = useRouter();

  const handleChangeLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="top-main flex h-full w-full">
      <div className="top-leftsidebar relative h-full w-64 flex-none md:w-0">
        <div className="fixed left-0 top-0 h-full w-[inherit] bg-gpt-dark md:hidden">
          {/* 下記、LeftSidebarコンポーネントにできる */}
          <div className="">LeftSidebar</div>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={handleChangeLogout}
          >
            ログアウト
          </button>
        </div>
      </div>

      <div className="top-body flex w-full flex-auto flex-col">
        <TopBar />

        <div className="top-chat flex h-full flex-1">
          <div className="top-content relative flex h-screen min-w-0 flex-auto flex-col">
            <ChatLog />
            <ChatMessageForm />
          </div>

          <RightSidebar />
        </div>
      </div>
    </div>
  );
};
