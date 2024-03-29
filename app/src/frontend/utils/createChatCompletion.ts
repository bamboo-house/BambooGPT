import { ChatCompletionRequestMessage } from 'openai';
import { ChatOption } from '../globalStates/atoms/chatAtom';
import { ReqPostOpenaiChat } from '@/bff/types/openai/chats';

/*
  仕様メモ
  ・リクエストの度に、新しいドキュメントデータを作成する
  ・途中でabortした場合でも、ドキュメントには完全なresponseが保存される
  ・よって、チャットの途中でstate更新されなくなるが、
    /chats/:id にアクセスすると、完全なresponseを含めたドキュメントが返る
*/

export const createChatCompletion = async (
  uid: string,
  threadId: string,
  token: string,
  messages: ChatCompletionRequestMessage[],
  chatOption: ChatOption,
  resText: (text: string) => void,
  signal: AbortSignal
) => {
  const reqBody: ReqPostOpenaiChat = {
    uid: uid,
    threadId: threadId,
    chatContent: {
      model: chatOption.model,
      messages: messages,
      temperature: chatOption.temperature,
      top_p: chatOption.top_p,
      n: chatOption.n,
      stream: chatOption.stream,
      stop: chatOption.stop,
      max_tokens: chatOption.max_tokens,
      presence_penalty: chatOption.presence_penalty,
      frequency_penalty: chatOption.frequency_penalty,
      logit_bias: chatOption.logit_bias,
      user: chatOption.user,
    },
  };

  const response = await fetch('/api/openai/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reqBody),
    signal: signal,
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
      throw new Error(error);
    }
  }
};
