import { DocumentData, getFirestore } from 'firebase-admin/firestore';
import { initializeFirebaseForBE } from '../utils/initializeFirebaseForBE';

export class ChatGateway {
  private _collection: FirebaseFirestore.CollectionReference<DocumentData>;
  constructor() {
    initializeFirebaseForBE();
    this._collection = getFirestore().collection('chats');
  }
}
