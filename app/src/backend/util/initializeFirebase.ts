import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import * as serviceAccount from '../../../firebase-test-serviceAccount.json';

export const initializeFirebase = () => {
  if (admin.apps.length === 0) {
    initializeApp({
      credential: cert(serviceAccount as any),
    });
  }
};
