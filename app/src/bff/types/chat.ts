import { CreateChatCompletionRequest } from 'openai';

export type ResGetChat = {
  body?: {
    chatId: number;
    chatContent: CreateChatCompletionRequest;
  };
  error?: {
    message: string;
  };
};
