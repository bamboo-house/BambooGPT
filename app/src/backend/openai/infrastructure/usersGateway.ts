import { DocumentData, getFirestore } from "firebase-admin/firestore";
import { initializeFirebase } from "./initializeFirebase";
import { GoogleUserInfo, User } from "@/bff/types/firestore/usersCollection";

export class UsersGateway {
  private _collection: FirebaseFirestore.CollectionReference<DocumentData>;

  constructor() {
    initializeFirebase();

    this._collection = getFirestore().collection('users')
  }

  async create(uid: string, name: string | null, description: string | null, image: string | null, googleUserInfo: GoogleUserInfo): Promise<void> {
    const userCollectionRef = this._collection.doc(uid);
    try {
      await userCollectionRef.set({
        name: name,
        description: description,
        image: image,
        googleUserInfo: googleUserInfo,
      });
    } catch (error) {
      throw new Error("ユーザー作成ができませんでした：", error);
    }
  }

  async getUser(uid: string): Promise<User | null> {
    const userDocSnapshot = await this._collection.doc(uid).get();
    let user;
    if (userDocSnapshot.exists && userDocSnapshot.data() !== undefined) {
      user = userDocSnapshot.data() as User;
    } else {
      user = null
    }
    return user;
  }
}