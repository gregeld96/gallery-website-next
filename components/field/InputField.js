import React from "react";

export const InputSingleField = ({
  required,
  label,
  value,
  placeholder,
  type,
  onChange,
  textColor
}) => {
  return (
    <div className="w-full">
      <label
        className={`block tracking-wide text-${textColor ?? "white"} text-xs font-bold mb-2`}
        htmlFor={`input-${label.replace(/ /g, "-")}`}
      >
        {label}
      </label>
      <input
        required={required}
        value={value}
        className="appearance-none block text-base font-normal w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={`input-${label.replace(/ /g, "-")}`}
        type={type ?? "text"}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
