import { FieldValue, Timestamp } from 'firebase/firestore';
import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';

export class UserRecord {
  constructor(
    private _name: string | null,
    private _description: string | null,
    private _image: string | null,
    private _deletedAt: Timestamp | FieldValue | null,
    private _updatedAt: Timestamp | FieldValue,
    private _createdAt: Timestamp | FieldValue,
    private _googleUserInfo: GoogleUserInfo | null
  ) {}

  get name(): string | null {
    return this._name;
  }

  get image(): string | null {
    return this._image;
  }
}
