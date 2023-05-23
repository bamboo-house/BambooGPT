import { DocumentReference, FieldValue, Timestamp } from '@firebase/firestore';

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
};

export type ChatContent = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
  max_tokens?: number | undefined;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: { [key: string]: number } | null;
  user?: string | undefined;
};

export class ChatRecord {
  constructor(
    private _chatId: string,
    private _user: DocumentReference,
    private _thread: DocumentReference,
    private _chatContent: ChatContent,
    private _deletedAt: Timestamp | FieldValue | null,
    private _updatedAt: Timestamp | FieldValue,
    private _createdAt: Timestamp | FieldValue
  ) {}
}
