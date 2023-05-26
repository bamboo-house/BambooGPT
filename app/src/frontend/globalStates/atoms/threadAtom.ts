import { atom } from 'recoil';

export type Thread = {
  threadId: string;
  name: string | null;
};

export const threadListState = atom<Thread[]>({
  key: 'threadListState',
  default: [],
});
