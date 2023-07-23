import { useRecoilState } from 'recoil';
import { chatAbortControllerState } from '../globalStates/atoms/chatAbortControllerAtom';

export const useChatAbortController = () => {
  const [chatAbortController, setChatAbortController] = useRecoilState(chatAbortControllerState);

  const abortChat = () => {
    // Todo?：スレッドを変更されるたびに、abortControllerを再生成しているが、よくないかもしれない
    // abortしたら、abortControllerを再生成しなければならない
    chatAbortController.abort();
    setChatAbortController(new AbortController());
  };

  return { chatAbortController, abortChat };
};
