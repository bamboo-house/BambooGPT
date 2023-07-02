import { CreateChatCompletionRequest } from 'openai';

export type ResGetChat = {
  body?: {
    chatId: string;
    uid: string;
    threadId: string;
    chatContent: CreateChatCompletionRequest;
  };
  error?: {
    message: string;
  };
};
