"use client";
import Link from "next/link";
import Image from "next/image";
import { Session } from "next-auth";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import ginteLogo from "../../public/ginte-logo.svg";
import { List, Plus, SignOut, Users } from "@phosphor-icons/react";

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

function Aside({ sessionData, pathname }: { sessionData: Session | null, pathname: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <aside className="flex min-w-[275px] h-screen py-8 px-4 flex-col gap-8 items-center justify-start relative">
        <div className="relative w-12 h-12">
          <Image
            alt="Ginte Logo"
            src={ginteLogo}
            width={50}
            height={50}
            className={`absolute transition-opacity duration-500 ease-in-out ${isHovered ? "opacity-0" : "opacity-100"}`}
          />
          {sessionData && (
            <Image
              alt="User Image"
              src={sessionData.user.image}
              width={50}
              height={50}
              className={`absolute rounded-full transition-opacity duration-500 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>

        {sessionData && 
          <p 
            className="text-xs text-center cursor-pointer duration-200 hover:underline" 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
          >
            Bem-vindo{" "}
            <span className="font-semibold">{sessionData.user.name}</span>
          </p>
        }

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

        <button
          onClick={() => signOut()} 
          className="mt-auto flex items-center justify-start gap-2 py-3 px-4 duration-200 rounded-md hover:bg-red-200 cursor-pointer"
        >
          <SignOut size={20} className="fill-red-600" weight="bold" />
          <span className="font-semibold text-base">Sair</span>
        </button>
      </nav>
    </aside>
  )
}

function Mobile({ sessionData, pathname }: { sessionData: Session | null, pathname: string }) {
  const router = useRouter()
  const divRef = useRef<HTMLDivElement>(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleMenu(){
    setShowMobileMenu(!showMobileMenu)
  }

  function handleClickOutside (event: MouseEvent) {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowMobileMenu(false);
        setIsAnimating(false);
      }, 150);
    }
  }

  function handleNavigation(href: string) {
    setShowMobileMenu(false)
    router.push(href)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-full h-auto px-6 py-4 flex items-center justify-between">
        <Image
          alt="Ginte Logo"
          src={ginteLogo}
          width={50}
          height={50}
          className={``}
        />

        <button onClick={handleMenu} type="button" className="flex items-center justify-center">
        <List size={32} weight="bold" className="" />
        </button>
      </div>

      {showMobileMenu &&
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-40 flex justify-end">
          <div ref={divRef} className={`${isAnimating ? "animate-show-out" : "animate-show-in"} bg-white px-4 py-8 w-2/3 h-full flex flex-col gap-4`}>
            <div className="w-full flex items-center justify-center">
              <Image
                alt="User Image"
                src={sessionData?.user.image || ""}
                width={50}
                height={50}
                className={`rounded-full shadow-lg`}
              />
            </div>

            <p 
              className="text-xs text-center cursor-pointer duration-200 hover:underline mb-10" 
            >
              Bem-vindo{" "}
              <span className="font-semibold">{sessionData?.user.name}</span>
            </p>

            <nav className="w-full h-full flex flex-col gap-2">
              {navigation.map((link, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleNavigation(link.href)}
                    className={`flex items-center justify-start gap-2 py-3 px-4 duration-200 rounded-md hover:bg-ginte-hover cursor-pointer ${
                      pathname === link.href && "bg-ginte-hover"
                    }`}
                  >
                    {link.icon}
                    <span className="font-semibold text-base">{link.title}</span>
                  </button>
                );
              })}

              <button
                onClick={() => signOut()} 
                className="mt-auto flex items-center justify-start gap-2 py-3 px-4 duration-200 rounded-md hover:bg-red-200 cursor-pointer"
              >
                <SignOut size={20} className="fill-red-600" weight="bold" />
                <span className="font-semibold text-base">Sair</span>
              </button>
            </nav>
          </div>
        </div>
      }
    </>
  )
}

export function Navigation() {
  const pathname = usePathname();
  const { data: sessionData } = useSession()

  return (
    
    <>
      <div className="hidden min-[900px]:block">
        <Aside sessionData={sessionData} pathname={pathname} />
      </div>
      <div className="hidden max-[900px]:block">
        <Mobile sessionData={sessionData} pathname={pathname} />
      </div>
    </>
  );
}
