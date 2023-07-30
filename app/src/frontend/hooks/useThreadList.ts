import useSWR from 'swr';

export const useThreadList = (token: string) => {
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
  const { data, error, isLoading } = useSWR(['/api/threads', token], ([url, token]) =>
    fetchWithToken(url, token)
  );
  return { data, error, isLoading };
};
