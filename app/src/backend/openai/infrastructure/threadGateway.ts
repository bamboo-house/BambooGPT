import { DocumentData, getFirestore } from 'firebase-admin/firestore';
import { initializeFirebase } from './initializeFirebase';

export class ThreadGateway {
  private _collection: FirebaseFirestore.CollectionReference<DocumentData>;
  constructor() {
    initializeFirebase();
    this._collection = getFirestore().collection('threads');
  }

  async create(uid: string): Promise<string> {

    // addでドキュメントを作成する
    const docRef = await this._collection.add({uid: uid})
    console.log(docRef.id)

    return docRef.id
  }
}
