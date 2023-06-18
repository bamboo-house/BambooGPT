import CreatableSelect from 'react-select/creatable';

type CreatableSelectWrapperProps = {
  label: string;
  name: string;
  optionsMessage: string;
  onChange: (e: any) => void;
};

export const CreatableSelectWrapper = ({
  label,
  name,
  optionsMessage,
  onChange,
}: CreatableSelectWrapperProps) => {
  return (
    <div className="mb-12 mt-4">
      <div className=" items-center">
        <span className="flex-auto">{label}</span>
      </div>
      <CreatableSelect
        name={name}
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
        noOptionsMessage={() => optionsMessage}
        placeholder=""
        onChange={onChange}
      />
    </div>
  );
};
