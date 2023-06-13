import React from "react";
import { useFormContext } from "react-hook-form";

const InputField = ({
  label,
  inputName,
  onInputChange,
  rules,
  type,
  autoFocus,
  errors,
}) => {
  const { register } = useFormContext();

  const onChange = (event) => {
    const value = event.target.value;
    onInputChange && onInputChange(inputName, value);
  };

  const hasError = errors && errors[inputName];

  return (
    <div className="mb-4">
      <label htmlFor={inputName}>{label}</label>
      <input
        {...register(inputName, rules)}
        type={type}
        className="w-full"
        id={inputName}
        autoFocus={autoFocus}
        onChange={onChange}
      />
      {hasError && (
        <div className=" text-red-500">{errors[inputName].message}</div>
      )}
      {hasError && errors[inputName].type === "validate" && (
        <div className="text-red-500 ">Password do not match</div>
      )}
    </div>
  );
};

export default InputField;
