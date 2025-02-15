"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "./Input";
import { MapPin } from "@phosphor-icons/react/dist/ssr";

import {
  CalendarDots,
  EnvelopeSimple,
  PencilSimple,
  Phone,
  Plus,
  TextT,
} from "@phosphor-icons/react";
import { createClient } from "@/services/client";

type Props = {
  action?: "create" | "edit";
};

const clientSchema = z.object({
  name: z.string().min(5, "O campo nome deve conter pelo menos 5 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z
    .string()
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Formato inválido (ex: (99) 99999-9999)"),
  birth: z.string().min(1, "A data de nascimento é obrigatória"),
  address: z
    .string()
    .min(3, "Endereço muito curto")
    .max(100, "Endereço muito longo"),
});

type ClientSchema = z.infer<typeof clientSchema>;

export function ClientForm({ action = "create" }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
  });

  async function onSubmit(data: ClientSchema) {
    if (action === "create") {
      const response = await createClient(data);

      console.log(response);
      if (response.error) {
        alert(response.error);
      } else {
        alert("Client created successfully!");
      }
    }
  }

  return (
    <div className="mt-8 bg-foreground border border-gray-dark rounded-lg p-8 w-full h-auto space-y-8 text-white">
      <form
        id="clientForm"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 grid-rows-auto gap-6"
      >
        <Input
          {...register("name")}
          placeholder="Nome *"
          icon={<TextT size={24} className="fill-[#A1A1AA]" />}
          error={errors.name?.message}
        />
        <Input
          {...register("email")}
          placeholder="E-mail *"
          type="email"
          icon={<EnvelopeSimple size={24} className="fill-[#A1A1AA]" />}
          error={errors.email?.message}
        />
        <Input
          {...register("phone")}
          placeholder="Telefone *"
          type="phone"
          icon={<Phone size={24} className="fill-[#A1A1AA]" />}
          error={errors.phone?.message}
        />
        <Input
          {...register("birth")}
          type="date"
          placeholder="Data de nascimento"
          icon={<CalendarDots size={24} className="fill-[#A1A1AA]" />}
          error={errors.birth?.message}
        />

        <div className="col-span-full">
          <Input
            {...register("address")}
            placeholder="Endereço *"
            icon={<MapPin size={24} className="fill-[#A1A1AA]" />}
            error={errors.address?.message}
          />
        </div>

        <div className="col-span-full w-full flex items-center justify-end gap-4 font-bold">
          <Link
            href="/"
            className="py-3 px-4 rounded-lg bg-[#4B4B4B] duration-200 hover:bg-[#4B4B4B]/50"
          >
            Cancelar
          </Link>
          <button
            formTarget="clientForm"
            formAction="clientForm"
            type="submit"
            className="py-3 px-4 rounded-lg bg-[#16A34A] duration-200 hover:bg-[#16A34A]/50 flex items-center justify-center gap-2"
          >
            {action === "create" ? (
              <>
                Cadastrar
                <Plus size={20} weight="bold" />
              </>
            ) : (
              <>
                Editar
                <PencilSimple size={20} weight="bold" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
