import { useRecoilState } from 'recoil';
import { chatOptionState } from '../globalStates/atoms/chatAtom';

export const RightSidebar = ({ showRightSidebar }: { showRightSidebar: boolean }) => {
  const [chatOption, setChatOption] = useRecoilState(chatOptionState);
  const showClass = showRightSidebar
    ? 'w-64 flex-none transition-alltransition-all duration-300 ease-in-out'
    : 'w-0 transition-all duration-300 ease-in-out';

  const handleChange = (e: any) => {
    e.preventDefault();
    const value = Number(e.target.value);
    // recoil公式ドキュメントのstata更新は、prevStateを使ってない
    setChatOption({ ...chatOption, temperature: value });
  };

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

          <p>{chatOption.temperature}</p>
          <input className="w-full" value={chatOption.temperature} onInput={handleChange} />

          <input
            id="default-range"
            type="range"
            max={2.0}
            min={0.0}
            value={chatOption.temperature}
            step={0.01}
            className="input-range-slider"
            onInput={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
