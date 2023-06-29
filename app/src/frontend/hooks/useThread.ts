import useSWR from 'swr';

export const useThread = (threadId: string, token: string) => {
  console.log('useThread: ', threadId, token);
  const fetchWithToken = async (url: string, token: string) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const resBody = await response.json();
    return resBody;
  };
  const { data, error, isLoading } = useSWR(['/api/threads/' + threadId, token], ([url, token]) =>
    fetchWithToken(url, token)
  );
  return { data, error, isLoading };
};
