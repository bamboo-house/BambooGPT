import { DocumentReference } from 'firebase/firestore';
import { CreateChatCompletionRequest } from 'openai';

export type ResGetChat = {
  body?: {
    chatId: string;
    user: DocumentReference;
    thread: DocumentReference;
    chatContent: CreateChatCompletionRequest;
  };
  error?: {
    message: string;
  };
};
