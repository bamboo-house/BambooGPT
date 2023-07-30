import { atom } from 'recoil';

type User = {
  uid: string;
  name: string | null;
  image: string | null;
  idToken: string;
};

export const currentUserState = atom<User>({
  key: 'currentUserState',
  default: { uid: '', name: null, image: null, idToken: '' },
});
