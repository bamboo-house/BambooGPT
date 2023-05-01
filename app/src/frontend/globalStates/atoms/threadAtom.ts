import { atom } from 'recoil';

type Thread = {
  threadId: string;
  name: string | null;
};

export const threadListState = atom<Thread[]>({
  key: 'threadListState',
  default: [],
});
