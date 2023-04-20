export type User = {
  name: string | null;
  description: string | null;
  image: string | null;
  googleUserInfo: GoogleUserInfo | null;
};

// 2023/4/19
// TwitterUserInfoなどを作りたい場合は、ProviderUserInfoを作成して継承するようにする。
// このような抽象オブジェクトはtypeではなく、クラスを作りimplementsできるようにしたほうがいいかもしれない。

// 下記を参考に型を決めた。setするときはundefinedだとエラーが出るので、nullにしておく。
// https://firebase.google.com/docs/reference/js/auth.userinfo.md#userinfodisplayname
export type GoogleUserInfo = {
  idToken: string;
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

