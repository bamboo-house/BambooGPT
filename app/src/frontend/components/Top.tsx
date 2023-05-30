import { TopBody } from './TopBody';
import { TopHeader } from './TopHeader';

export const Top = () => {
  return (
    <div className="top-main flex h-screen w-full overflow-hidden">
      <div className="top-leftsidebar w-[260px] flex-none bg-gpt-dark">
        <div>LeftSidebar</div>
      </div>

      <div className="top-content flex w-full">
        <div className="top-content-header h-8 w-full border border-gpt-dark border-b-zinc-500">
          <div className="flex h-full items-center justify-between">
            <button className="md:hidden">ukon</button>
            <p>oo</p>
            <p>o1</p>
            <p>o2</p>
          </div>
        </div>
        <div className="top-content-rightsidebar w-[260px] flex-none bg-gpt-dark">
          <div>RightSidebar</div>
        </div>
      </div>
    </div>
  );
};
