import { atom } from 'recoil';

export const isOpenedRightSidebarState = atom<boolean>({
  key: 'isOpenedRightSidebarState',
  default: false,
});
