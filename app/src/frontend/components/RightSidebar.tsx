import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatOptionState } from '../globalStates/atoms/chatAtom';

export const RightSidebar = ({ showRightSidebar }: { showRightSidebar: boolean }) => {
  const [chatOption, setChatOption] = useRecoilState(chatOptionState);
  const [chatOptionForDisplay, setChatOptionForDisplay] = useState(chatOption);

  const showClass = showRightSidebar
    ? 'w-64 flex-none transition-alltransition-all duration-300 ease-in-out'
    : 'w-0 transition-all duration-300 ease-in-out';

  // バリデーション：handleChangeTextでやるか、type=textで条件分岐でやるか
  const handleChangeText = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    // recoil公式ドキュメントのstata更新は、prevStateを使ってないのでここも同じようにしてみる
    // chatOptionForDisplayはtextを保存して、小数点も表示できるようにする
    setChatOptionForDisplay({ ...chatOptionForDisplay, [name]: value });
    setChatOption({ ...chatOption, [name]: Number(value) });
  };

  const handleChangeRnage = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    // recoil公式ドキュメントのstata更新は、prevStateを使ってないのでここも同じようにしてみる
    // chatOptionForDisplayはtextを保存して、小数点も表示できるようにする
    setChatOptionForDisplay({ ...chatOptionForDisplay, [name]: value });
    setChatOption({ ...chatOption, [name]: Number(value) });
  };

  return (
    <div className={showClass}>
      <div className="fixed h-full w-[inherit] border border-gpt-dark border-l-zinc-500">
        <div className="mx-8">
          <div className="my-6">
            <div className="mb-2 flex items-center">
              <span className="flex-auto">Temprature</span>
              <input
                type="text"
                className="w-10 bg-transparent pr-1 text-right"
                name="temperature"
                value={chatOptionForDisplay.temperature}
                onInput={handleChangeText}
              />
            </div>

            <input
              type="range"
              name="temperature"
              max={2.0}
              min={0.0}
              value={chatOption.temperature}
              step={0.01}
              className="input-range-slider"
              onInput={handleChangeRnage}
            />
          </div>

          <div className="my-6">
            <div className="mb-2 flex items-center">
              <span className="flex-auto">Top_p</span>
              <input
                type="text"
                className="w-10 bg-transparent pr-1 text-right"
                name="top_p"
                value={chatOptionForDisplay.top_p}
                onInput={handleChangeText}
              />
            </div>

            <input
              type="range"
              name="top_p"
              max={1.0}
              min={0.0}
              value={chatOption.top_p}
              step={0.01}
              className="input-range-slider"
              onInput={handleChangeRnage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
