import { useRecoilState } from 'recoil';
import { isOpenedRightSidebarState } from '../globalStates/atoms/isOpenedRightSidebarAtom';

export const TopBar = () => {
  const [isOpenedRightSidebar, setIsOpenedRightSidebar] = useRecoilState(isOpenedRightSidebarState);

  return (
    <div className="top-topbar h-8">
      <div className="flex h-full">
        <div className="grow"></div>
        <div className="flex w-64 flex-none flex-row-reverse bg-slate-700">
          <button
            className="mr-5"
            onClick={() => {
              setIsOpenedRightSidebar(!isOpenedRightSidebar);
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="h-5 w-5"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="1" y="3" width="22" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
