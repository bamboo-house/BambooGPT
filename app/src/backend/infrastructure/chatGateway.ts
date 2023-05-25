import { DocumentData, collection, doc, getFirestore } from 'firebase/firestore';
import { CreateChatCompletionRequest } from 'openai';
import { ChatRecord } from './chatRecord';

export class ChatGateway {
  private _collection: ReturnType<typeof collection>;
  constructor() {
    this._collection = collection(getFirestore(), 'threads');
  }

  async create(
    uid: string,
    threadId: string,
    chatContent: CreateChatCompletionRequest
  ): Promise<ChatRecord> {
    const userDocRef = doc(getFirestore(), 'users', uid);
    const threadDocRef = doc(getFirestore(), 'threads', threadId);

    return new ChatRecord();
  }
}
