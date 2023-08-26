import { getAuth } from 'firebase/auth';
import { ReqCreateThread, ResPostThread } from '@/bff/types/thread';

export const createThread = async (
  name: string
): Promise<{ id: number; userId: string; name: string; createdAt: Date; updatedAt: Date }> => {
  // Todo: idTokenを取得するが、これは後々クッキーで管理すべき

  const response = await fetch('/api/threads', {
    method: 'POST',
  });
  const resBody: ResPostThread = await response.json();
  if (resBody.error) {
    console.error('fail to create thread');
    throw new Error(resBody.error.message);
  }
  const body = resBody.body;
  if (!body) {
    throw new Error('fail to create thread');
  }

  return body;
};
