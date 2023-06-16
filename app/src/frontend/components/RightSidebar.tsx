import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useRecoilState } from 'recoil';
import { chatOptionState } from '../globalStates/atoms/chatAtom';

export const RightSidebar = ({ showRightSidebar }: { showRightSidebar: boolean }) => {
  const [chatOption, setChatOption] = useRecoilState(chatOptionState);
  const [chatOptionForDisplay, setChatOptionForDisplay] = useState(chatOption);

  const showClass = showRightSidebar
    ? 'w-64 flex-none transition-alltransition-all duration-300 ease-in-out'
    : 'w-0 transition-all duration-300 ease-in-out';

  const handleChangeRange = (e: any) => {
    e.preventDefault();
    let { name, value }: { name: string; value: string } = e.target;

    // バリデーション
    value = rangeInputValidation(name, value);

    // recoil公式ドキュメントのstata更新は、prevStateを使ってないのでここも同じようにしてみる
    // chatOptionForDisplayはtextを保存して、小数点も表示できるようにする
    setChatOptionForDisplay({ ...chatOptionForDisplay, [name]: value });
    setChatOption({ ...chatOption, [name]: Number(value) });
  };

  const handleChangeCreatableSelect = (e: any) => {
    const values = e.map((element: any) => element.value);
    setChatOption({ ...chatOption, stop: values });
  };

  const rangeInputValidation = (name: string, value: string): string => {
    let result = Number(value);
    // バリデーション
    switch (name) {
      case 'temperature':
      case 'presence_penalty':
      case 'frequency_penalty':
        if (isNaN(result)) {
          result = 1;
        } else if (result < 0) {
          result = 0;
        } else if (result > 2) {
          result = 2;
        }
        break;
      case 'top_p':
        if (isNaN(result)) {
          result = 1;
        } else if (result < 0) {
          result = 0;
        } else if (result > 1) {
          result = 1;
        }
        break;
      default:
        break;
    }
    return result.toString();
  };

  return (
    <div className={showClass}>
      <div className="fixed h-full w-[inherit] border border-gpt-dark border-l-zinc-500">
        <div className="mx-8">
          <div className="mb-12 mt-4">
            <div className="flex items-center">
              <span className="flex-auto">Temprature</span>
              <input
                type="text"
                className="w-10 bg-transparent pr-1 text-right"
                name="temperature"
                value={chatOptionForDisplay.temperature}
                onInput={handleChangeRange}
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
              onInput={handleChangeRange}
            />
          </div>

          <div className="mb-12 mt-4">
            <div className="flex items-center">
              <span className="flex-auto">Top_p</span>
              <input
                type="text"
                className="w-10 bg-transparent pr-1 text-right"
                name="top_p"
                value={chatOptionForDisplay.top_p}
                onInput={handleChangeRange}
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
              onInput={handleChangeRange}
            />
          </div>

          <div className="mb-12 mt-4">
            <div className=" items-center">
              <span className="flex-auto">Stop sequences</span>
            </div>
            <CreatableSelect
              name="stop"
              isMulti
              instanceId="selectbox"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: 'none',
                },
              })}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'transparent',
                }),
                input: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'white',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'transparent',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: 'transparent',
                }),
                multiValue: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: '#666671',
                }),
                multiValueLabel: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'white',
                }),
                indicatorsContainer: (baseStyles, state) => ({
                  display: 'none',
                }),
              }}
              className="bg-gpt-gray2"
              noOptionsMessage={() => 'Enter a sequence'}
              placeholder=""
              onChange={handleChangeCreatableSelect}
            />
          </div>

          <div className="mb-12 mt-4">
            <div className="flex items-center">
              <span className="flex-auto">Frequency penalty</span>
              <input
                type="text"
                className="w-10 bg-transparent pr-1 text-right"
                name="frequency_penalty"
                value={chatOptionForDisplay.frequency_penalty}
                onInput={handleChangeRange}
              />
            </div>

            <input
              type="range"
              name="frequency_penalty"
              max={2.0}
              min={0.0}
              value={chatOption.frequency_penalty}
              step={0.01}
              className="input-range-slider"
              onInput={handleChangeRange}
            />
          </div>

          <div className="mb-12 mt-4">
            <div className="flex items-center">
              <span className="flex-auto">Presence penalty</span>
              <input
                type="text"
                className="w-10 bg-transparent pr-1 text-right"
                name="presence_penalty"
                value={chatOptionForDisplay.presence_penalty}
                onInput={handleChangeRange}
              />
            </div>

            <input
              type="range"
              name="presence_penalty"
              max={2.0}
              min={0.0}
              value={chatOption.presence_penalty}
              step={0.01}
              className="input-range-slider"
              onInput={handleChangeRange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
