'use client'
import Image from "next/image";
import { signIn, useSession } from "next-auth/react"

import { GithubLogo } from "@phosphor-icons/react";
import ginteLogo from "../../../public/ginte-logo.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Login() {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.push("/")
        }
    }, [session, router])

    return (
        <section className="w-full h-screen flex items-center justify-center bg-[#09090B] px-6">
            <div className="w-[500px] h-auto rounded-lg shadow-md border-2 border-gray-dark p-6 text-white">
                <div className="flex items-center justify-center">
                    <Image
                        alt="Ginte Logo"
                        src={ginteLogo}
                        width={75}
                        height={75}
                        className="shadow-sm flex"
                    />
                </div>

                <h1 className="mt-6 text-2xl font-bold">Login</h1>
                <p className="text-sm">Utilize o método abaixo</p>

                <button onClick={() => signIn('github')} className="mt-10 w-full h-auto flex items-center justify-center gap-2 rounded-lg p-2 bg-white duration-200 hover:bg-white/50">
                    <GithubLogo size={24} weight="bold" className="fill-black" />
                    <span className="text-black font-semibold">GitHub</span>
                </button>

            </div>
        </section>
    )
}