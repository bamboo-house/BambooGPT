import { ChatContent } from '@/backend/infrastructure/chatRecord';

export type ReqPostOpenaiChat = {
  uid: string;
  threadId: string;
  chatContent: ChatContent;
};
