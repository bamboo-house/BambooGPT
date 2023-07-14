import { ChatCompletionRequestMessage } from 'openai';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useSWRConfig } from 'swr';
import {
  chatInfoState,
  chatMessageListState,
  chatOptionState,
} from '../globalStates/atoms/chatAtom';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { createChatCompletion } from '../utils/createChatCompletion';
import { createThread } from '../utils/createThread';

export const ChatMessageForm = () => {
  const chatInfo = useRecoilValue(chatInfoState);
  const chatOption = useRecoilValue(chatOptionState);
  const currentUser = useRecoilValue(currentUserState);
  const [chatMessageList, setChatMessageList] = useRecoilState(chatMessageListState);
  const [isReceiving, setIsReceiving] = useState(false);
  const [prompt, setPrompt] = useState('');
  const { mutate } = useSWRConfig();

  const handleTextareaKeydown = (e: any) => {
    // 「cmd + Enter」かつ「レスポンスを受信中でない」場合、送信する
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !isReceiving) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsReceiving(true);

    const newChatMessageList: ChatCompletionRequestMessage[] = [
      ...chatMessageList,
      { role: 'user', content: prompt },
    ];
    setChatMessageList(newChatMessageList);

    // Todo: エラーをキャッチした時、フォールバックする
    try {
      let threadId = chatInfo.threadId;
      // topページの時、スレッドが作られてないので、ここで作る
      if (!chatInfo.threadId) {
        const body = await createThread();
        threadId = body.threadId;
      }

      // 2023/0704: ここでカスタムフックは実行できないので関数にする。
      // また、関数にすると、関数内部でフックが使えないので、引数で渡す。
      await createChatCompletion(
        currentUser.uid,
        threadId,
        currentUser.idToken,
        newChatMessageList,
        chatOption,
        (res: string) =>
          setChatMessageList((prev) => {
            let lastEle = prev[prev.length - 1];
            if (lastEle.role == 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', content: lastEle.content + res }];
            }
            return [...prev, { role: 'assistant', content: res }];
          })
      );

      // LeftSidebarのスレッド一覧を更新する
      mutate(['/api/threads/latest/chat', currentUser.idToken]);
    } catch (e) {
      console.error(e);
    }

    setIsReceiving(false);
  };

  const resizeTextarea = () => {
    // textarea要素
    const textarea: any = document.getElementById('promptTextAreaId');
    if (!textarea) {
      return;
    }
    // textareaそ要素のlineheight
    let lineHeight: any = getComputedStyle(textarea).lineHeight;
    // "19.6px" のようなピクセル値が返ってくるので、数字だけにする
    lineHeight = lineHeight.replace(/[^-\d\.]/g, '');

    // textarea要素に入力された値の行数
    const lines = (textarea.value + '\n').match(/\n/g)?.length;
    if (!lines) {
      return;
    }
    // 高さを再計算
    textarea.style.height = lineHeight * lines + 'px';
  };

  // textareaにautofocusする
  useEffect(() => {
    const textarea: any = document.getElementById('promptTextAreaId');
    if (textarea) {
      textarea.focus();
    }
  }, [chatInfo]);

  return (
    <div className="absolute inset-x-0 bottom-0 bg-gpt-linear-gradient pb-16">
      <div className="relative mx-auto my-2 max-w-3xl rounded-xl pb-2 pl-3 pt-3 dark:bg-gpt-gray2 tb:mx-3">
        <textarea
          id="promptTextAreaId"
          rows={1}
          tabIndex={0}
          placeholder="Send a message."
          onKeyDown={(e) => {
            handleTextareaKeydown(e);
          }}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          onInput={resizeTextarea}
          className="m-0 max-h-52 w-full resize-none bg-transparent pr-12 focus:outline-none"
        ></textarea>
        <button
          type="button"
          style={{ backgroundColor: 'rgb(25, 195, 125)' }}
          className="absolute bottom-2 right-4 rounded-md p-1"
          onClick={(e) => {
            handleSubmit();
          }}
          disabled={isReceiving}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            className="m-1 h-4 w-4"
            strokeWidth="2"
          >
            <path
              d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
