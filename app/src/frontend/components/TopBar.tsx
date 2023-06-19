import { useRecoilState } from 'recoil';
import { isOpenedRightSidebarState } from '../globalStates/atoms/isOpenedRightSidebarAtom';

export const TopBar = () => {
  const [isOpenedRightSidebar, setIsOpenedRightSidebar] = useRecoilState(isOpenedRightSidebarState);

  return (
    <div className="h-8">
      <div className="flex h-full">
        <div className="grow"></div>
        <div className="w-64 flex-none">
          <div className="flex flex-row-reverse">
            <div>
              <button
                className={`mr-4 mt-[6px] rounded-[3px] px-1 py-[3px] ${
                  isOpenedRightSidebar ? 'bg-gray-500' : ''
                }`}
                onClick={() => {
                  setIsOpenedRightSidebar(!isOpenedRightSidebar);
                }}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
      </div>
    </div>
  );
};
