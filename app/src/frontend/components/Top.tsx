import { useState } from 'react';
import { ChatMessageForm } from './ChatMessageForm';
import { RightSidebar } from './RightSidebar';

export const Top = () => {
  // Todo: 下記のstateをatomにする
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  // TODO: レイアウトコンポーネント、ロジックコンポーネント、ブロックコンポーネントに分ける
  return (
    <div className="top-main flex h-full w-full">
      {/* スマホの時,ヘッダーのボタンを押すと、w-64にすればサイドバーが開ける */}

      <div className="top-leftsidebar relative h-full w-64 flex-none md:w-0">
        <div className="fixed left-0 top-0 h-full w-[inherit] bg-gpt-dark md:hidden">
          {/* 下記、LeftSidebarコンポーネントにできる */}
          <div className="">LeftSidebar</div>
        </div>
      </div>

      <div className="top-body flex flex-auto flex-col">
        {/* 下記、TopBarコンポーネントにできる */}
        <div className="top-topbar h-10 border border-gpt-dark border-b-zinc-500 bg-gpt-gray ">
          <div className="flex h-full">
            <div className="w-10 flex-none bg-red-600">oo</div>
            <div className="grow bg-orange-400">oo</div>

            <div className="w-24 flex-none bg-blue-400">
              <button
                className=""
                onClick={() => {
                  setShowRightSidebar(!showRightSidebar);
                }}
              >
                ボタン
              </button>
            </div>
          </div>
        </div>

        <div className="top-chat flex h-full flex-1">
          <div className="top-content relative flex h-screen flex-auto flex-col">
            {/* 下記、ChatLogコンポーネントにできる */}
            {/* 2023/06/05 良いかわからないが「flex: 1;」で、スクロールとメッセージフォームの固定を実現する。 
                  この方法でしか、メッセージフォームのwidthをRightSidebarによって変化させることができなかった。 */}
            <div className="top-chatlog flex-1 overflow-y-auto overflow-x-hidden">
              <div className="flex flex-wrap">
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
                <div className="h-60 w-40">ffege</div>
              </div>
            </div>

            <ChatMessageForm />
          </div>

          <RightSidebar showRightSidebar={showRightSidebar} />
        </div>
      </div>
    </div>
  );
};
