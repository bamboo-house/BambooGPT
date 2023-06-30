import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatMessageListState } from '../globalStates/atoms/chatAtom';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { useChat } from '../hooks/useChat';
import { useThread } from '../hooks/useThread';

export const ChatLog = () => {
  const [chatMessageList, setChatMessageList] = useRecoilState(chatMessageListState);
  const currentUser = useRecoilValue(currentUserState);
  const router = useRouter();

  // const { data, error, isLoading } = useThread('hD0Fo8qCHsQ6tg7VIVGM', currentUser.idToken);
  const { data, error, isLoading } = useChat('5jKWCvjitwQUBGUtEvwy', currentUser.idToken);

  const mockData = () => {
    setChatMessageList([
      { role: 'system', content: 'You are a helpful assistant' },
      { role: 'user', content: 'こんにちは' },
      { role: 'assistant', content: 'こんにちは' },
      { role: 'user', content: 'jsでif文はどうかく？' },
      {
        role: 'assistant',
        content:
          'JavaScriptでif文を使用するには、以下のように書きます。\n\n```\nif (条件式) {\n  // 条件式が true の場合に実行する処理\n} else {\n  // 条件式が false の場合に実行する処理\n}\n```\n\n例えば、変数`x`が10未満である場合に`console.log("xは10未満です")`を実行し、10以上である場合に`console.log("xは10以上です")`を実行する場合、以下のように書けます。\n\n```\nlet x = 5;\n\nif (x < 10) {\n  console.log("xは10未満です");\n} else {\n  console.log("xは10以上です");\n}\n```\n\nまた、条件式を複数にする場合は、以下のように書きます。\n\n```\nif (条件式1) {\n  // 条件式1がtrueの場合に実行する処理\n} else if (条件式2) {\n  // 条件式1がfalseかつ条件式2がtrueの場合に実行する処理\n} else {\n  // 条件式1と条件式2がどちらもfalseの場合に実行する処理\n}\n```...',
      },
      { role: 'user', content: 'jsでif文はどうかく？' },
      {
        role: 'assistant',
        content:
          'Rubyでのif文の書き方は以下の通りです。\n\n```ruby\nif 条件式\n  # 条件式が真の時に実行される処理\nelse\n  # 条件式が偽の時に実行される処理\nend\n```\n\n例えば、変数`a`が10より大きければ「aは10より大きいです」と表示し、そうでなければ「aは10以下です」と表示するプログラムを作成する場合は以下のようになります。\n\n```ruby\na = 15\nif a > 10\n  puts "aは10より大きいです"\nelse\n  puts "aは10以下です"\nend\n```\n\n上記のコードを実行すると、`aは10より大きいです`という文字列が出力されます。',
      },
    ]);
  };

  useEffect(() => {
    mockData();
  }, []);

  const updateState = () => {
    // mapを使って深いコピーをして変更できるようにする（そもそも、オブジェクト配列のデータ構造が悪いかも）
    let data = chatMessageList.map((item) => ({ ...item }));
    data[2].content = '変更したぜ';
    data.push({ role: 'assistant', content: 'こんにちは' });
    setChatMessageList(data);
  };

  const threadData = () => {
    if (data && data.body) {
      console.log(data);
      return <div>{data.body.chatId}</div>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <button
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={updateState}
      >
        updateState
      </button>
      <button
        className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={() => console.log(router.query)}
      >
        params
      </button>
      {threadData()}
      {/* 2023/06/05 良いかわからないが「flex: 1;」で、スクロールとメッセージフォームの固定を実現する。 
        この方法でしか、メッセージフォームのwidthをRightSidebarによって変化させることができなかった。 */}
      <div className="flex flex-col">
        {chatMessageList.map((data, i) => {
          if (data.role === 'user') {
            return (
              <div className="h-auto w-full" key={i}>
                <div className="m-auto flex max-w-3xl gap-6 px-0 py-8">
                  <div className="shrink-0">
                    <Image
                      src="/sample_icon.png"
                      width={30}
                      height={30}
                      alt="Assistant"
                      className="rounded-sm"
                    />
                  </div>
                  <div className="w-[calc(100%-50px)] gap-3">{data.content}</div>
                </div>
              </div>
            );
          } else if (data.role === 'assistant') {
            return (
              <div className="h-auto w-full bg-[#444654]" key={i}>
                <div className="m-auto flex max-w-3xl gap-6 px-0 py-8">
                  <div className="shrink-0">
                    <Image
                      src="/bamboogpt_icon.png"
                      width={30}
                      height={30}
                      alt="Assistant"
                      className="rounded-sm"
                    />
                  </div>
                  <div className="w-[calc(100%-50px)] gap-3" style={{ whiteSpace: 'pre-line' }}>
                    {data.content}
                  </div>
                </div>
              </div>
            );
          }
        })}
        <div className="h-48 w-full sm:h-36">
          <div className="m-auto flex max-w-3xl gap-6 px-0 py-6"></div>
        </div>
      </div>
    </div>
  );
};
