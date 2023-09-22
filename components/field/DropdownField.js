import React from "react";

export const DropdownField = ({
  required,
  label,
  value,
  valueField,
  labelField,
  keyField,
  placeholder,
  collectionList,
  onChange,
}) => {
  return (
    <div className="relative">
      <label
        className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
        htmlFor={`input-${label.replace(/ /g, "-")}`}
      >
        {label}
      </label>
      <select
        required={required}
        className={`capitalize block appearance-none w-full bg-gray-200 border border-gray-200 ${
          value ? "text-gray-700" : "text-gray-400"
        } py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
        id={`input-${label.replace(/ /g, "-")}`}
        defaultValue={value}
        onChange={onChange}
      >
        <option className="capitalize text-gray-700 text-xs" disabled value={""}>
          {placeholder}
        </option>
        {collectionList.map((data) => {
          return (
            <option
              selected={data[valueField] === value}
              className="capitalize text-xs"
              key={data[keyField]}
              value={data[valueField]}
            >
              {data[labelField]}
            </option>
          );
        })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 top-1/4 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
