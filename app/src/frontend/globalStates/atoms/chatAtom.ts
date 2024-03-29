import { ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai';
import { atom } from 'recoil';

export type ChatOption = Omit<CreateChatCompletionRequest, 'messages'>;

type ChatInfo = {
  uid: string;
  chatId: string;
  threadId: string;
};

// firestoreに保存するとき、undefinedはnullになるので、注意すること
export const chatOptionState = atom<ChatOption>({
  key: 'chatOptionState',
  default: {
    model: 'gpt-3.5-turbo',
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: true,
    stop: undefined,
    max_tokens: 256,
    presence_penalty: 0,
    frequency_penalty: 0,
    logit_bias: undefined,
    user: undefined,
  },
});

export const chatMessageListState = atom<ChatCompletionRequestMessage[]>({
  key: 'chatMessageListState',
  default: [{ role: 'system', content: 'You are a helpful assistant.' }],
});

export const chatInfoState = atom<ChatInfo>({
  key: 'chatInfoState',
  default: { uid: '', chatId: '', threadId: '' },
});

export const chatOptionForDisplayState = atom<any>({
  key: 'chatOptionForDisplayState',
  default: {
    model: 'gpt-3.5-turbo',
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: true,
    stop: undefined,
    max_tokens: 256,
    presence_penalty: 0,
    frequency_penalty: 0,
    logit_bias: undefined,
    user: undefined,
  },
});
