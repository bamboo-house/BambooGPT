import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { chatMessageListState } from '../globalStates/atoms/chatAtom';

export const ChatLog = () => {
  const chatMessageList = useRecoilValue(chatMessageListState);

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
