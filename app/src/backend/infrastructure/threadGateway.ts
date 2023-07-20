import { getFirestore, collection, doc, setDoc, serverTimestamp } from '@firebase/firestore';
import { DocumentReference, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
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
      console.error('threadGateway.ts：ユーザーが存在しません');
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
          console.log('Document has been added successfully', docRef);
        })
        .catch((error) => {
          console.error('エラーですよー', error);
        });
    } catch (error) {
      console.error(error);
      throw new Error(`スレッド作成ができませんでした：${error}`);
    }

    return new ThreadRecord(
      threadDocRef.id,
      threadDocRef,
      userDocRef,
      name,
      null,
      updatedAt,
      createdAt
    );
  }

  async get(threadId: string): Promise<ThreadRecord | undefined> {
    let thread;
    let threadDoc;
    try {
      const threadDocSnapshot = await getDoc(doc(this._collection, threadId));
      if (!threadDocSnapshot.exists() || threadDocSnapshot.data() === undefined) {
        return undefined;
      }
      thread = threadDocSnapshot.data();
      // QueryDocumentSnapshotからDocumentReferenceを取得する
      threadDoc = threadDocSnapshot.ref;
    } catch (error) {
      console.error(error);
      throw new Error(`スレッドを取得できませんでした：${error}`);
    }

    return new ThreadRecord(
      threadId,
      threadDoc,
      thread.user,
      thread.name,
      thread.deletedAt,
      thread.updatedAt,
      thread.createdAt
    );
  }

  async getAll(uid: string): Promise<ThreadRecord[]> {
    const userDocRef = doc(getFirestore(), 'users', uid);
    // TODO: Gatewayではエラーを投げたくない。application層かdomain層でエラーを投げるようにする。
    if (!userDocRef) {
      console.error('threadGateway.ts：ユーザーが存在しません');
      throw new Error('threadGateway.ts：ユーザーが存在しません');
    }

    const q = query(
      this._collection,
      where('user', '==', userDocRef),
      where('deletedAt', '==', null)
    );
    let threadRecords: ThreadRecord[] = [];
    try {
      const threadDocSnapshot = await getDocs(q);
      threadDocSnapshot.forEach((doc) => {
        threadRecords.push(
          new ThreadRecord(
            doc.id,
            doc.ref,
            userDocRef,
            doc.data().name,
            doc.data().deletedAt,
            doc.data().updatedAt,
            doc.data().createdAt
          )
        );
      });
    } catch (error) {
      console.error(error);
      throw new Error(`Threadを取得できませんでした: ${error}`);
    }
    return threadRecords;
  }

  async delete(threadId: string): Promise<void> {
    try {
      const docRef = doc(this._collection, threadId);
      const deletedAt = serverTimestamp();

      await updateDoc(docRef, { deletedAt: deletedAt }).then(() => {
        console.log('Thread Document successfully deleted!', docRef.id);
      });
    } catch (error) {
      console.error(error);
      throw new Error(`Threadを削除できませんでした: ${error}`);
    }
  }

  async deleteAll(uid: string): Promise<void> {
    const userDocRef = doc(getFirestore(), 'users', uid);
    if (!userDocRef) {
      console.error('threadGateway.ts：ユーザーが存在しません');
      throw new Error('threadGateway.ts：ユーザーが存在しません');
    }

    const deletedAt = serverTimestamp();

    const q = query(
      this._collection,
      where('user', '==', userDocRef),
      where('deletedAt', '==', null)
    );
    try {
      const threadDocSnapshot = await getDocs(q);
      threadDocSnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, { deletedAt: deletedAt }).then(() => {
          console.log('Thread Document successfully deleted!', doc.ref.id);
        });
      });
    } catch (error) {
      console.error(error);
      throw new Error(`全てのThreadを削除できませんでした: ${error}`);
    }
  }
}
