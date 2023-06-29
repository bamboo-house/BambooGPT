import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { useThread } from '../hooks/useThread';

export const TestSWR = (props: any) => {
  const currentUser = useRecoilValue(currentUserState);

  const { data, error, isLoading } = useThread(currentUser.idToken);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  // return <>{data && `${data}`}</>;
  return <></>;
};
