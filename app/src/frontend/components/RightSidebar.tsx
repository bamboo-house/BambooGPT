import { useEffect } from 'react';

export const RightSidebar = ({ showRightSidebar }: { showRightSidebar: boolean }) => {
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

          <input
            id="default-range"
            type="range"
            max={2.0}
            min={0.0}
            defaultValue={1}
            step={0.01}
            className="input-range-slider w-full"
          />
          <input
            id="default-range"
            type="range"
            max={2.0}
            min={0.0}
            defaultValue={1}
            step={0.01}
            className="input-range-slider w-full"
          />
        </div>
      </div>
    </div>
  );
};
