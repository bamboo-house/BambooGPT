import { LuPanelLeft } from 'react-icons/lu';
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
            <button
              className={`mr-4 mt-[6px] rounded-[3px] px-1 py-[2px] hover:bg-gray-600 ${
                isOpenedRightSidebar ? 'bg-gray-500' : ''
              }`}
              onClick={() => {
                setIsOpenedRightSidebar(!isOpenedRightSidebar);
              }}
            >
              <LuPanelLeft size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
