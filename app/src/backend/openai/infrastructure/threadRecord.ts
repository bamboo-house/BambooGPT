import { DocumentReference, FieldValue, Timestamp } from 'firebase-admin/firestore';

export class ThreadRecord {
  constructor(
    private _user: DocumentReference,
    private _name: string | null,
    private _deletedAt: Timestamp | FieldValue | null,
    private _updatedAt: Timestamp | FieldValue,
    private _createdAt: Timestamp | FieldValue
  ) {}
}
