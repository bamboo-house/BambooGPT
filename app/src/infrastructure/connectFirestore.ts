import * as serviceAccount from '../../firebase-test-serviceAccount.json';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';

export const connectFirestore = () => {
  if (admin.apps.length === 0) {
    initializeApp({
      credential: cert(serviceAccount as any),
    });
  }

  return getFirestore();
};
