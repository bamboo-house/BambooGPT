// 下記を参考に型を決めた。setするときはundefinedだとエラーが出るので、nullにしておく。
// https://firebase.google.com/docs/reference/js/auth.userinfo.md#userinfodisplayname
export type GoogleUserInfo = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
  providerId: string;
  createdAt: string;
  creationTime: string;
  lastLoginAt: string;
  lastSignInTime: string;
  lastRefreshAt: string;
};
