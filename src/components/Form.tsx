"use client";

import Image from "next/image";
import { BaseInput } from "./BaseInput";
import { TextAreaInput } from "./TextArea";
import { orderStore } from "@/stores/orderStore";
import { FormEvent, useState } from "react";
import Link from "next/link";

export function NewOrderForm() {
  const {
    order,
    updateOrder,
    addItemToOrder,
    removeItemFromOrder,
    resetOrder,
  } = orderStore();
  const [arrayToOrder, setArrayToOrder] = useState({
    items: {
      name: "",
      quantity: "",
    },
    materials: {
      name: "",
      quantity: "",
    },
  });

  const handleChange = async (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement;

    updateOrder(name, value);
  };

  const handleChangeArrayToOrder = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    type: "items" | "materials"
  ) => {
    setArrayToOrder((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [field]: e.target.value,
      },
    }));
  };

  const handleToStore = async (type: "items" | "materials") => {
    addItemToOrder(type, arrayToOrder[type]);

    setArrayToOrder((prevState) => ({
      ...prevState,
      [type]: {
        name: "",
        quantity: "",
      },
    }));
  };

  return (
    <form className="mt-8 flex flex-col gap-8 mb-16">
      <BaseInput
        label="Nome da Ordem de Serviço"
        name="orderName"
        value={order.orderName}
        onChange={handleChange}
      />

      <TextAreaInput
        label="Descrição do Serviço"
        name="serviceDescription"
        value={order.serviceDescription}
        onChange={handleChange}
      />

      {/* Itens adicionais */}
      <div>
        <h3 className="text-base font-semibold text-foreground-red">
          Itens Adicionais
        </h3>
        <div className="mt-2 grid grid-cols-[1fr_min-content] min-[1300px]:grid-cols-1 min-[1400px]:grid-cols-[1fr_min-content] gap-4">
          <BaseInput
            label="Item"
            name="item"
            value={arrayToOrder.items.name}
            onChange={(e) => handleChangeArrayToOrder(e, "name", "items")}
          />
          <BaseInput
            label="Quantidade"
            name="quantity"
            value={arrayToOrder.items.quantity}
            onChange={(e) => handleChangeArrayToOrder(e, "quantity", "items")}
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {order.items.map((item, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => removeItemFromOrder("items", item.name)}
                className="flex items-end justify-between text-sm font-medium text-nowrap w-full duration-200 hover:hover:bg-[#e5e5e5] cursor-pointer py-1 px-2 rounded-md"
              >
                <div className="flex items-center justify-start gap-2 flex-grow">
                  <Image
                    alt="Options image"
                    src={"/assets/options.svg"}
                    width={8}
                    height={15}
                  />
                  <span>{item.name}</span>
                </div>
                <span>{item.quantity}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 w-full flex flex-row min-[1300px]:flex-col min-[1400px]:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleToStore("items")}
            className="rounded-md text-sm font-semibold text-white bg-foreground-red w-full flex-1 py-1 duration-200 hover:bg-red-900"
          >
            Adicionar Material
          </button>
          <button
            type="button"
            className="rounded-md text-sm font-semibold text-white bg-foreground-red w-[140px] min-[1300px]:w-full  py-1 min-[1400px]:w-[140px] duration-200 hover:bg-red-900"
          >
            Texto Livre
          </button>
        </div>
      </div>
      {/* Materiais Complementares */}
      <div>
        <h3 className="text-base font-semibold text-foreground-red">
          Materiais Complementares
        </h3>
        <div className="mt-2 grid grid-cols-[1fr_min-content] min-[1300px]:grid-cols-1 min-[1400px]:grid-cols-[1fr_min-content] gap-4">
          <BaseInput
            label="Item"
            name="item"
            value={arrayToOrder.materials.name}
            onChange={(e) => handleChangeArrayToOrder(e, "name", "materials")}
          />
          <BaseInput
            label="Quantidade"
            name="quantity"
            value={arrayToOrder.materials.quantity}
            onChange={(e) =>
              handleChangeArrayToOrder(e, "quantity", "materials")
            }
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {order.materials.map((material, index) => {
            return (
              <button
                key={index}
                type="button"
                onClick={() => removeItemFromOrder("materials", material.name)}
                className="flex items-end justify-between text-sm font-medium text-nowrap w-full duration-200 hover:hover:bg-[#e5e5e5] cursor-pointer py-1 px-2 rounded-md"
              >
                <div className="flex items-center justify-start gap-2 flex-grow">
                  <Image
                    alt="Options image"
                    src={"/assets/options.svg"}
                    width={8}
                    height={15}
                  />
                  <span>{material.name}</span>
                </div>
                <span>{material.quantity}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-4 w-full flex flex-row min-[1300px]:flex-col min-[1400px]:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => handleToStore("materials")}
            className="rounded-md text-sm font-semibold text-white bg-foreground-green w-full flex-1 py-1 duration-200 hover:bg-green-700"
          >
            Adicionar Material
          </button>
          <button
            type="button"
            className="rounded-md text-sm font-semibold text-white bg-foreground-green w-[140px] min-[1300px]:w-full py-1 min-[1400px]:w-[140px] duration-200 hover:bg-green-700"
          >
            Texto Livre
          </button>
        </div>
      </div>

      <TextAreaInput
        label="Observações ou Instruções Adicionais"
        name="observationsOrInstructions"
        value={order.observationsOrInstructions}
        onChange={handleChange}
      />

      <div className="flex justify-end items-center gap-4 w-full font-semibold text-sm">
        <Link
          href="/print"
          className="rounded-md px-3 py-2 mr-auto  border-[1px] border-stroke duration-200 hover:bg-[#e5e5e5]"
        >
          Imprimir
        </Link>

        <button
          type="button"
          onClick={resetOrder}
          className="rounded-md px-3 py-2 border-[1px] border-stroke duration-200 hover:bg-[#e5e5e5]"
        >
          Cancelar
        </button>
        <button
          type="button"
          className="rounded-md px-3 py-2 text-white bg-foreground-red duration-200 hover:bg-red-900"
        >
          Salvar
        </button>
      </div>

      <div className="flex items-center justify-end gap-2">
        <input
          type="checkbox"
          id="onSaveSendToEmail"
          name="onSaveSendToEmail"
          className="h-[14px] w-[14px] rounded-md"
        />
        <label htmlFor="onSaveSendToEmail" className="text-xs font-medium">
          Enviar por e-mail ao salvar
        </label>
      </div>
    </form>
  );
}
