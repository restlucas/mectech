"use client";
import { useState } from "react";
import Link from "next/link";

import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";

import { DotsThree, MagnifyingGlass, Trash } from "@phosphor-icons/react";

export default function HomePage() {
  const [showModal, setShowModal] = useState<boolean>(false);

  async function handleDelete() {
    setShowModal(true);
  }

  return (
    <section className="w-full h-full">
      <h1 className="font-bold text-3xl">Clientes</h1>

      {/* Container */}
      <div className="mt-8 bg-foreground border border-gray-dark rounded-lg p-8 w-full h-auto space-y-8 text-white">
        {/* Container header */}
        <div className="flex items-center justify-between">
          <div className="w-[350px]">
            <Input
              placeholder="Pesquisa por nome ou email"
              icon={<MagnifyingGlass size={24} />}
            />
          </div>
          <button
            onClick={handleDelete}
            className="py-2 px-4 rounded-md bg-red-600 text-white font-semibold flex items-center justify-center gap-2"
          >
            <span>Excluir selecionados</span>
            <Trash size={20} weight="bold" />
          </button>
        </div>

        {/* Container Table */}
        <div className="border border-gray-dark rounded-md overflow-hidden">
          <table className="w-full table-auto text-sm border-collapse">
            <thead className="text-left">
              <tr className="">
                <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                  <input type="checkbox" />
                </th>
                <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                  Nome
                </th>
                <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                  E-mail
                </th>
                <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                  Telefone
                </th>
                <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                  Nascimento
                </th>
                <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                  Endereço
                </th>
                <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-dark">
              {Array.from({ length: 6 }).map((_, index) => {
                return (
                  <tr
                    key={index}
                    className="last:border-b-0 duration-200 hover:bg-[#09090B]/70 font-bold"
                  >
                    <td className="p-4">
                      <input type="checkbox" />
                    </td>
                    <td className="p-4">Lucas</td>
                    <td className="p-4">lucas@email.com</td>
                    <td className="p-4">(42) 99999-9999</td>
                    <td className="p-4">01/01/2000</td>
                    <td className="p-4">Rua XYZ</td>
                    <td className="">
                      <Link
                        href={`/edit-client/${index}`}
                        className="rounded-md cursor-pointer flex items-center justify-center w-8 h-8 duration-200 hover:bg-[#52525B]"
                      >
                        <DotsThree size={24} weight="bold" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Container footer */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-[#A1A1AA] font-bold">
            1 de 10 linhas selecionadas
          </span>

          <div className="flex items-center justify-end gap-4">
            <button className="py-3 px-6 text-sm font-bold rounded-lg cursor-pointer bg-[#09090B] duration-200">
              Anterior
            </button>
            <button className="py-3 px-6 text-sm font-bold rounded-lg cursor-pointer bg-[#52525B] duration-200 hover:bg-[#52525B]/50">
              Próxima
            </button>
          </div>
        </div>
      </div>

      {showModal && <Modal setShowModal={setShowModal} />}
    </section>
  );
}
