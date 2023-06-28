import { getAuth } from 'firebase/auth';
import { useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { useThread } from '../hooks/useThread';

// const idToken = async () => {
//   const user = getAuth().currentUser;
//   if (!user) {
//     return;
//   }
//   const idToken = await user.getIdToken();
//   return idToken;
// };

export const TestSWR = (props: any) => {
  const currentUser = useRecoilValue(currentUserState);

  // const { data, error, isLoading } = useSWR(
  //   'https://jsonplaceholder.typicode.com/todos/1',
  //   fetcher
  // );
  // const token: any = idToken();
  const { data, error, isLoading } = useThread(currentUser.idToken);
  console.log('TestSWR', data);
  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  // return <>{data && `${data}`}</>;
  return <></>;
};
