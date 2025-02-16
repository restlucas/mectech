import { InputHTMLAttributes, JSX } from "react";
type Props = InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  placeholder: string;
  icon?: JSX.Element;
  error?: string;
};

export function Input({
  type = "text",
  placeholder,
  icon,
  error,
  ...rest
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="h-11 overflow-hidden flex gap-1 rounded-lg text-white bg-input border border-gray-dark">
        <input
          type={type}
          placeholder={placeholder}
          className="p-4 pr-0 appearance-none flex-1"
          {...rest}
        />
        <div className="p-2 flex items-center justify-center">{icon}</div>
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
