import { atom } from 'recoil';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
};

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

export const chatOptionState = atom<ChatOption>({
  key: 'chatOptionState',
  default: { model: 'text-ada-001' },
});

export const chatMessageState = atom<ChatMessage[]>({
  key: 'chatMessageState',
  default: [
    { role: 'system', content: '' },
    { role: 'user', content: '' },
  ],
});
