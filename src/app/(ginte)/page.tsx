"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";

import { DotsThree, MagnifyingGlass, Trash } from "@phosphor-icons/react";
import { deleteClient, getClientsList } from "@/services/client";
import { Checkbox } from "@/components/Checkbox";
import { formatDate } from "../../utilts/formatDate";

export type Client = {
  id: string,
  name: string;
  email: string;
  phone: string;
  birth: string;
  address: string;
}


export default function HomePage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [clients, setClients] = useState<Client[]>([])
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0
  })
  const [deleting, setDeleting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedClients, setSelectedClients] = useState<{ id: string; name: string }[]>([]);
  const allSelected = selectedClients.length === clients.length && clients.length > 0;

  function handlePagination(direction: 'previous' | 'next') {
    setPagination((prevState => {
      const newPage = direction === 'previous' ? prevState.page - 1 === 0 ? 1 : prevState.page - 1
      : prevState.page + 1 <= prevState.totalPages ? prevState.page + 1 : prevState.page

      return {
        ...prevState,
        page: newPage
      }
    }))
  }

  function handleSelectAllClients() {
    setSelectedClients(allSelected ? [] : clients.map(({ id, name }) => ({ id, name })));
  }

  function handleSelect(id: string, name: string) {
    setSelectedClients((prevState) =>
      prevState.some((client) => client.id === id)
        ? prevState.filter((client) => client.id !== id)
        : [...prevState, { id, name }]
    );
  }

  async function handleDelete() {
    setDeleting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await deleteClient(selectedClients.map((client) => client.id));
    alert(response.message)

    setShowModal(false)
    setDeleting(false)
    setSearch("")
    setSelectedClients([])
    getClients()
  }

  const getClients = useCallback(async () => {
    setLoading(true);
    const response = await getClientsList(pagination.page, search);

    setClients(response.data.clients);
    setPagination((prevState) => ({
      ...prevState,
      totalPages: response.data.totalPages,
    }));
    setLoading(false);
  }, [pagination.page, search]); 

  useEffect(() => {
    getClients()
  } , [pagination.page, search, getClients])

  if (loading) {
    return (
      <section className="w-full h-full">
        <h1 className="font-bold text-3xl">Clientes</h1>
  
        {/* Container */}
        <div className="mt-8 bg-foreground border border-gray-dark rounded-lg p-8 w-full h-auto space-y-8 text-white">
          {/* Container header */}
          <div className="flex items-center justify-start">
            <div className="w-[300px] h-10 rounded-lg bg-[#09090B] animate-pulse" />
          </div>
  
          {/* Container Table */}
          <div className="border border-gray-dark rounded-md overflow-x-scroll xl:overflow-x-hidden">
            <table className="w-full table-auto text-sm border-collapse">
              <thead className="text-left">
                <tr className="">
                  <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                    <div className="w-4 h-4 rounded-sm bg-[#09090B] animate-pulse" />
                  </th>
                  <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                    <div className="bg-[#09090B] animate-pulse w-20 h-6 rounded-md" />
                  </th>
                  <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                    <div className="bg-[#09090B] animate-pulse w-20 h-6 rounded-md" />
                  </th>
                  <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                    <div className="bg-[#09090B] animate-pulse w-20 h-6 rounded-md" />
                  </th>
                  <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                    <div className="bg-[#09090B] animate-pulse w-20 h-6 rounded-md" />
                  </th>
                  <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                    <div className="bg-[#09090B] animate-pulse w-20 h-6 rounded-md" />
                  </th>
                  <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-dark">
                {Array.from({ length: 10 }).map((client, index) => {
                  return (
                    <tr
                      key={index}
                      className="last:border-b-0 duration-200 hover:bg-[#09090B]/70 font-bold"
                    >
                      <td className="p-4">
                        <div className="w-4 h-4 rounded-sm bg-[#09090B] animate-pulse" />
                      </td>
                      <td className="p-4 text-nowrap">
                        <div className="w-24 h-6 rounded-md bg-[#09090B] animate-pulse" />
                      </td>
                      <td className="p-4 text-nowrap">
                        <div className="w-56 h-6 rounded-md bg-[#09090B] animate-pulse" />
                      </td>
                      <td className="p-4 text-nowrap">
                        <div className="w-36 h-6 rounded-md bg-[#09090B] animate-pulse" />
                      </td>
                      <td className="p-4 text-nowrap">
                        <div className="w-28 h-6 rounded-md bg-[#09090B] animate-pulse" />
                      </td>
                      <td className="p-4 text-nowrap">
                        <div className="w-40 h-6 rounded-md bg-[#09090B] animate-pulse" />
                      </td>
                      <td className="">
                        <div className="w-8 h-8 rounded-md bg-[#09090B] animate-pulse" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-auto">
      <h1 className="font-bold text-3xl">Clientes</h1>

      {/* Container */}
      <div className="mt-8 mb-32 bg-foreground border border-gray-dark rounded-lg p-8 w-full h-auto space-y-8 text-white">
        {/* Container header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="w-[300px]">
            <Input
              placeholder="Pesquisa por nome ou email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<MagnifyingGlass size={24} />}
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            disabled={selectedClients.length === 0}
            className={`py-2 px-4 rounded-md text-white text-nowrap font-semibold flex items-center justify-center gap-2 duration-200 ${selectedClients.length === 0 ? 'bg-[#09090B]' : 'bg-red-600 hover:bg-red-600/50'}`} 
          >
            <span>Excluir selecionados</span>
            <Trash size={20} weight="bold" />
          </button>
        </div>

        {/* Container Table */}
        <div className="border border-gray-dark rounded-md overflow-x-scroll min-[1360px]:overflow-x-hidden">
          <table className="w-full table-auto text-xs min-[900px]:text-sm border-collapse">
            <thead className="text-left">
              <tr className="">
                <th className="border-b-2 border-gray-dark p-4 text-nowrap text-[#D4D4D8]">
                  <Checkbox checked={allSelected} onChange={handleSelectAllClients} />
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
              {clients.map((client, index) => {
                return (
                  <tr
                    key={index}
                    className="last:border-b-0 duration-200 hover:bg-[#09090B]/70 font-bold"
                  >
                    <td className="p-4">
                      <Checkbox checked={selectedClients.some((selected) => selected.id === client.id)} onChange={() => handleSelect(client.id, client.name)} />
                    </td>
                    <td className="p-4 text-nowrap">{client.name}</td>
                    <td className="p-4 text-nowrap">{client.email}</td>
                    <td className="p-4 text-nowrap">{client.phone}</td>
                    <td className="p-4 text-nowrap">{formatDate(client.birth)}</td>
                    <td className="p-4 text-nowrap">{client.address}</td>
                    <td className="p-4">
                      <Link
                        href={`/edit-client/${client.id}`}
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
        <div className="flex flex-col min-[900px]:flex-row items-center justify-between gap-4 text-xs min-[900px]:text-sm">
          <span className="text-[#A1A1AA] font-bold">
            {selectedClients.length} de 10 linhas selecionadas
          </span>

          <p className="font-bold text-[#A1A1AA] text-center">Page {pagination.page} of {pagination.totalPages}</p>
 
          <div className="flex items-center justify-end gap-4">
            <button onClick={() => handlePagination('previous')} disabled={pagination.page === 1} className={`py-3 px-6 font-bold rounded-lg cursor-pointer ${pagination.page === 1 ? 'bg-[#09090B] duration-200 text-white/50' : 'bg-[#52525B] duration-200 hover:bg-[#52525B]/50'}`}>
              Anterior
            </button>
            <button onClick={() => handlePagination('next')} disabled={pagination.page === pagination.totalPages} className={`py-3 px-6 font-bold rounded-lg cursor-pointer  ${pagination.page === pagination.totalPages ? 'bg-[#09090B] text-white/50' : 'bg-[#52525B] duration-200 hover:bg-[#52525B]/50'}`}>
              Próxima
            </button>
          </div>
        </div>
      </div>

      {showModal && <Modal>
        <h1 className="pb-4">
          <span className="text-[#F87171]">CUIDADO:</span> Você está prestes a
          excluir clientes!
        </h1>

        <div className="py-4 flex flex-col gap-2">
          <p className="font-semibold">
            Tem certeza de que deseja excluir permanentemente os clientes listados abaixo? Esta ação não pode ser desfeita e todos os dados
            relacionados ao cliente, incluindo histórico de empréstimos e faturas,
            serão removidos permanentemente.
          </p>
          
          <div className="flex flex-col gap-1">
            {
              selectedClients.map((client) => {
                return (
                  <p key={client.id}>
                    {client.name}
                  </p>
                )
              })
            }
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-2 text-white font-bold">
          <button
            onClick={() => setShowModal(false)}
            className="py-[10px] px-4 rounded-lg duration-200 bg-[#475569] hover:bg-[#475569]/50"
          >
            Cancelar
          </button>
          <button onClick={handleDelete} className="py-[10px] w-[100px] rounded-lg duration-200 bg-[#DC2626] hover:bg-[#DC2626]/50 flex items-center justify-center gap-2">
            {
              deleting ?
              <div className="flex w-full items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              </div>
              :
              <>
              <Trash />
              Deletar
              </>
            }
          </button>
        </div>
        </Modal>}
    </section>
  );
}
