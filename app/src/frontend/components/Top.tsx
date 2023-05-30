import { useState } from 'react';

export const Top = () => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  return (
    <div className="top-main flex h-screen w-full overflow-hidden">
      <div className="top-leftsidebar w-[260px] flex-none bg-gpt-dark">
        <div>LeftSidebar</div>
      </div>

      <div className="top-body w-full">
        <div className="top-topbar flex h-8 items-center border border-gpt-dark border-b-zinc-500">
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

        <div className="top-content flex h-full w-full">
          <div className="top-chatlog w-full">
            開運========================================================
          </div>
          <div
            className={`w-[260px] bg-gpt-dark ${
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
