import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from '@firebase/firestore';
import { ThreadRecord } from './threadRecord';
import { UserGateway } from './userGateway';

export class ThreadGateway {
  private _collection: ReturnType<typeof collection>;

  constructor() {
    this._collection = collection(getFirestore(), 'threads');
  }

  async create(uid: string, name: string): Promise<ThreadRecord> {
    // const threadDocSnapshot = await getDoc(doc(this._collection, 'aqGaQYZqbVYOPuUKJ9SO'));
    // console.log('threadDocSnapshot', threadDocSnapshot.data());
    // const userDocSnapshot = await getDoc(threadDocSnapshot.data()?.user);
    // console.log('userDocSnapshot', userDocSnapshot.data());

    // const userGateway = new UserGateway();
    // const userDocRef = await userGateway.getDocRef(uid);
    const userCollection = collection(getFirestore(), 'users');
    const userDocRef = doc(userCollection, uid);

    // TODO: Gatewayではエラーを投げたくない。application層かdomain層でエラーを投げるようにする。
    if (!userDocRef) {
      throw new Error('threadGateway.ts：ユーザーが存在しません');
    }

    const updatedAt = serverTimestamp();
    const createdAt = serverTimestamp();
    const threadDocRef = doc(this._collection);
    console.log('threadDocRef:', threadDocRef.path);
    console.log(userDocRef.path);
    try {
      await setDoc(threadDocRef, {
        user: userDocRef.path,
        name: name,
        deletedAt: null,
        updatedAt: updatedAt,
        createdAt: createdAt,
      })
        .then((docRef) => {
          console.log('Document has been added successfully', docRef);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      throw new Error(`スレッド作成ができませんでした：${error}`);
    }

    return new ThreadRecord(threadDocRef.id, userDocRef, name, null, updatedAt, createdAt);
  }

  // async get(threadId: string): Promise<ThreadRecord | undefined> {
  //   return new ThreadRecord('', '', '', '', '', '');
  // }

  async getAll(): Promise<ThreadRecord[]> {
    return [];
  }
}
