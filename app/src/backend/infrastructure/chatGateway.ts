import { DocumentData, getFirestore } from 'firebase-admin/firestore';
import { initializeFirebase } from '../util/initializeFirebase';

export class ChatGateway {
  private _collection: FirebaseFirestore.CollectionReference<DocumentData>;
  constructor() {
    initializeFirebase();
    this._collection = getFirestore().collection('chats');
  }
}
