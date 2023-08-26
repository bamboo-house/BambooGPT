import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      {
        // セッションがある場合、ログアウトを表示
        session && (
          <div>
            <h1>ようこそ, {session.user && session.user.email}</h1>
            <button onClick={() => signOut()}>ログアウト</button>
          </div>
        )
      }
      {
        // セッションがない場合、ログインを表示
        // ログインボタンを押すと、ログインページに遷移する
        !session && (
          <div>
            <p>ログインしていません</p>
            <button
              onClick={() => signIn(undefined, { callbackUrl: 'http://localhost:3000/login' })}
            >
              ログイン
            </button>
          </div>
        )
      }
    </>
  );

  // const { loginWithGoogle } = useFirebaseAuth();
  // const router = useRouter();
  // const handleChangeLogin = async () => {
  //   await loginWithGoogle();
  //   router.push('/');
  // };
  // return (
  //   <div className="relative h-screen w-screen bg-[url('/top-bg.png')] bg-cover">
  //     <div className="h-full w-full " style={{ backgroundColor: 'rgba(52,53,65,.9)' }}>
  //       <div className="absolute left-1/2 top-[45%] z-40 h-[300px] w-[400px] translate-x-[-50%] translate-y-[-50%]	 rounded-2xl bg-gpt-dark opacity-100 shadow-lg ">
  //         <div className="h-full w-full p-9">
  //           <h1 className="text-center text-3xl font-bold">BambooAGI</h1>
  //           <p className="mb-16 mt-5 text-sm">
  //             BambooAGIはプロンプト情報共有プラットフォームです。知見やアイデアをシェアしましょう。
  //           </p>
  //           <div className="text-center">
  //             <button
  //               type="button"
  //               onClick={handleChangeLogin}
  //               className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-center font-semibold text-gray-900 shadow-lg hover:bg-blue-200 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700"
  //             >
  //               <svg viewBox="0 0 533.5 544.3" height="18" width="18" className="mr-4">
  //                 <title>google-colored</title>
  //                 <path
  //                   d="M533.5,278.4a320.07,320.07,0,0,0-4.7-55.3H272.1V327.9h147a126,126,0,0,1-54.4,82.7v68h87.7C503.9,431.2,533.5,361.2,533.5,278.4Z"
  //                   fill="#4285f4"
  //                 ></path>
  //                 <path
  //                   d="M272.1,544.3c73.4,0,135.3-24.1,180.4-65.7l-87.7-68c-24.4,16.6-55.9,26-92.6,26-71,0-131.2-47.9-152.8-112.3H28.9v70.1A272.19,272.19,0,0,0,272.1,544.3Z"
  //                   fill="#34a853"
  //                 ></path>
  //                 <path
  //                   d="M119.3,324.3a163,163,0,0,1,0-104.2V150H28.9a272.38,272.38,0,0,0,0,244.4Z"
  //                   fill="#fbbc04"
  //                 ></path>
  //                 <path
  //                   d="M272.1,107.7a147.89,147.89,0,0,1,104.4,40.8h0l77.7-77.7A261.56,261.56,0,0,0,272.1,0,272.1,272.1,0,0,0,28.9,150l90.4,70.1C140.8,155.6,201.1,107.7,272.1,107.7Z"
  //                   fill="#ea4335"
  //                 ></path>
  //               </svg>
  //               Login with Google
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
