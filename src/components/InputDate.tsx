"use client";

import { JSX, useState } from "react";

type Props = {
  placeholder: string;
  icon: JSX.Element;
  error?: string;
};

export function InputDate({ placeholder, icon, error }: Props) {
  const [inputType, setInputType] = useState("text");
  const [dateValue, setDateValue] = useState("");

  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = () => {
    setInputType("text");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="h-11 overflow-hidden flex gap-1 rounded-lg text-white bg-input border border-gray-dark">
        <input
          type={inputType}
          value={dateValue}
          placeholder={inputType === "text" ? placeholder : ""}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="p-4 pr-0 appearance-none flex-1"
        />

        <input />
        <div className="p-2 flex items-center justify-center">{icon}</div>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
