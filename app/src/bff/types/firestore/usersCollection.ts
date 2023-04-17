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

export type User = {
  name: string;
  description: string | null;
  image: string;
  googleUserInfo: GoogleUserInfo;
};
