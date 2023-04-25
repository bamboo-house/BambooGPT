import { DocumentData, getFirestore } from 'firebase-admin/firestore';
import { initializeFirebase } from './initializeFirebase';
import { UserRecord } from './userRecord';
import { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';

export class UserGateway {
  private _collection: FirebaseFirestore.CollectionReference<DocumentData>;

  constructor() {
    initializeFirebase();
    this._collection = getFirestore().collection('users');
  }

  async create(
    uid: string,
    name: string | null,
    description: string | null,
    image: string | null,
    googleUserInfo: GoogleUserInfo
  ): Promise<UserRecord> {
    const userDocRef = this._collection.doc(uid);
    const updatedAt = new Date().toISOString();
    const createdAt = new Date().toISOString();
    try {
      await userDocRef.set({
        name: name,
        description: description,
        image: image,
        deletedAt: null,
        updatedAt: updatedAt,
        createdAt: createdAt,
        googleUserInfo: googleUserInfo,
      });
    } catch (error) {
      throw new Error(`ユーザー作成ができませんでした：${error}`);
    }
    return new UserRecord(name, description, image, null, updatedAt, createdAt, googleUserInfo);
  }

  async getUser(uid: string): Promise<UserRecord | undefined> {
    const userDocSnapshot = await this._collection.doc(uid).get();
    let user;
    if (userDocSnapshot.exists && userDocSnapshot.data() !== undefined) {
      user = userDocSnapshot.data();
      if (!user) return undefined;
    } else {
      return undefined;
    }
    return new UserRecord(
      user.name,
      user.description,
      user.image,
      user.deletedAt,
      user.updatedAt,
      user.createdAt,
      user.googleUserInfo
    );
  }

  async getUserDocRef(
    uid: string
  ): Promise<FirebaseFirestore.DocumentReference<DocumentData> | undefined> {
    const userDocRef = this._collection.doc(uid);
    const userDocSnapshot = await userDocRef.get();
    if (!userDocSnapshot.exists) {
      return undefined;
    }
    return userDocRef;
  }
}
