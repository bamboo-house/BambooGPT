/* eslint-disable react/no-children-prop */
import hljs from 'highlight.js';
import { escape } from 'lodash';
import Image from 'next/image';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import { useRecoilValue } from 'recoil';

import { chatMessageListState } from '../globalStates/atoms/chatAtom';

export const ChatLog = () => {
  const chatMessageList = useRecoilValue(chatMessageListState);

  useEffect(() => {
    // スクロールを常に一番下にする
    const scrollInner = document.getElementById('scroll_inner');
    if (scrollInner) {
      scrollInner.scrollTop = scrollInner.scrollHeight;
    }
    console.log('chatMessageList', chatMessageList);
  }, [chatMessageList]);

  // useEffect(() => {
  //   hljs.highlightAll();
  // }, [chatMessageList]);

  // const escapeHtml = (string: any) => {
  //   if (typeof string !== 'string') {
  //     return string;
  //   }
  //   const e = {
  //     '&': '&amp;',
  //     "'": '&#x27;',
  //     '`': '&#x60;',
  //     '"': '&quot;',
  //     '<': '&lt;',
  //     '>': '&gt;',
  //   };
  //   return string.replace(/[&'`"<>]/g, (match) => e[match]);
  // };

  const markdownContent =
    'Rubyで関数を宣言するには、`def`キーワードを使用します。以下に例を示します。\n\n```ruby\n# 関数の定義\ndef greet(name)\nputs "こんにちは、#{name}さん！"\nend\n```';

  // const markdown = `A paragraph with *emphasis* and **strong importance**.

  // > A block quote with ~strikethrough~ and a URL: https://reactjs.org.

  // * Lists
  // * [ ] todo
  // * [x] done

  // A table:

  // | a | b |
  // | - | - |
  // `;

  const markdown = `Here is some JavaScript code:

  ~~~js
  console.log('It works!')
  ~~~
  `;

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden" id="scroll_inner">
      {/* 2023/06/05 良いかわからないが「flex: 1;」で、スクロールとメッセージフォームの固定を実現する。 
        この方法でしか、メッセージフォームのwidthをRightSidebarによって変化させることができなかった。 */}
      {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {'# みだし' +
          `
      function myCode(){
        var a = 5;
      }
      `}
      </ReactMarkdown> */}
      {/* <ReactMarkdown children={markdownContent} remarkPlugins={[remarkGfm]} />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown> */}

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
                console.log(data.content);
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
                        {/* <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        >
                          {data.content ? escape(data.content) : ''}
                        </ReactMarkdown> */}
                        <ReactMarkdown
                          children={data.content || ''}
                          components={{
                            code({ node, inline, className, children, ...props }) {
                              const match = /language-(\w+)/.exec(className || '');
                              return !inline && match ? (
                                <SyntaxHighlighter
                                  {...props}
                                  children={String(children).replace(/\n$/, '')}
                                  style={atomDark}
                                  language={match[1]}
                                  PreTag="div"
                                />
                              ) : (
                                <code {...props} className={className}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        />
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
