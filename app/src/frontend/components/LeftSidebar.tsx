import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { mutate } from 'swr';
import {
  chatInfoState,
  chatMessageListState,
  chatOptionForDisplayState,
  chatOptionState,
} from '../globalStates/atoms/chatAtom';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { useChatAbortController } from '../hooks/useChatAbortController';
import { useThreadListWithLatestChat } from '../hooks/useThreadListWithLatestChat';
import { deleteAllThread } from '../utils/deleteAllThread';
import { deleteThread } from '../utils/deleteThread';
import { Modal } from './Modal';
import { useFirebaseAuth } from '@/frontend/hooks/useFirebaseAuth.ts';

export const LeftSidebar = () => {
  const currentUser = useRecoilValue(currentUserState);
  const chatInfo = useRecoilValue(chatInfoState);
  const resetChatInfo = useResetRecoilState(chatInfoState);
  const resetChatMessageList = useResetRecoilState(chatMessageListState);
  const resetChatOption = useResetRecoilState(chatOptionState);
  const resetChatOptionForDisplay = useResetRecoilState(chatOptionForDisplayState);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { data } = useThreadListWithLatestChat(currentUser.idToken);
  const { logout } = useFirebaseAuth();
  const { abortChat } = useChatAbortController();
  const router = useRouter();

  const handleChangeLogout = async () => {
    await logout();
  };

  const handleChangeStateReset = () => {
    resetChatMessageList();
    resetChatInfo();
    resetChatOption();
    resetChatOptionForDisplay();
  };

  const handleDeleteAllThread = async (e: any) => {
    e.preventDefault();
    await deleteAllThread();
    mutate(['/api/threads/latest/chat', currentUser.idToken]);
    handleChangeStateReset();
    router.push('/');
  };

  const handleDeleteThread = async (e: any) => {
    e.preventDefault();
    const threadId = e.currentTarget.id;
    await deleteThread(threadId);
    mutate(['/api/threads/latest/chat', currentUser.idToken]);
    handleChangeStateReset();
    // トップページに戻さないと、削除したchatのurlのままになる。
    // ユーザー体験上は問題ないが、バグ回避の為にも戻す。
    router.push('/');
  };

  const handleAbort = () => {
    abortChat();
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
              src="/sample-icon.png"
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
              {/* <li className="flex items-center gap-3 rounded p-2 ">
                <IoSettingsOutline size={17} />
                <div>Settings</div>
              </li> */}
              <li
                className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gpt-delete"
                onClick={handleDeleteAllThread}
              >
                <RiDeleteBinLine size={17} />
                <div>Clear all chats</div>
              </li>
              <li
                className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gpt-gray"
                onClick={handleChangeLogout}
              >
                <FiLogOut size={17} />
                <div>Log out</div>
              </li>
            </ul>
          </div>
        </Modal>

        <Link
          href={'/'}
          className="mb-5 ml-2 mr-8 mt-3 flex cursor-pointer items-center gap-3 rounded-md border border-zinc-500 p-3 hover:bg-[#2A2B32]"
          onClick={() => {
            handleAbort();
            handleChangeStateReset();
          }}
        >
          <AiOutlinePlus size={19} />
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap break-all">
            New Chat
          </p>
        </Link>

        <div className="my-2 h-4/5 flex-1 overflow-y-auto overflow-x-hidden">
          {data &&
            data.body &&
            data.body.map((body, key: Key | null | undefined) => {
              const cssOfSelected = () =>
                chatInfo.threadId === body.threadId ? ' bg-gpt-gray' : '';

              return (
                <Link
                  href={'/chats/' + body.chatId}
                  className={
                    'group mx-2 flex h-12 cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-[#2A2B32]' +
                    cssOfSelected()
                  }
                  key={key}
                  onClick={handleAbort}
                >
                  <BiComment size={20} />
                  <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap break-all">
                    {body.name}
                  </p>
                  <RiDeleteBinLine
                    size={20}
                    className="invisible rounded text-gray-300 hover:bg-gray-500 hover:text-white group-hover:visible"
                    id={body.threadId}
                    onClick={(e) => handleDeleteThread(e)}
                  />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};
