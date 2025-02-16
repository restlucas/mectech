'use client'

import { Check } from "@phosphor-icons/react";
import { InputHTMLAttributes } from "react";

type Props =  InputHTMLAttributes<HTMLInputElement> & {
    checked?: boolean;
}

export function Checkbox({ checked = false, ...rest }: Props) {
    return (
    <label className="flex items-center space-x-2 cursor-pointer">
        <input
            type="checkbox"
            className="hidden peer"
            checked={checked}
            {...rest}
        />
        <div className="w-5 h-5 border-2 border-[#FAFAFA] rounded-md flex items-center justify-center peer-checked:bg-[#FAFAFA] transition">
            <Check size={24} weight="bold" className={`fill-black ${checked ? 'block' : 'hidden'}`}  />
        </div>
    </label>
    )
}