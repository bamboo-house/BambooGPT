import { useRecoilValue } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { useThreadList } from '../hooks/useThreadList';

export const TestSWR = (props: any) => {
  const currentUser = useRecoilValue(currentUserState);

  const { data, error, isLoading } = useThreadList(currentUser.idToken);

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  if (data.body)
    return (
      <ul>
        {data.body.map((ele: any) => (
          <li key={ele.threadId}>{ele.threadId}</li>
        ))}
      </ul>
    );
};
