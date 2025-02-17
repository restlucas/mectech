import { ReactNode } from "react";

export function Modal({ children }: { children: ReactNode }) {
  return (
    <div className="top-0 right-0 bottom-0 left-0 px-5 bg-black/50 absolute z-10 flex items-center justify-center">
      <div className="animate-show-modal z-20 rounded-[20px] p-6 bg-white divide-y divide-gray-400 h-auto max-w-[420px] text-sm font-bold shadow-lg">
        { children }
      </div>
    </div>
  );
}
