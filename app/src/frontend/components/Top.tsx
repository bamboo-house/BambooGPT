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
    <div className="top-main flex h-full w-full">
      {/* スマホの時,ヘッダーのボタンを押すと、w-64にすればサイドバーが開ける */}

      <div className="top-leftsidebar relative h-full w-64 flex-none md:w-0">
        <div className="fixed left-0 top-0 h-full w-[inherit] bg-gpt-dark ">
          {/* 下記、LeftSidebarコンポーネントにできる */}
          <div className="">LeftSidebar</div>
        </div>
      </div>

      <div className="top-body relative flex flex-col">
        {/* 下記、TopBarコンポーネントにできる */}
        <div className="top-topbar h-10 w-[inherit] border border-gpt-dark border-b-zinc-500 bg-gpt-gray ">
          <div className="flex h-full w-full items-center">
            <div className="w-4 flex-none bg-red-600">oo</div>
            <div className="grow bg-orange-400">oo</div>

            <div className="w-24 flex-none bg-blue-400">
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
        </div>

        <div className="top-content flex h-full">
          <div className="flex h-screen flex-col">
            {/* 下記、ChatLogコンポーネントにできる */}
            {/* 2023/06/05 良いかわからないが「flex: 1;」で、スクロールとメッセージフォームの固定を実現する。 
                この方法でしか、メッセージフォームのwidthをRightSidebarによって変化させることができなかった。 */}
            <div className="top-chatlog flex-1 overflow-y-auto overflow-x-hidden">
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
              </div>
            </div>

            <div className="top-message-form h-40 bg-red-200">
              メッセージフォームメッセージフォーム メッセージフォーム メッセージフォーム
              メッセージフォーム メッセージフォーム メッセージフォーム メッセージフォーム
            </div>
          </div>

          {/* 下記、RigtSidebarコンポーネントにできる  */}
          <div id="right-sidebar" className="top-rightsidebar w-0 flex-none">
            <div className="fixed h-full w-[inherit] bg-blue-500">RightSidebar</div>
          </div>
        </div>
      </div>
    </div>
  );
};
