"use client";

import { ClientForm } from "@/components/ClientForm";
import { CaretCircleLeft } from "@phosphor-icons/react";
import Link from "next/link";

export default function NewClientPage() {
  return (
    <section className="w-full h-full mb-8">
      <div className="flex items-center justify-start gap-4">
        <Link href="/">
          <CaretCircleLeft size={32} weight="bold" className="fill-[#107E0B]" />
        </Link>
        <h1 className="font-bold text-3xl">Cadastrar Cliente</h1>
      </div>

      {/* Container */}
      <ClientForm />
    </section>
  );
}
