import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatOptionForDisplayState, chatOptionState } from '../globalStates/atoms/chatAtom';
import { isOpenedRightSidebarState } from '../globalStates/atoms/isOpenedRightSidebarAtom';
import { CreatableSelectWrapper } from './CreatableSelectWrapper';
import { RangeInput } from './RangeInput';

export const RightSidebar = () => {
  const [chatOption, setChatOption] = useRecoilState(chatOptionState);
  // バー入力と数値入力の共存を実現させるために別のstateを定義する
  const [chatOptionForDisplay, setChatOptionForDisplay] = useRecoilState(chatOptionForDisplayState);
  const isOpenedRightSidebar = useRecoilValue(isOpenedRightSidebarState);

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
    if (values.length < 5) {
      setChatOption({ ...chatOption, stop: values });
    } else {
      console.log("You can't select more than 5 items.");
    }
  };

  const rangeInputValidation = (name: string, value: string): string => {
    let result: any = value;
    switch (name) {
      case 'temperature':
        if (isNaN(Number(value))) {
          result = 1;
        } else if (result < 0) {
          result = 0;
        } else if (result > 2) {
          result = 2;
        }
        break;
      case 'presence_penalty':
      case 'frequency_penalty':
        if (value === '-') {
          return value;
        } else if (isNaN(Number(value))) {
          result = 1;
        } else if (result < -2) {
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

  const showClass = isOpenedRightSidebar
    ? 'w-64 flex-none transition-all duration-300 ease-in-out'
    : 'w-0 transition-all duration-300 ease-in-out';

  return (
    <div className={showClass}>
      <div className="fixed h-full w-[inherit] border border-gpt-gray border-l-zinc-500">
        <div className="mx-8">
          <RangeInput
            label="Temperature"
            name="temperature"
            displayValue={chatOptionForDisplay.temperature}
            rangeValue={chatOption.temperature || 1}
            min={0.0}
            max={2.0}
            step={0.01}
            onInput={handleChangeRange}
          />

          <RangeInput
            label="Top P"
            name="top_p"
            displayValue={chatOptionForDisplay.top_p}
            rangeValue={chatOption.top_p || 1}
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
            displayValue={chatOptionForDisplay.frequency_penalty || 0}
            rangeValue={chatOption.frequency_penalty || 0}
            min={-2.0}
            max={2.0}
            step={0.01}
            onInput={handleChangeRange}
          />

          <RangeInput
            label="Presence Penalty"
            name="presence_penalty"
            displayValue={chatOptionForDisplay.presence_penalty || 0}
            rangeValue={chatOption.presence_penalty || 0}
            min={-2.0}
            max={2.0}
            step={0.01}
            onInput={handleChangeRange}
          />
        </div>
      </div>
    </div>
  );
};
