import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { chatAbortControllerState } from '../globalStates/atoms/chatAbortControllerAtom';

export const useChatAbortController = () => {
  const [chatAbortController, setChatAbortController] = useRecoilState(chatAbortControllerState);

  const abortChat = useCallback(() => {
    console.log('呼び出されたよ');
    // abortしたら、abortControllerを再生成しなければならない
    chatAbortController.abort();
    setChatAbortController(new AbortController());
  }, [chatAbortController, setChatAbortController]);

  return { chatAbortController, abortChat };
};
