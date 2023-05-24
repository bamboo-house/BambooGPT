import { CreateChatCompletionRequest } from 'openai';

export type ReqPostOpenaiChat = {
  uid: string;
  threadId: string;
  chatContent: CreateChatCompletionRequest;
};
