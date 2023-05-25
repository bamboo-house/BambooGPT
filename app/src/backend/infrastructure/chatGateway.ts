import { collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';
import { CreateChatCompletionRequest } from 'openai';
import { ChatRecord } from './chatRecord';

export class ChatGateway {
  private _collection: ReturnType<typeof collection>;
  constructor() {
    this._collection = collection(getFirestore(), 'chats');
  }

  async create(
    uid: string,
    threadId: string,
    chatContent: CreateChatCompletionRequest
  ): Promise<ChatRecord> {
    const userDocRef = doc(getFirestore(), 'users', uid);
    const threadDocRef = doc(getFirestore(), 'threads', threadId);

    const updatedAt = serverTimestamp();
    const createdAt = serverTimestamp();
    const chatDocRef = doc(this._collection);
    try {
      await setDoc(chatDocRef, {
        user: userDocRef,
        thread: threadDocRef,
        chatContent: {
          model: chatContent.model,
          messages: chatContent.messages,
          temperature: chatContent.temperature || null,
          top_p: chatContent.top_p || null,
          n: chatContent.n || null,
          stream: chatContent.stream || null,
          stop: chatContent.stop || null,
          max_tokens: chatContent.max_tokens || null,
          presence_penalty: chatContent.presence_penalty || null,
          frequency_penalty: chatContent.frequency_penalty || null,
          logit_bias: chatContent.logit_bias || null,
          user: chatContent.user || null,
        },
        deletedAt: null,
        updatedAt: updatedAt,
        createdAt: createdAt,
      })
        .then((docRef) => {
          console.error('Document has been added successfully');
        })
        .catch((error) => {
          console.error('エラーですよー', error);
        });
    } catch (error) {
      console.error(error);
      throw new Error(`チャット作成ができませんでした：${error}`);
    }

    return new ChatRecord(
      chatDocRef.id,
      userDocRef,
      threadDocRef,
      chatContent,
      null,
      updatedAt,
      createdAt
    );
  }
}
