import { Timestamp } from 'firebase-admin/firestore';

export class PromptRecord {
  constructor(
    private _uid: string,
    private _prompt: string,
    private _createdAt: Timestamp,
    private _updatedAt: Timestamp
  ) {}
}
