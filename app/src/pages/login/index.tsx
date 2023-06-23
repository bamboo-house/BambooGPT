export default function Home() {
  return (
    <div className="relative h-screen w-screen bg-[url('/top-bg.png')] bg-cover">
      <div className="h-full w-full " style={{ backgroundColor: 'rgba(12, 12, 12, 0.5)' }}>
        <div className="absolute left-1/2 top-1/2 z-40 h-[312px] w-[400px] translate-x-[-50%]	 translate-y-[-50%] rounded-2xl bg-slate-500 opacity-100 ">
          <div className="text-center">hello</div>
        </div>
      </div>
    </div>
  );
}
