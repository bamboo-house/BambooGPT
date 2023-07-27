import { atom } from 'recoil';

export const chatAbortControllerState = atom<AbortController>({
  key: 'chatAbortControllerState',
  default: new AbortController(),
});
