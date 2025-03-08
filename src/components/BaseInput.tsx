import { InputHTMLAttributes } from "react";

type BaseInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type?: string;
};

export function BaseInput({
  label,
  name,
  type = "text",
  ...rest
}: BaseInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        className="w-full border-[1px] border-stroke rounded-md px-2 py-1 min-h-[25px]"
        {...rest}
      />
    </div>
  );
}
