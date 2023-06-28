import { atom } from 'recoil';

type User = {
  uid: string | null;
  name: string | null;
  image: string | null;
  idToken: string;
};

export const currentUserState = atom<User>({
  key: 'currentUserState',
  default: { uid: null, name: null, image: null, idToken: '' },
});
