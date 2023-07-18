import { getAuth } from 'firebase/auth';

export const deleteThread = async (threadId: string) => {
  // Todo: idTokenを取得するが、これは後々クッキーで管理すべき
  const user = getAuth().currentUser;
  if (!user) {
    throw new Error('user is not logged in');
  }
  const idToken = await user.getIdToken();

  await fetch('/api/threads/' + threadId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
};
