import { useRecoilValue } from 'recoil';
import { currentUserState } from '../globalStates/atoms/currentUserState';
import { useAuth } from '../utils/googleAuth';

export const Firebase = () => {
  const { loginWithGoogle, logout } = useAuth();
  const currentUser = useRecoilValue(currentUserState);

  return (
    <>
      <button
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
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
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={loginWithGoogle}
        >
          Googleでログイン
        </button>
      )}
    </>
  );
};
