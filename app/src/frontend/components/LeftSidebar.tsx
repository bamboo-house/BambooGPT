import Image from 'next/image';
import Link from 'next/link';
import { Key, useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const { logout } = useFirebaseAuth();

  const handleChangeLogout = async () => {
    await logout();
  };

  return (
    <div className="top-leftsidebar relative h-full w-64 flex-none md:w-0">
      <div className="fixed left-0 top-0 z-10 h-full w-[inherit] bg-gpt-dark text-sm md:hidden">
        <button
          className="w-full cursor-pointer border border-gpt-dark border-b-zinc-600 p-3 hover:bg-gpt-gray"
          onClick={(e) => {
            setIsSettingsOpen(!isSettingsOpen);
            e.stopPropagation();
          }}
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
          <div className="absolute left-60 top-[-40px] w-52 rounded bg-black">
            <ul className="p-3">
              <li className="flex items-center gap-3 rounded p-2 ">
                <IoSettingsOutline size={17} />
                <div>Settings</div>
              </li>
              <li
                className="flex items-center gap-3 rounded p-2 hover:bg-gpt-gray"
                onClick={handleChangeLogout}
              >
                <FiLogOut size={17} />
                <div>Log out</div>
              </li>
            </ul>
          </div>
        </Modal>

        <div className="my-2 h-4/5 flex-1 overflow-y-auto overflow-x-hidden">
          {data &&
            data.body &&
            data.body.map((thread, key: Key | null | undefined) => (
              <Link
                href={'/chats/' + thread.chatId}
                className="mx-2 flex cursor-pointer items-center gap-3 rounded-md p-3 hover:bg-gpt-gray"
                key={key}
              >
                <BiComment size={19} />
                <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap break-all">
                  {thread.name}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
