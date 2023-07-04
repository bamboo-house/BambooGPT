import { getAuth } from 'firebase/auth';
import { ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatMessageListState } from '../globalStates/atoms/chatAtom';
import { ReqPostOpenaiChat } from '@/bff/types/openai/chats';

export const ChatMessageForm = () => {
  const [chatMessageList, setChatMessageList] = useRecoilState(chatMessageListState);

  const [isReceiving, setIsReceiving] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const handleTextareaKeydown = (e: any) => {
    // 「cmd + Enter 」かつ「受信中でない」場合、送信する
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && !isReceiving) {
      console.log('key down cmd + Enter');
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    console.log('submit');
    setIsReceiving(true);

    const newChatMessageList: ChatCompletionRequestMessage[] = [
      ...chatMessageList,
      { role: 'user', content: prompt },
    ];
    // promptをChatMessageListに追加する
    setChatMessageList(newChatMessageList);
    // POST /api/openai/chatsにリクエストを送る
    // await openaiChats(newChatMessageList, (res: string) => setResult((prev) => prev + res));

    await openaiChats(newChatMessageList, (res: string) =>
      setChatMessageList((prev) => {
        let lastEle = prev[prev.length - 1];
        if (lastEle.role == 'assistant') {
          return [...prev.slice(0, -1), { role: 'assistant', content: lastEle.content + res }];
        }
        return [...prev, { role: 'assistant', content: res }];
      })
    );

    setIsReceiving(false);
  };

  const openaiChats = async (
    messages: ChatCompletionRequestMessage[],
    resText: (text: string) => void
  ) => {
    const user = getAuth().currentUser;
    if (!user) {
      return;
    }
    const idToken = await user.getIdToken();

    console.log('chatMessageList', chatMessageList);

    const reqBody: ReqPostOpenaiChat = {
      uid: user.uid,
      threadId: 'QlunF5Ke2kXNF6Sq0agP',
      chatContent: {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: undefined,
        top_p: undefined,
        n: undefined,
        stream: true,
        stop: undefined,
        max_tokens: undefined,
        presence_penalty: undefined,
        frequency_penalty: undefined,
        logit_bias: undefined,
        user: undefined,
      },
    };

    const response = await fetch('/api/openai/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(reqBody),
    });

    if (!response.body) {
      console.error('Network response was not ok');
      throw new Error('Network response was not ok');
    }

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error.message);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      try {
        const dataString = decoder.decode(value);
        let text: string;

        // ここでdataStringが"{"text":"ダルビッシュ"}{"text":"影山"}"になっていた場合は、"ダルビッシュ影山"を保存する
        const counter = dataString.match(/text/g)?.length;
        if (counter && counter > 1) {
          const str = '[' + dataString.replace(/"}{"/g, '"},{"') + ']';
          const array = JSON.parse(str);
          text = array.map((obj: { text: string }) => obj.text).join('');
        } else {
          text = JSON.parse(dataString).text;
        }

        resText(text);
      } catch (error) {
        console.error(error);
      }
    }
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

  return (
    <div className="absolute inset-x-0 bottom-0 bg-gpt-linear-gradient pb-16">
      {result}
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
