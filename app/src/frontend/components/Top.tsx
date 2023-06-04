import { MouseEventHandler, useState } from 'react';

export const Top = () => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const sample = () => {
    const rightSidebar = document.querySelector('#right-sidebar');
    //既存のクラスを取得
    let c = rightSidebar?.getAttribute('class');
    console.log(c);

    if (showRightSidebar) {
      rightSidebar?.setAttribute(
        'class',
        'fixed right-0 top-10 h-full w-64 border border-gpt-dark border-l-zinc-500 bg-gpt-gray translate-x-full transition-transform duration-300 ease-in-out'
      );
    } else {
      rightSidebar?.setAttribute(
        'class',
        'fixed right-0 top-10 h-full w-64 border border-gpt-dark border-l-zinc-500 bg-gpt-gray  transition-transform duration-300 ease-in-out'
      );
    }
    setShowRightSidebar(!showRightSidebar);
  };

  const sample1 = () => {
    const rightSidebar = document.querySelector('#right-sidebar');
    //既存のクラスを取得
    let c = rightSidebar?.getAttribute('class');
    console.log(c);

    if (showRightSidebar) {
      rightSidebar?.setAttribute(
        'class',
        'fixed right-0 top-10 h-full w-64 border border-gpt-dark border-l-zinc-500 bg-gpt-gray translate-x-full transition-transform duration-300 ease-in-out'
      );
    } else {
      rightSidebar?.setAttribute(
        'class',
        'fixed right-0 top-10 h-full w-64 border border-gpt-dark border-l-zinc-500 bg-gpt-gray  transition-transform duration-300 ease-in-out'
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
          </div>

          {/* <div className="fixed bottom-0 h-44 w-full bg-gpt-dark">メッセージフォーム</div> */}

          {/* 下記、RigtSidebarコンポーネントにできる  */}
          {/* <div
            id="right-sidebar"
            className={`fixed right-0 top-10 h-full w-64 border border-gpt-dark border-l-zinc-500 bg-gpt-gray ${'translate-x-full transition-transform duration-300 ease-in-out'}`}
          > */}
          <div className="w-64 flex-none bg-blue-500">
            <div className="fixed">RightSidebar</div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <>
  //     <div className="grid h-screen grid-cols-[minmax(auto,_256px)_minmax(420px,_1fr)_minmax(auto,_256px)] grid-rows-[36px_1fr]">
  //       <div className="row-span-2 bg-orange-200"></div>
  //       <div className="col-span-2 bg-red-200">2</div>
  //       <div className="bg-green-200">3</div>
  //       <div className="bg-blue-200">4</div>
  //     </div>
  //   </>
  // );
};
