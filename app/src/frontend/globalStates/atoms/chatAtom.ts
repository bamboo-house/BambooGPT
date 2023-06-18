import { atom } from 'recoil';

type ChatOption = {
  model: string;
  temperature: number;
  top_p: number;
  n: number;
  stream: boolean;
  stop: string | string[] | null;
  max_tokens?: number;
  presence_penalty: number;
  frequency_penalty: number;
  logit_bias: { [key: string]: number } | null;
  user?: string;
};

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
};

export const chatOptionState = atom<ChatOption>({
  key: 'chatOptionState',
  default: {
    model: 'text-ada-001',
    temperature: 1,
    top_p: 1,
    n: 1,
    stream: true,
    stop: null,
    max_tokens: undefined,
    presence_penalty: 0,
    frequency_penalty: 0,
    logit_bias: null,
    user: undefined,
  },
});

export const chatMessageListState = atom<ChatMessage[]>({
  key: 'chatMessageListState',
  default: [
    { role: 'system', content: '' },
    { role: 'user', content: '' },
  ],
});
