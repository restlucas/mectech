"use client";

import { Client } from "@/app/(ginte)/page";
import { ClientForm } from "@/components/ClientForm";
import { getClient } from "@/services/client";
import { CaretCircleLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditClientPage() {
  const { clientId } = useParams()
  const [userData, setUserData] = useState<Client>()

  useEffect(() => {
    const getClientInfo = async (clientId: string) => {
      const response = await getClient(clientId)
      setUserData(response.data)
    }

    if (clientId)
      getClientInfo(clientId as string)
  }, [clientId])

  return (
    <section className="w-full h-full mb-8">
      <div className="flex items-center justify-start gap-4">
        <Link href="/">
          <CaretCircleLeft size={32} weight="bold" className="fill-[#107E0B]" />
        </Link>
        <h1 className="font-bold text-3xl">Editando: {userData?.name}</h1>
      </div>

      {/* Container */}
      <ClientForm action="update" clientId={clientId as string} userData={userData} />
    </section>
  );
}
