import { TextareaHTMLAttributes } from "react";

type TextAreaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};

export function TextAreaInput({ label, name, ...rest }: TextAreaInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <textarea
        name={name}
        rows={10}
        className="w-full border-[1px] border-stroke rounded-md px-2 py-1 min-h-[25px] resize-none"
        {...rest}
      />
    </div>
  );
}
