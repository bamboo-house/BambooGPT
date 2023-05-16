import { getFirestore, collection, doc, setDoc, serverTimestamp } from '@firebase/firestore';
import { getDocs, query, where } from 'firebase/firestore';
import { ThreadRecord } from './threadRecord';

export class ThreadGateway {
  private _collection: ReturnType<typeof collection>;

  constructor() {
    this._collection = collection(getFirestore(), 'threads');
  }

  async create(uid: string, name: string): Promise<ThreadRecord> {
    const userDocRef = doc(getFirestore(), 'users', uid);
    // TODO: Gatewayではエラーを投げたくない。application層かdomain層でエラーを投げるようにする。
    if (!userDocRef) {
      throw new Error('threadGateway.ts：ユーザーが存在しません');
    }

    const updatedAt = serverTimestamp();
    const createdAt = serverTimestamp();
    const threadDocRef = doc(this._collection);
    try {
      await setDoc(threadDocRef, {
        user: userDocRef,
        name: name,
        deletedAt: null,
        updatedAt: updatedAt,
        createdAt: createdAt,
      })
        .then((docRef) => {
          console.error('Document has been added successfully', docRef);
        })
        .catch((error) => {
          console.error('エラーですよー', error);
        });
    } catch (error) {
      throw new Error(`スレッド作成ができませんでした：${error}`);
    }

    return new ThreadRecord(threadDocRef.id, userDocRef, name, null, updatedAt, createdAt);
  }

  // async get(threadId: string): Promise<ThreadRecord | undefined> {
  //   return new ThreadRecord('', '', '', '', '', '');
  // }

  async getAll(uid: string): Promise<ThreadRecord[]> {
    const userDocRef = doc(getFirestore(), 'users', uid);
    // TODO: Gatewayではエラーを投げたくない。application層かdomain層でエラーを投げるようにする。
    if (!userDocRef) {
      throw new Error('threadGateway.ts：ユーザーが存在しません');
    }

    const q = query(this._collection, where('user', '==', userDocRef));
    let threadRecords: ThreadRecord[] = [];
    try {
      const threadDocSnapshot = await getDocs(q);
      threadDocSnapshot.forEach((doc) => {
        threadRecords.push(
          new ThreadRecord(
            doc.id,
            userDocRef,
            doc.data().name,
            doc.data().deletedAt,
            doc.data().updatedAt,
            doc.data().createdAt
          )
        );
      });
    } catch (error) {
      throw new Error(`Threadを取得できませんでした: ${error}`);
    }
    return threadRecords;
  }
}
