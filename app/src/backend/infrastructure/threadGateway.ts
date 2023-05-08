import { getFirestore, collection, doc, setDoc, serverTimestamp } from '@firebase/firestore';
import { initializeFirebase } from '../util/initializeFirebase';
import { ThreadRecord } from './threadRecord';
import { UserGateway } from './userGateway';

export class ThreadGateway {
  private _collection: ReturnType<typeof collection>;
  constructor() {
    initializeFirebase();
    this._collection = collection(getFirestore(), 'threads');
  }

  async create(uid: string): Promise<ThreadRecord> {
    const userGateway = new UserGateway();
    const userRef = await userGateway.getDocRef(uid);

    // TODO: Gatewayではエラーを投げたくない。application層かdomain層でエラーを投げるようにする。
    if (!userRef) {
      throw new Error('ユーザーが存在しません');
    }

    const updatedAt = serverTimestamp();
    const createdAt = serverTimestamp();
    const threadDocRef = doc(this._collection);
    await setDoc(threadDocRef, {
      user: userRef,
      name: null,
      deletedAt: null,
      updatedAt: updatedAt,
      createdAt: createdAt,
    });

    return new ThreadRecord(threadDocRef.id, userRef, null, null, updatedAt, createdAt);
  }

  async get(threadId: string): Promise<ThreadRecord | undefined> {
    return new ThreadRecord('', '', '', '', '', '');
  }

  async getAll(): Promise<ThreadRecord[]> {
    return [];
  }
}
