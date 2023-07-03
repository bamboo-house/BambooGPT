import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatMessageListState } from '../globalStates/atoms/chatAtom';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { useChat } from '../hooks/useChat';

export const ChatLog = () => {
  const [chatMessageList, setChatMessageList] = useRecoilState(chatMessageListState);
  const currentUser = useRecoilValue(currentUserState);
  const router = useRouter();
  const { chatId } = router.query;

  // Todo: フロントでデータ取得ではなく,getServerSidePropsでやるべきかも
  const { data } = useChat(chatId as string, currentUser.idToken);

  useEffect(() => {
    if (data && data.body) {
      const messages = data.body.chatContent.messages;
      setChatMessageList(messages);
    }
  }, [data, setChatMessageList]);

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
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
