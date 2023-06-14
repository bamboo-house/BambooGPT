import { useState } from 'react';

export const RightSidebar = ({ showRightSidebar }: { showRightSidebar: boolean }) => {
  const [num, setNum] = useState(1);
  const showClass = showRightSidebar
    ? 'w-64 flex-none transition-alltransition-all duration-300 ease-in-out'
    : 'w-0 transition-all duration-300 ease-in-out';

  return (
    <div className={showClass}>
      <div className="fixed h-full w-[inherit] border border-gpt-dark border-l-zinc-500">
        <div className="mx-8">
          <label
            htmlFor="default-range"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Default range
          </label>

          <p>{num}</p>
          <input
            className="w-full"
            value={num}
            onInput={(e: any) => {
              setNum(e.target.value);
            }}
          />

          <input
            id="default-range"
            type="range"
            max={2.0}
            min={0.0}
            defaultValue={num}
            value={num}
            step={0.01}
            className="input-range-slider"
            onInput={(e: any) => {
              setNum(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
