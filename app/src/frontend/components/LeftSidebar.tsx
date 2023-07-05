import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { threadListState } from '../globalStates/atoms/threadAtom';
import { useFirebaseAuth } from '@/frontend/hooks/firebaseAuth';

export const LeftSidebar = () => {
  const [threadList, setThreadList] = useRecoilState(threadListState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const { logout } = useFirebaseAuth();
  const router = useRouter();

  const handleChangeLogout = async () => {
    await logout();
  };

  return (
    <div className="top-leftsidebar relative h-full w-52 flex-none md:w-0">
      <div className="fixed left-0 top-0 h-full w-[inherit] bg-gpt-dark md:hidden">
        {/* 下記、LeftSidebarコンポーネントにできる */}
        <button className="w-full cursor-pointer border border-gpt-dark border-b-zinc-500 p-3 hover:bg-[#2A2B32]">
          <div className="flex items-center">
            <Image
              src="/sample_icon.png"
              width={27}
              height={27}
              alt="user"
              className="rounded-sm"
            />
            <div className="overflow-hidden text-ellipsis whitespace-nowrap break-all px-3 text-sm">
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
      </div>
    </div>
  );
};
