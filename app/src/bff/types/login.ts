import { GoogleUserInfo } from './firestore/usersCollection';

export type ReqLoginGoogle = {
  googleUserInfo: GoogleUserInfo;
};

export type ResLoginGoogle = {
  body?: {
    name: string;
    image: string;
  }
  error?: {
    message: string;
  };
};
