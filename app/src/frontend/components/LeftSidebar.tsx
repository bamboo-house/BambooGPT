import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { threadListState } from '../globalStates/atoms/threadAtom';
import { useThreadListWithLatestChat } from '../hooks/useThreadListWithLatestChat';
import { Modal } from './Modal';
import { useFirebaseAuth } from '@/frontend/hooks/useFirebaseAuth.ts';

export const LeftSidebar = () => {
  const [threadList, setThreadList] = useRecoilState(threadListState);
  const currentUser = useRecoilValue(currentUserState);
  const { data } = useThreadListWithLatestChat(currentUser.idToken);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const { logout } = useFirebaseAuth();

  const handleChangeLogout = async () => {
    await logout();
  };

  return (
    <div className="top-leftsidebar relative h-full w-64 flex-none md:w-0">
      <div className="fixed left-0 top-0 z-10 h-full w-[inherit] bg-gpt-dark text-sm md:hidden">
        {/* 下記、LeftSidebarコンポーネントにできる */}
        <button
          className="w-full cursor-pointer border border-gpt-dark border-b-zinc-500 p-3 hover:bg-gpt-gray"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <div className="flex items-center">
            <Image
              src="/sample_icon.png"
              width={27}
              height={27}
              alt="user"
              className="rounded-sm"
            />
            <div className="overflow-hidden text-ellipsis whitespace-nowrap break-all px-3">
              {currentUser?.name}
            </div>
          </div>
        </button>

        <Modal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
          <div className="absolute left-60 top-[-40px] h-52 w-52 bg-red-500">unko</div>
        </Modal>

        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleChangeLogout}
        >
          ログアウト
        </button>
        <div className="h-4/5 flex-1 overflow-y-auto overflow-x-hidden">
          {data &&
            data.body &&
            data.body.map((thread, key: Key | null | undefined) => (
              <Link
                href={'/chats/' + thread.chatId}
                className="mx-2 flex cursor-pointer items-center gap-3 rounded-md p-3 hover:bg-gpt-gray"
                key={key}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap break-all">
                  {thread.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
