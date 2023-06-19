import { useRecoilState } from 'recoil';
import { isOpenedRightSidebarState } from '../globalStates/atoms/isOpenedRightSidebarAtom';

export const TopBar = () => {
  const [isOpenedRightSidebar, setIsOpenedRightSidebar] = useRecoilState(isOpenedRightSidebarState);

  return (
    <div className="top-topbar h-10 border border-gpt-dark border-b-zinc-500 bg-gpt-gray ">
      <div className="flex h-full">
        <div className="w-10 flex-none bg-red-600">oo</div>
        <div className="grow bg-orange-400">oo</div>

        <div className="w-24 flex-none bg-blue-400">
          <button
            className=""
            onClick={() => {
              setIsOpenedRightSidebar(!isOpenedRightSidebar);
            }}
          >
            ボタン
          </button>
        </div>
      </div>
    </div>
  );
};
