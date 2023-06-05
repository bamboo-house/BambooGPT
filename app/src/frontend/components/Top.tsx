import { MouseEventHandler, useState } from 'react';

export const Top = () => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const sample1 = () => {
    const rightSidebar = document.querySelector('#right-sidebar');
    //既存のクラスを取得
    let c = rightSidebar?.getAttribute('class');
    console.log(c);

    if (showRightSidebar) {
      rightSidebar?.setAttribute('class', 'w-0 transition-all duration-300 ease-in-out');
    } else {
      rightSidebar?.setAttribute(
        'class',
        'w-64 flex-none transition-alltransition-all duration-300 ease-in-out'
      );
    }
    setShowRightSidebar(!showRightSidebar);
  };

  // TODO: レイアウトコンポーネント、ロジックコンポーネント、ブロックコンポーネントに分ける
  return (
    <div className="top-main flex h-full w-full overflow-y-auto overflow-x-hidden">
      {/* スマホの時,ヘッダーのボタンを押すと、w-64にすればサイドバーが開ける */}

      <div className="top-leftbar relative h-full w-64 flex-none md:w-0">
        <div className="fixed left-0 top-0 h-full w-[inherit] bg-gpt-dark ">
          {/* 下記、LeftSidebarコンポーネントにできる */}
          <div className="">LeftSidebar</div>
        </div>
      </div>

      <div className="top-body relative">
        {/* 下記、TopBarコンポーネントにできる */}
        <div className="top-topbar fixed top-0 z-10 h-10 w-full border border-gpt-dark border-b-zinc-500 bg-gpt-gray ">
          <div className="flex w-full items-center">
            <div>oo</div>
            <button
              className=""
              onClick={() => {
                sample1();
              }}
            >
              ボタン
            </button>
          </div>
        </div>

        <div className="top-content mt-10 flex">
          {/* 下記、ChatLogコンポーネントにできる */}
          <div className="top-chatlog">
            <div className="flex flex-wrap">
              <div id="content" className="h-32 w-32 bg-red-300">
                ===============================海運業ffffffff
              </div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
              <div className="h-32 w-32 bg-red-300">海運業</div>
            </div>
            {/* <div className="fixed bottom-0 h-44 w-full bg-gpt-dark">メッセージフォーム</div> */}
          </div>

          {/* 下記、RigtSidebarコンポーネントにできる  */}
          <div id="right-sidebar" className="w-0 flex-none">
            <div className="fixed h-full w-[inherit] bg-blue-500">RightSidebar</div>
          </div>
        </div>
      </div>
    </div>
  );
};
