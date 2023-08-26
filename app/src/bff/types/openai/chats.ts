import { CreateChatCompletionRequest } from 'openai';

export type ReqPostOpenaiChat = {
  threadId: string;
  chatContent: CreateChatCompletionRequest;
};
