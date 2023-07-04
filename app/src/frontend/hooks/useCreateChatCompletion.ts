import { getAuth } from 'firebase/auth';
import { ChatCompletionRequestMessage } from 'openai';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { ReqPostOpenaiChat } from '@/bff/types/openai/chats';

export const useCreateChatCompletion = async (
  messages: ChatCompletionRequestMessage[],
  resText: (text: string) => void
) => {
  const currentUser = useRecoilValue(currentUserState);
  const idToken = currentUser.idToken;
  const user = getAuth().currentUser;
  if (!user) {
    // Todo：エラー処理
    return;
  }

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
