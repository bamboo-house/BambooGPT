import { getFirestore, DocumentData, Timestamp } from 'firebase-admin/firestore';
import { initializeFirebase } from './initializeFirebase';

export class PromptGateway {
  collection: FirebaseFirestore.CollectionReference<DocumentData>;
  constructor() {
    // firestore初期化
    initializeFirebase();
    // promptsコレクション取得
    this.collection = getFirestore().collection('prompts');
  }

  async create(uid: string, prompt: string) {
    const createdAt = Timestamp.now();
    const updatedAt = Timestamp.now();
    const data = {
      uid: uid,
      prompt: prompt,
      createdAt: createdAt,
      updatedAt: updatedAt,
    };

    try {
      const docRef = this.collection.doc();
      docRef.set(data);
      console.log('=== success create doc ===');
    } catch (error) {
      console.log(error);
    }
  }
}
