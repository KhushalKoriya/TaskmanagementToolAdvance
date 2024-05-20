import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="my-2">
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        id={label}
        name={label}
        placeholder={placeholder}
        className="w-100 my-1 p-2"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
