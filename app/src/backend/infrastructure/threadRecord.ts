import { DocumentReference, FieldValue, Timestamp } from '@firebase/firestore';

export class ThreadRecord {
  constructor(
    private _threadId: string,
    private _docRef: DocumentReference,
    private _user: DocumentReference,
    private _name: string,
    private _deletedAt: Timestamp | FieldValue | null,
    private _updatedAt: Timestamp | FieldValue,
    private _createdAt: Timestamp | FieldValue
  ) {}

  get threadId(): string {
    return this._threadId;
  }

  get docRef(): DocumentReference {
    return this._docRef;
  }

  get name(): string {
    return this._name;
  }
}
