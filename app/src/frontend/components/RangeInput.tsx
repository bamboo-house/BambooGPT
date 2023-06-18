type RangeInputProps = {
  label: string;
  name: string;
  displayValue: string | number;
  rangeValue: number;
  min: number;
  max: number;
  step: number;
  onInput: (e: any) => void;
};

export const RangeInput = ({
  label,
  name,
  displayValue,
  rangeValue,
  min,
  max,
  step,
  onInput,
}: RangeInputProps) => {
  return (
    <div className="mb-12 mt-4">
      <div className="flex items-center">
        <span className="flex-auto">{label}</span>
        <input
          type="text"
          className="w-10 bg-transparent pr-1 text-right"
          name={name}
          value={displayValue}
          onInput={onInput}
        />
      </div>

      <input
        type="range"
        name={name}
        max={max}
        min={min}
        value={rangeValue}
        step={step}
        className="input-range-slider"
        onInput={onInput}
      />
    </div>
  );
};
