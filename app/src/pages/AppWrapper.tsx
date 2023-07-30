import { ReactNode } from 'react';
import { useCurrentUserSetter } from '@/frontend/hooks/useCurrentUserSetter';

type Props = {
  children: ReactNode;
};

export const AppWrapper = ({ children }: Props) => {
  // ユーザーを指定
  // 2023/6/23：_app.tsxに書くと、RecoilRootでエラーが出るのでここに置く
  useCurrentUserSetter();
  return <>{children}</>;
};
