import { DocumentData, getFirestore } from 'firebase-admin/firestore';
import { initFirebase } from '@/frontend/utils/firebaseInit';

export class ThreadGateway {
  private _collection: FirebaseFirestore.CollectionReference<DocumentData>;
  constructor() {
    initFirebase();
    this._collection = getFirestore().collection('threads');
  }
}
