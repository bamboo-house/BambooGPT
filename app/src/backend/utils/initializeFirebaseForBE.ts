import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import * as serviceAccount from '../../../firebase-test-serviceAccount.json';

export const initializeFirebaseForBE = () => {
  if (admin.apps.length === 0) {
    initializeApp({
      credential: cert(serviceAccount as any),
    });

    // 開発環境の場合はエミュレータに接続
    if (process.env.NODE_ENV === 'development') {
      const auth = getAuth();
      connectAuthEmulator(auth, 'http://host.docker.internal:9099');
      const db = getFirestore();
      connectFirestoreEmulator(db, 'host.docker.internal', 8080);
    }
  }
};
