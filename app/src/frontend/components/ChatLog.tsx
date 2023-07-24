import hljs from 'highlight.js';
import { escape } from 'lodash';
import Image from 'next/image';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRecoilValue } from 'recoil';
import remarkGfm from 'remark-gfm';
import { chatMessageListState } from '../globalStates/atoms/chatAtom';

export const ChatLog = () => {
  const chatMessageList = useRecoilValue(chatMessageListState);

  useEffect(() => {
    // スクロールを常に一番下にする
    const scrollInner = document.getElementById('scroll_inner');
    if (scrollInner) {
      scrollInner.scrollTop = scrollInner.scrollHeight;
    }
  }, [chatMessageList]);

  useEffect(() => {
    hljs.highlightAll();
  }, [chatMessageList]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden" id="scroll_inner">
      {/* 2023/06/05 良いかわからないが「flex: 1;」で、スクロールとメッセージフォームの固定を実現する。 
        この方法でしか、メッセージフォームのwidthをRightSidebarによって変化させることができなかった。 */}
      <div className="flex flex-col">
        {chatMessageList.length === 1 && (
          <div className="mx-auto w-full">
            <h1 className="mx-auto mb-12 mt-40 text-center text-4xl font-semibold">BambooAGI</h1>
            <div className="text-center">{"Let's start chatting!"}</div>
          </div>
        )}
        <div className="text-[0.99em] font-normal">
          {chatMessageList.length >= 2 &&
            chatMessageList.map((data, i) => {
              if (data.role === 'user') {
                return (
                  <div className="h-auto w-full" key={i}>
                    <div className="m-auto flex max-w-3xl gap-6 px-0 py-8">
                      <div className="shrink-0">
                        <Image
                          src="/sample_icon.png"
                          width={30}
                          height={30}
                          alt="user"
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
                      <div className="shrink-0 ">
                        <Image
                          src="/bamboogpt_icon.png"
                          width={30}
                          height={30}
                          alt="assistant"
                          className="rounded-sm"
                        />
                      </div>
                      <div className="w-[calc(100%-50px)] gap-3 whitespace-pre-line text-gray-300	">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {data.content ? data.content : ''}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className="h-48 w-full sm:h-36">
          <div className="m-auto flex max-w-3xl gap-6 px-0 py-6"></div>
        </div>
      </div>
    </div>
  );
};
