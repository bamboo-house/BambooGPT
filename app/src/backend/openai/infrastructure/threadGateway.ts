import { DocumentData, FieldValue, getFirestore } from 'firebase-admin/firestore';
import { initializeFirebase } from './initializeFirebase';
import { ThreadRecord } from './threadRecord';
import { UserGateway } from './userGateway';

export class ThreadGateway {
  private _collection: FirebaseFirestore.CollectionReference<DocumentData>;
  constructor() {
    initializeFirebase();
    this._collection = getFirestore().collection('threads');
  }

  async create(uid: string): Promise<ThreadRecord> {
    const userGateway = new UserGateway();
    const userRef = await userGateway.getUserDocRef(uid);

    // TODO: Gatewayではエラーを投げたくない。application層かdomain層でエラーを投げるようにする。
    if (!userRef) {
      throw new Error('ユーザーが存在しません');
    }

    const updatedAt = FieldValue.serverTimestamp();
    const createdAt = FieldValue.serverTimestamp();
    await this._collection.add({
      user: userRef,
      name: null,
      deletedAt: null,
      updatedAt: updatedAt,
      createdAt: createdAt,
    });
    return new ThreadRecord(userRef, null, null, updatedAt, createdAt);
  }
}
