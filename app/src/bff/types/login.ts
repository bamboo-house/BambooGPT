import { GoogleUserInfo } from './firestore/usersCollection';

export type ReqLoginGoogle = {
  googleUserInfo: GoogleUserInfo;
};

export type ResLoginGoogle = {
  name: string;
  image: string;
};
