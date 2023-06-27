import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { threadListState } from '../globalStates/atoms/threadAtom';
import { ResPostThread } from '@/bff/types/thread';
import { useFirebaseAuth } from '@/frontend/hooks/firebaseAuth';

export const LeftSidebar = () => {
  const [threadList, setThreadList] = useRecoilState(threadListState);

  const { logout } = useFirebaseAuth();
  const router = useRouter();

  const handleChangeLogout = async () => {
    await logout();
    router.push('/login');
  };

  // Todo: これは後々削除する
  // ======================================================================================
  const showThreadList = async () => {
    console.log('threadList', threadList);
  };

  const getThread = async () => {
    const user = getAuth().currentUser;
    if (!user) {
      return;
    }
    const idToken = await user.getIdToken();
    // console.log('idToken', idToken);

    const response = await fetch(`/api/threads/${threadList[0].threadId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    const resBody: ResPostThread = await response.json();
    console.log('resBody of getThread:', resBody);
  };

  const createThread = async () => {
    // idTokenを取得するが、これは後々クッキーで管理すべき

    const user = getAuth().currentUser;
    if (!user) {
      return;
    }
    const idToken = await user.getIdToken();
    // console.log('idToken', idToken);

    const response = await fetch('/api/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    });

    const resBody: ResPostThread = await response.json();
    console.log('resBody of createThread:', resBody);

    setThreadList((prevThreadList: any) => [...prevThreadList, resBody.body]);
  };
  // ======================================================================================

  return (
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

        <button
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={createThread}
        >
          thread作る
        </button>

        <button
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={getThread}
        >
          thread取得する
        </button>

        <button
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          onClick={showThreadList}
        >
          showThreadList
        </button>
      </div>
    </div>
  );
};
