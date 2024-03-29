import { useRecoilValue } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserAtom';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth.ts';

export const Firebase = () => {
  const { loginWithGoogle, logout } = useFirebaseAuth();
  const currentUser = useRecoilValue(currentUserState);

  return (
    <>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={logout}
      >
        ログアウト
      </button>
      {currentUser.uid ? (
        <div>
          <p>
            ログインしました:{currentUser.name}, {currentUser.uid}
          </p>
        </div>
      ) : (
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={loginWithGoogle}
        >
          Googleでログイン
        </button>
      )}
    </>
  );
};
