import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';

export class UserRecord {
  constructor(
    private _name: string | null,
    private _description: string | null,
    private _image: string | null,
    private _deletedAt: string | null,
    private _updatedAt: string,
    private _createdAt: string,
    private _googleUserInfo: GoogleUserInfo | null
  ) {}

  get name(): string | null {
    return this._name;
  }

  get image(): string | null {
    return this._image;
  }
}
