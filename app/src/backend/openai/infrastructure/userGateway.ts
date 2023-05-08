import { getFirestore, collection, doc, setDoc, getDoc } from '@firebase/firestore';
import { initializeFirebase } from './initializeFirebase';
import { UserRecord } from './userRecord';
import type { GoogleUserInfo } from '@/bff/types/firestore/usersCollection';

export class UserGateway {
  private _collection: ReturnType<typeof collection>;

  constructor() {
    initializeFirebase();
    this._collection = collection(getFirestore(), 'users');
  }

  async create(
    uid: string,
    name: string | null,
    description: string | null,
    image: string | null,
    googleUserInfo: GoogleUserInfo
  ): Promise<UserRecord> {
    const userDocRef = doc(this._collection, uid);
    const updatedAt = new Date().toISOString();
    const createdAt = new Date().toISOString();
    try {
      await setDoc(userDocRef, {
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

  async get(uid: string): Promise<UserRecord | undefined> {
    let user;
    try {
      const userDocSnapshot = await getDoc(doc(this._collection, uid));
      if (userDocSnapshot.exists() && userDocSnapshot.data() !== undefined) {
        user = userDocSnapshot.data();
        if (!user) return undefined;
      } else {
        return undefined;
      }
    } catch (error) {
      throw new Error(`ユーザーを取得できませんでした：${error}`);
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

  async getDocRef(uid: string): Promise<ReturnType<typeof doc> | undefined> {
    const userDocRef = doc(this._collection, uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (!userDocSnapshot.exists()) {
      return undefined;
    }
    return userDocRef;
  }
}
