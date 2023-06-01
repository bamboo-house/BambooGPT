import { useState } from 'react';

export const Top = () => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  return (
    <div className="top-main flex h-screen w-full overflow-y-auto overflow-x-hidden">
      <div className="h-full w-64 flex-none ">
        <div className="fixed left-0 top-0 h-full">
          {/* 下記、LeftSidebarコンポーネントにできる */}
          <div className="top-leftbar h-full w-64 bg-gpt-dark">LeftSidebar</div>
        </div>
      </div>

      <div className="top-body w-full">
        <div className="fixed left-64 right-0 top-0">
          {/* 下記、TopBarコンポーネントにできる */}
          <div className="top-topbar h-8 border border-gpt-dark border-b-zinc-500 bg-gpt-gray">
            <div className="flex items-center">
              <p>oo</p>
              <button
                className="ml-auto"
                onClick={() => {
                  setShowRightSidebar(!showRightSidebar);
                }}
              >
                ボタン
              </button>
            </div>
          </div>
        </div>

        <div className="top-content flex h-full w-full">
          {/* 下記、ChatLogコンポーネントにできる */}
          <div className="top-chatlog mt-8 flex flex-wrap">
            <div className="h-32 w-32 bg-red-300">
              ===============================海運業ffffffff
            </div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">
              =======ゾウせんし==そらりん=海運業ffffffff海運業ffffffff 海運業ffffffff
            </div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">
              =======ゾウせんし==そらりん=海運業ffffffff海運業ffffffff 海運業ffffffff
            </div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">
              =======ゾウせんし==そらりん=海運業ffffffff海運業ffffffff 海運業ffffffff
            </div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">
              =======ゾウせんし==そらりん=海運業ffffffff海運業ffffffff 海運業ffffffff
            </div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
            <div className="h-32 w-32 bg-red-300">海運業</div>
          </div>
          {/* <div className="fixed bottom-10 bg-gpt-dark">メッセージフォーム</div> */}

          {/* 下記、RigtSidebarコンポーネントにできる  */}
          <div
            className={`fixed right-0 top-8 h-full w-64 border border-gpt-dark border-l-zinc-500 bg-gpt-gray ${
              showRightSidebar
                ? 'transition-transform duration-300 ease-in-out'
                : 'translate-x-full transition-transform duration-300 ease-in-out'
            }`}
          >
            <div>RightSidebar</div>
          </div>
        </div>
      </div>
    </div>
  );
};
