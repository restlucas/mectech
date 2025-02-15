"use client";
import Image from "next/image";
import Link from "next/link";

import ginteLogo from "../../public/ginte-logo.svg";
import { Plus, SignOut, Users } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

const navigation = [
  {
    href: "/",
    title: "Clientes",
    icon: <Users size={20} className="fill-ginte" weight="bold" />,
  },
  {
    href: "/create-client",
    title: "Cadastrar Cliente",
    icon: <Plus size={20} className="fill-ginte" weight="bold" />,
  },
];

export function AsideNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-[275px] h-screen py-8 px-4 flex-col gap-8 items-center justify-start">
      <Image
        alt="Ginte Logo"
        src={ginteLogo}
        width={50}
        height={50}
        className="shadow-sm"
      />

      <nav className="w-full h-full flex flex-col gap-2">
        {navigation.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.href}
              className={`flex items-center justify-start gap-2 py-3 px-4 duration-200 rounded-md hover:bg-ginte-hover cursor-pointer ${
                pathname === link.href && "bg-ginte-hover"
              }`}
            >
              {link.icon}
              <span className="font-semibold text-base">{link.title}</span>
            </Link>
          );
        })}

        <Link
          href=""
          className="mt-auto flex items-center justify-start gap-2 py-3 px-4 duration-200 rounded-md hover:bg-red-200 cursor-pointer"
        >
          <SignOut size={20} className="fill-red-600" weight="bold" />
          <span className="font-semibold text-base">Sair</span>
        </Link>
      </nav>
    </aside>
  );
}
