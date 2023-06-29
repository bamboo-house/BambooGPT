import { ChatCompletionRequestMessage, CreateChatCompletionRequest } from 'openai';
import { atom } from 'recoil';

type ChatOption = Omit<CreateChatCompletionRequest, 'messages'>;

export const chatOptionState = atom<ChatOption>({
  key: 'chatOptionState',
  default: {
    model: 'text-ada-001',
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: true,
    stop: undefined,
    max_tokens: undefined,
    presence_penalty: 0,
    frequency_penalty: 0,
    logit_bias: null,
    user: undefined,
  },
});

export const chatMessageListState = atom<ChatCompletionRequestMessage[]>({
  key: 'chatMessageListState',
  default: [
    { role: 'system', content: '' },
    { role: 'user', content: '' },
  ],
});
