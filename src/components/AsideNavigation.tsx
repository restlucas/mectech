"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Link = {
  path: string;
  name: string;
  src: string;
  options?: { path: string; name: string }[];
};

type LinkNavigationProps = {
  link: Link;
  handleNavigation: (href: string) => void;
};

export const links = [
  {
    path: "/",
    name: "Home",
    src: "/assets/aside/home.svg",
  },
  {
    path: "/clients",
    name: "Clientes",
    src: "/assets/aside/clients.svg",
  },
  {
    path: "/agenda",
    name: "Agenda",
    src: "/assets/aside/agenda.svg",
  },
  {
    path: "/entries",
    name: "Cadastros",
    src: "/assets/aside/entries.svg",
    options: [
      {
        path: "/order",
        name: "Ordem de Serviço",
      },
    ],
  },
];

function LinkNavigation({ link, handleNavigation }: LinkNavigationProps) {
  const [showOptions, setShowOptions] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef}>
      <button
        onClick={
          link.options
            ? () => setShowOptions(!showOptions)
            : () => handleNavigation(link.path)
        }
        type="button"
        className="w-full cursor-pointer flex items-center justify-start gap-2 p-2 rounded-md duration-200 hover:bg-[#e5e5e5]"
      >
        <Image alt={link.name} src={link.src} width={15} height={15} />
        <span>{link.name}</span>
      </button>

      {showOptions && (
        <div>
          {link.options?.map((option, index) => {
            return (
              <button
                key={index}
                onClick={() => handleNavigation(`${link.path}/${option.path}`)}
                className="w-full cursor-pointer flex items-center justify-start gap-2 p-2 rounded-md duration-200 hover:bg-[#e5e5e5] text-foreground-red"
              >
                {option.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AsideNavigation() {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <aside className="min-w-[240px] h-screen py-8 px-4">
      <div className="flex items-center justify-start gap-2">
        <Image
          alt="Profile pic"
          src={"/profile.png"}
          width={20}
          height={20}
          className="rounded-full"
        />
        <h1 className="text-sm font-semibold">Marcelo Timóteo</h1>
      </div>

      <nav className="mt-14 w-full flex flex-col gap-2 text-sm font-semibold text-foreground">
        {links.map((link: Link, index) => {
          return (
            <div key={index} className="w-full">
              <LinkNavigation link={link} handleNavigation={handleNavigation} />
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
