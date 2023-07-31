/* eslint-disable tailwindcss/no-custom-classname */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ChatLog } from '@/frontend/components/ChatLog';
import { ChatMessageForm } from '@/frontend/components/ChatMessageForm';
import { LeftSidebar } from '@/frontend/components/LeftSidebar';
import { RightSidebar } from '@/frontend/components/RightSidebar';
import { TopBar } from '@/frontend/components/TopBar';
import {
  chatInfoState,
  chatMessageListState,
  chatOptionForDisplayState,
  chatOptionState,
} from '@/frontend/globalStates/atoms/chatAtom';
import { currentUserState } from '@/frontend/globalStates/atoms/currentUserAtom';
import { useChat } from '@/frontend/hooks/useChat';

export default function Home() {
  const setChatInfo = useSetRecoilState(chatInfoState);
  const setChatMessageList = useSetRecoilState(chatMessageListState);
  const setChatOption = useSetRecoilState(chatOptionState);
  const setChatOptionForDisplay = useSetRecoilState(chatOptionForDisplayState);
  const currentUser = useRecoilValue(currentUserState);
  const router = useRouter();
  const { chatId } = router.query;

  // Todo: フロントでデータ取得ではなく,getServerSidePropsでやるべきかも
  const { data } = useChat(chatId as string, currentUser.idToken);

  useEffect(() => {
    // 2023/7/10: 色々調べたけど、useSWRをgrobal stateとして使うのは複雑になりそうだからやめる
    // クエリによって得られたデータでchatAtom達のstateを更新する
    if (data && !data.error && data.body) {
      const body = data.body;
      const chatContent = body.chatContent;
      const chatOption = {
        model: chatContent.model,
        temperature: chatContent.temperature,
        top_p: chatContent.top_p,
        n: chatContent.n,
        stream: chatContent.stream,
        stop: chatContent.stop,
        max_tokens: chatContent.max_tokens,
        presence_penalty: chatContent.presence_penalty || 0,
        frequency_penalty: chatContent.frequency_penalty || 0,
        logit_bias: chatContent.logit_bias,
        user: undefined,
      };

      setChatInfo({ uid: body.uid, threadId: body.threadId, chatId: body.chatId });
      setChatMessageList(chatContent.messages);
      setChatOption(chatOption);
      setChatOptionForDisplay(chatOption);
    }
  }, [data, setChatInfo, setChatMessageList, setChatOption, setChatOptionForDisplay]);

  return (
    <>
      <Head>
        <title>BambooAGI</title>
      </Head>
      <div className="top-main flex h-full w-full">
        <LeftSidebar />
        <div className="top-body flex w-full flex-auto flex-col">
          <TopBar />

          <div className="top-chat flex h-full flex-1">
            <div className="top-content relative flex h-screen min-w-0 flex-auto flex-col">
              <ChatLog />
              <ChatMessageForm />
            </div>

            <RightSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
