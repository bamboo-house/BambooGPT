import { DocumentReference, FieldValue, Timestamp } from '@firebase/firestore';
import { CreateChatCompletionRequest } from 'openai';

export class ChatRecord {
  constructor(
    private _chatId: string,
    private _user: DocumentReference,
    private _thread: DocumentReference,
    private _chatContent: CreateChatCompletionRequest,
    private _deletedAt: Timestamp | FieldValue | null,
    private _updatedAt: Timestamp | FieldValue,
    private _createdAt: Timestamp | FieldValue
  ) {}

  get chatId(): string {
    return this._chatId;
  }

  get user(): DocumentReference {
    return this._user;
  }

  get thread(): DocumentReference {
    return this._thread;
  }

  get chatContent(): CreateChatCompletionRequest {
    return this._chatContent;
  }
}
