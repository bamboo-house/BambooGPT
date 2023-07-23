import { atom } from 'recoil';

export const chatAbortControllerState = atom<AbortController>({
  key: 'abortControllerState',
  default: new AbortController(),
});
