"use client";

import { orderStore } from "@/stores/orderStore";
import Image from "next/image";

export default function PrintPage() {
  const { order } = orderStore();

  return (
    <div className="bg-[#ebebeb] py-12 flex items-center justify-center w-full h-screen">
      <div className="bg-background px-12 py-20 flex flex-col gap-12 min-h-[900px] min-w-[660px]">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#848484]">
              Ordem de Serviço
            </h2>
            <h1 className="text-2xl font-medium">{order.orderName}</h1>
          </div>

          <Image
            alt="Profile pic"
            src={"/profile.png"}
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>

        <div>
          <h3 className="font-semibold text-base ">Descrição do Serviço</h3>
          <p className="mt-2 font-medium text-xs">{order.serviceDescription}</p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground-red text-base">
            Itens Adicionais
          </h3>
          <div className="mt-2 border border-stroke text-xs rounded-md">
            <table className="w-full border-collapse rounded-md">
              <thead>
                <tr className="text-left rtl:text-right bg-stroke">
                  <th className="px-3 py-1 w-[80%]">Item</th>
                  <th className="px-3 py-1 w-[20%]">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-3 py-1">{item.name}</td>
                      <td className="px-3 py-1">{item.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground-green text-base">
            Materiais Complementares
          </h3>
          <ul className="mt-2">
            {order.materials.map((material, index) => {
              return (
                <li
                  key={index}
                  className="flex items-center justify-start gap-40 text-xs font-medium"
                >
                  <span>{material.name}</span>
                  <span>{material.quantity}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-base">
            Observações ou Instruções Adicionais
          </h3>
          <p className="mt-2 text-xs font-medium">
            {order.observationsOrInstructions}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <Image
            alt="Gear pic"
            src={"/assets/gear.png"}
            width={84}
            height={84}
          />

          <Image
            alt="Gear pic"
            src={"/assets/signature.png"}
            width={170}
            height={125}
          />
        </div>
      </div>
    </div>
  );
}
