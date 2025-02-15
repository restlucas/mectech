import { Trash } from "@phosphor-icons/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export function Modal({ setShowModal }: Props) {
  return (
    <div className="top-0 right-0 bottom-0 left-0 bg-black/50 absolute z-10 flex items-center justify-center">
      <div className="animate-show-modal z-20 rounded-[20px] p-6 bg-white divide-y divide-gray-400 h-auto max-w-[420px] text-sm font-bold shadow-lg">
        <h1 className="pb-4">
          <span className="text-[#F87171]">CUIDADO:</span> Você está prestes a
          excluir um cliente!
        </h1>
        <p className="py-4 font-semibold">
          Tem certeza de que deseja excluir permanentemente o cliente Claudia
          Sampaio da Silva? Esta ação não pode ser desfeita e todos os dados
          relacionados ao cliente, incluindo histórico de empréstimos e faturas,
          serão removidos permanentemente.
        </p>

        <div className="pt-4 flex items-center justify-end gap-2 text-white font-bold">
          <button
            onClick={() => setShowModal(false)}
            className="py-[10px] px-4 rounded-lg duration-200 bg-[#475569] hover:bg-[#475569]/50"
          >
            Cancelar
          </button>
          <button className="py-[10px] px-4 rounded-lg duration-200 bg-[#DC2626] hover:bg-[#DC2626]/50 flex items-center justify-center gap-2">
            <Trash />
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
