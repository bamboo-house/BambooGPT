import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
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

  async get(chatId: string): Promise<ChatRecord | undefined> {
    let chat;
    try {
      const chatDocSnapshot = await getDoc(doc(this._collection, chatId));
      if (chatDocSnapshot.exists() && chatDocSnapshot.data() !== undefined) {
        chat = chatDocSnapshot.data();
        if (!chat) return undefined;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error(error);
      throw new Error(`chatドキュメントを取得できませんでした：${error}`);
    }

    return new ChatRecord(
      chatId,
      chat.user,
      chat.thread,
      chat.chatContent,
      chat.deletedAt,
      chat.updatedAt,
      chat.createdAt
    );
  }

  async getWithThread(threadDoc: DocumentReference): Promise<ChatRecord[]> {
    const q = query(this._collection, where('thread', '==', threadDoc));
    const chatDocSnapshot = await getDocs(q);
    if (chatDocSnapshot.empty) {
      return [];
    }

    chatDocSnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });

    let chatRecords: ChatRecord[] = [];

    return chatRecords;
  }

  async getAll(uid: string): Promise<ChatRecord[]> {
    const userDocRef = doc(getFirestore(), 'users', uid);
    // TODO: Gatewayではエラーを投げたくない。application層かdomain層でエラーを投げるようにする。
    if (!userDocRef) {
      console.error('chatGateway.ts：ユーザーが存在しません');
      throw new Error('chatGateway.ts：ユーザーが存在しません');
    }

    const q = query(this._collection, where('user', '==', userDocRef));
    let chatRecords: ChatRecord[] = [];
    try {
      const threadDocSnapshot = await getDocs(q);
      threadDocSnapshot.forEach((doc) => {
        const chat = doc.data();
        chatRecords.push(
          new ChatRecord(
            doc.id,
            chat.user,
            chat.thread,
            chat.chatContent,
            chat.deletedAt,
            chat.updatedAt,
            chat.createdAt
          )
        );
      });
    } catch (error) {
      console.error(error);
      throw new Error(`chatドキュメントを取得できませんでした: ${error}`);
    }
    return chatRecords;
  }
}
