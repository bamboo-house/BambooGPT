import { getAuth } from 'firebase/auth';
import useSWR from 'swr';

// const useUserIdToken = async () => {
//   const user = getAuth().currentUser;
//   if (!user) {
//     return;
//   }
//   const idToken = await user.getIdToken();
//   return idToken;
// };

export const useThread = (threadId: string) => {
  const { data, error, isLoading } = useSWR(`/api/threads/${threadId}`, fetcher);
  console.log(data);
  return { data, error, isLoading };
};

const fetcher = (url: string, token: string) => {
  // const headers = { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' };
  fetch(url).then((res) => {
    res.json();
  });
};
