import { atom } from 'recoil';

type Thread = {
  threadId: string;
  name: string | null;
};

export const threadsState = atom<Thread[]>({
  key: 'threadsState',
  default: [],
});
