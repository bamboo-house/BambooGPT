import { MouseEventHandler, useState } from 'react';

export const Top = () => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const sample = () => {
    const rightSidebar = document.querySelector('#content');
    //既存のクラスを取得
    let c = rightSidebar?.getAttribute('class');
    console.log(c);

    if (showRightSidebar) {
      rightSidebar?.setAttribute(
        'class',
        'h-32 w-32 bg-red-300 scale-x-100 transition-transform duration-300 ease-in-out'
      );
    } else {
      rightSidebar?.setAttribute(
        'class',
        'h-32 w-32 bg-red-300 scale-x-50 transition-transform duration-300 ease-in-out'
      );
    }
    setShowRightSidebar(!showRightSidebar);
  };

  // return (
  //   <div className="top-main flex h-screen w-full overflow-y-auto overflow-x-hidden">
  //     <div className="h-full w-64 flex-none ">
  //       <div className="fixed left-0 top-0 h-full">
  //         {/* 下記、LeftSidebarコンポーネントにできる */}
  //         <div className="top-leftbar h-full w-64 bg-gpt-dark">LeftSidebar</div>
  //       </div>
  //     </div>

  //     <div className="top-body w-full">
  //       <div className="fixed left-64 right-0 top-0">
  //         {/* 下記、TopBarコンポーネントにできる */}
  //         <div className="top-topbar h-8 border border-gpt-dark border-b-zinc-500 bg-gpt-gray">
  //           <div className="flex items-center">
  //             <p>oo</p>
  //             <button
  //               className="ml-auto"
  //               onClick={() => {
  //                 sample();
  //               }}
  //             >
  //               ボタン
  //             </button>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="top-content mt-8 flex h-full w-full">
  //         {/* 下記、ChatLogコンポーネントにできる */}
  //         <div>
  //           <div className="top-chatlog flex flex-wrap">
  //             <div id="content" className="h-32 w-32 bg-red-300">
  //               ===============================海運業ffffffff
  //             </div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">
  //               =======ゾウせんし==そらりん=海運業ffffffff海運業ffffffff 海運業ffffffff
  //             </div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">
  //               =======ゾウせんし==そらりん=海運業ffffffff海運業ffffffff 海運業ffffffff
  //             </div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">
  //               =======ゾウせんし==そらりん=海運業ffffffff海運業ffffffff 海運業ffffffff
  //             </div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">
  //               =======ゾウせんし==そらりん=海運業ffffffff海運業ffffffff 海運業ffffffff
  //             </div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //             <div className="h-32 w-32 bg-red-300">海運業</div>
  //           </div>
  //         </div>

  //         <div className="fixed bottom-0 h-44 w-full bg-gpt-dark">メッセージフォーム</div>

  //         {/* 下記、RigtSidebarコンポーネントにできる  */}
  //         <div
  //           id="right-sidebar"
  //           className={`fixed right-0 top-8 h-full w-64 border border-gpt-dark border-l-zinc-500 bg-gpt-gray ${
  //             showRightSidebar
  //               ? 'transition-transform duration-300 ease-in-out'
  //               : 'translate-x-full transition-transform duration-300 ease-in-out'
  //           }`}
  //         >
  //           <div>RightSidebar</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <>
      <div className="grid h-screen grid-cols-[256px_minmax(420px,_1fr)_256px] grid-rows-[36px_1fr] md:grid-cols-[minmax(420px,_1fr)_256px]">
        {/* <div className="row-span-2 bg-orange-200 ">1</div>
        <div className="col-span-2 bg-red-200">2</div> */}

        <div className="row-span-2 bg-orange-200 md:col-span-2 md:row-auto">1</div>
        <div className="col-span-2 bg-red-200 md:hidden">2</div>
        <div className="bg-green-200">3</div>
        <div className="bg-blue-200">4</div>
      </div>
    </>
  );
};
