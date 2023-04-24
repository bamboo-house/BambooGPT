import { DocumentData, getFirestore } from 'firebase-admin/firestore';
import { initFirebase } from '@/frontend/utils/firebaseInit';

export class ChatGateway {
  private _collection: FirebaseFirestore.CollectionReference<DocumentData>;
  constructor() {
    initFirebase();
    this._collection = getFirestore().collection('chats');
  }
}
