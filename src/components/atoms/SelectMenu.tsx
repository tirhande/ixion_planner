import React from 'react';
import Select, { SingleValue } from 'react-select';

const SelectMenu = ({
  options,
  onChange,
  defaultValue,
}: {
  options: {
    value: string;
    label: string;
  }[];
  onChange: (
    newValue: SingleValue<{
      value: string;
      label: string;
    }>
  ) => void;
  defaultValue: SingleValue<{
    value: string;
    label: string;
  }>;
}) => {
  return <Select defaultValue={defaultValue} options={options} onChange={onChange} isSearchable={false} />;
};

export default SelectMenu;
