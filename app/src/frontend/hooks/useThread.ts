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

export const useThread = (token: string) => {
  const { data, error, isLoading } = useSWR<any, any>(['/api/threads', token], fetchWithToken);
  console.log('useThread', data);
  return { data, error, isLoading };
};

// export const useTest = () => {
//   const { data, error, isLoading } = useSWR(
//     'https://jsonplaceholder.typicode.com/todos/1',
//     fetcher
//   );

//   return {
//     data,
//     isLoading,
//     error,
//   };
// };

const fetchWithToken = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
  }).then((res) => {
    console.log('かせせ', res);
    res.json();
  });

// const fetcher = (url: any) => fetch(url).then((res) => res.json());
