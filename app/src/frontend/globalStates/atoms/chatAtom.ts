import { ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai';
import { atom } from 'recoil';

export type ChatOption = Omit<CreateChatCompletionRequest, 'messages'>;
type ChatInfo = {
  uid: string;
  chatId: string;
  threadId: string;
};

export const chatOptionState = atom<ChatOption>({
  key: 'chatOptionState',
  default: {
    model: 'gpt-3.5-turbo',
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: true,
    stop: undefined,
    max_tokens: undefined,
    presence_penalty: 0,
    frequency_penalty: 0,
    logit_bias: undefined,
    user: undefined,
  },
});

export const chatMessageListState = atom<ChatCompletionRequestMessage[]>({
  key: 'chatMessageListState',
  default: [{ role: 'system', content: '' }],
});

export const chatInfoState = atom<ChatInfo>({
  key: 'chatInfoState',
  default: { uid: '', chatId: '', threadId: '' },
});
