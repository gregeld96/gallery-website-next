import React from "react";

export const TextAreaField = ({
  label,
  value,
  onChange,
  textColor,
}) => {
  return (
    <div className="w-full">
      <label
        className={`block capitalize tracking-wide text-${
          textColor ?? "white"
        } text-xs font-bold mb-2`}
        htmlFor={`input-${label.replace(/ /g, "-")}`}
      >
        {label}
      </label>
      <textarea
        id={`input-${label.replace(/ /g, "-")}`}
        className="appearance-none block text-base font-normal w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        rows={4}
        cols={50}
        onChange={onChange}
        value={value}
       />
    </div>
  );
};
