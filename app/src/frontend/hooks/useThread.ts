import useSWR, { unstable_serialize } from 'swr';

export const useThread = (token: string) => {
  const fetchWithToken = async (url: string, token: string) => {
    console.log(url, token);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const resBody = await response.json();
    console.log(resBody);
    return resBody;
  };
  const { data, error, isLoading } = useSWR(['/api/threads', token], ([url, token]) =>
    fetchWithToken(url, token)
  );
  console.log('useThread', data);
  return { data, error, isLoading };
};
