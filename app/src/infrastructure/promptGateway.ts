import { DocumentData, DocumentReference, Firestore, Timestamp } from 'firebase-admin/firestore';

export class PromptGateway {
  collection: FirebaseFirestore.CollectionReference<DocumentData>;
  constructor(private _db: Firestore) {
    this.collection = this._db.collection('prompts');
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

    const docRef = this.collection.doc();

    docRef.set(data);
  }
}
