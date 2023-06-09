import { MouseEventHandler, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  example: string;
  exampleRequired: string;
  example2: string;
  exampleRequired2: string;
};
export const Top = () => {
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
                  sample1();
                }}
              >
                ボタン
              </button>
            </div>
          </div>
        </div>

        <div className="top-chat flex h-full flex-1">
          <div className="top-content flex h-screen flex-auto flex-col">
            {/* 下記、ChatLogコンポーネントにできる */}
            {/* 2023/06/05 良いかわからないが「flex: 1;」で、スクロールとメッセージフォームの固定を実現する。 
                  この方法でしか、メッセージフォームのwidthをRightSidebarによって変化させることができなかった。 */}
            <div className="top-chatlog flex-1 overflow-y-auto overflow-x-hidden">
              <div className="flex flex-wrap">
                <div className="h-60 w-40">ffege</div>
              </div>
            </div>
            <div className="top-message-form h-40">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue="test" {...register('example')} />

                <input {...register('exampleRequired', { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
              </form>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue="test" {...register('example2')} />

                <input {...register('exampleRequired2', { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
              </form>

              {errors.exampleRequired && <span>This field is required</span>}
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
