import { getAuth } from 'firebase/auth';
import { ResPostThread } from '@/bff/types/thread';

export const createThread = async (): Promise<{ threadId: string; name: string }> => {
  // Todo: idTokenを取得するが、これは後々クッキーで管理すべき

  const user = getAuth().currentUser;
  if (!user) {
    throw new Error('user is not logged in');
  }
  const idToken = await user.getIdToken();

  const response = await fetch('/api/threads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
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
