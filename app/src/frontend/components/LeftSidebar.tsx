import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Key, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { threadListState } from '../globalStates/atoms/threadAtom';
import { useThreadListWithLatestChat } from '../hooks/useThreadListWithLatestChat';
import { useFirebaseAuth } from '@/frontend/hooks/firebaseAuth';

export const LeftSidebar = () => {
  const [threadList, setThreadList] = useRecoilState(threadListState);
  const currentUser = useRecoilValue(currentUserState);
  const { data } = useThreadListWithLatestChat(currentUser.idToken);

  const { logout } = useFirebaseAuth();
  const router = useRouter();

  const handleChangeLogout = async () => {
    await logout();
  };

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <div className="top-leftsidebar relative h-full w-64 flex-none md:w-0">
      <div className="fixed left-0 top-0 h-full w-[inherit] bg-gpt-dark text-sm md:hidden">
        {/* 下記、LeftSidebarコンポーネントにできる */}
        <button className="w-full cursor-pointer border border-gpt-dark border-b-zinc-500 p-3 hover:bg-gpt-gray">
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
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={handleChangeLogout}
        >
          ログアウト
        </button>
        <div className="h-4/5 flex-1 overflow-y-auto overflow-x-hidden border border-gpt-dark border-b-zinc-500">
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
