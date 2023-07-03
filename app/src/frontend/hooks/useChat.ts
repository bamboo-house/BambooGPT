import { useRecoilState } from 'recoil';
import useSWR from 'swr';
import { ResGetChat } from '@/bff/types/chat';

export const useChat = (chatId: string, token: string) => {
  const fetchWithToken = async (url: string, token: string) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const resBody: ResGetChat = await response.json();
    return resBody;
  };
  // Todo: dataの中でもerrorを返すので、下記のerrorは不要かもしれない。fetcherのなかでErrorをthrowすればここに入るらしい
  const { data, error, isLoading } = useSWR(['/api/chats/' + chatId, token], ([url, token]) =>
    fetchWithToken(url, token)
  );
  return { data, error, isLoading };
};
