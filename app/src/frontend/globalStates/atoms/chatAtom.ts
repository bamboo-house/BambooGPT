import { atom } from 'recoil';

type ChatOption = {
  model: string;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: { [key: string]: number };
  user?: string;
};

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
};

export const chatOptionState = atom<ChatOption>({
  key: 'chatOptionState',
  default: { model: 'text-ada-001' },
});

export const chatMessageListState = atom<ChatMessage[]>({
  key: 'chatMessageListState',
  default: [
    { role: 'system', content: '' },
    { role: 'user', content: '' },
  ],
});
