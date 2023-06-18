import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useRecoilState } from 'recoil';
import { chatOptionState } from '../globalStates/atoms/chatAtom';
import { isOpenedRightSidebarState } from '../globalStates/atoms/isOpenedRightSidebarAtom';
import { CreatableSelectWrapper } from './CreatableSelectWrapper';
import { RangeInput } from './RangeInput';

export const RightSidebar = () => {
  const [chatOption, setChatOption] = useRecoilState(chatOptionState);
  const [chatOptionForDisplay, setChatOptionForDisplay] = useState(chatOption);
  const [isOpenedRightSidebar, setIsOpenedRightSidebar] = useRecoilState(isOpenedRightSidebarState);

  const showClass = isOpenedRightSidebar
    ? 'w-64 flex-none transition-alltransition-all duration-300 ease-in-out'
    : 'w-0 transition-all duration-300 ease-in-out';

  const handleChangeRange = (e: any) => {
    e.preventDefault();
    let { name, value }: { name: string; value: any } = e.target;

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
    let result: any = value;
    switch (name) {
      case 'temperature':
      case 'presence_penalty':
      case 'frequency_penalty':
        if (isNaN(Number(value))) {
          result = 1;
        } else if (result < 0) {
          result = 0;
        } else if (result > 2) {
          result = 2;
        }
        break;
      case 'top_p':
        if (isNaN(Number(value))) {
          result = 1;
        } else if (result < 0) {
          result = 0;
        } else if (result > 1) {
          result = 1;
        }
        break;
      default:
        return result;
    }
    return result.toString();
  };

  return (
    <div className={showClass}>
      <div className="fixed h-full w-[inherit] border border-gpt-dark border-l-zinc-500">
        <div className="mx-8">
          <RangeInput
            label="Temperature"
            name="temperature"
            displayValue={chatOptionForDisplay.temperature}
            rangeValue={chatOption.temperature}
            min={0.0}
            max={2.0}
            step={0.01}
            onInput={handleChangeRange}
          />

          <RangeInput
            label="Top P"
            name="top_p"
            displayValue={chatOptionForDisplay.top_p}
            rangeValue={chatOption.top_p}
            min={0.0}
            max={1}
            step={0.01}
            onInput={handleChangeRange}
          />

          <CreatableSelectWrapper
            label="Stop Sequence"
            name="stop"
            optionsMessage="Enter a sequence"
            onChange={handleChangeCreatableSelect}
          />

          <RangeInput
            label="Frequency Penalty"
            name="frequency_penalty"
            displayValue={chatOptionForDisplay.frequency_penalty}
            rangeValue={chatOption.frequency_penalty}
            min={0.0}
            max={2.0}
            step={0.01}
            onInput={handleChangeRange}
          />

          <RangeInput
            label="Presence Penalty"
            name="presence_penalty"
            displayValue={chatOptionForDisplay.presence_penalty}
            rangeValue={chatOption.presence_penalty}
            min={0.0}
            max={2.0}
            step={0.01}
            onInput={handleChangeRange}
          />
        </div>
      </div>
    </div>
  );
};
