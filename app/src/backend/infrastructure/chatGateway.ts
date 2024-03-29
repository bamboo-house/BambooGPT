import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
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
        if (chat.deletedAt !== null) return undefined;
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

  async getLatestChatIdByThread(threadDoc: DocumentReference): Promise<string> {
    const q = query(
      this._collection,
      where('thread', '==', threadDoc),
      where('deletedAt', '==', null),
      orderBy('updatedAt', 'desc'),
      limit(1)
    );
    const chatDocSnapshot = await getDocs(q);
    if (chatDocSnapshot.empty) return '';

    let chatId: string = '';
    chatDocSnapshot.forEach((doc) => {
      if (doc.ref.id === undefined) return '';
      chatId = doc.ref.id;
    });
    return chatId;
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

  async deleteAllByThreadId(threadId: string): Promise<void> {
    const threadDocRef = doc(getFirestore(), 'threads', threadId);
    if (!threadDocRef) {
      console.error('chatGateway.ts：スレッドが存在しません');
      throw new Error('chatGateway.ts：スレッドが存在しません');
    }
    const deletedAt = serverTimestamp();
    const q = query(
      this._collection,
      where('thread', '==', threadDocRef),
      where('deletedAt', '==', null)
    );
    try {
      const chatDocSnapshot = await getDocs(q);
      chatDocSnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { deletedAt: deletedAt }).then(() => {
          console.log('Chat Document successfully deleted!', doc.ref.id);
        });
      });
    } catch (error) {
      console.error(error);
      throw new Error(`全てのchatを削除できませんでした: ${error}`);
    }
  }
}
