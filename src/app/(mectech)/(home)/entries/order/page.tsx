import { NewOrderForm } from "@/components/Form";
import { PrintPreview } from "@/components/PrintPreview";

export default function OrderEntryPage() {
  return (
    <div className="grid gri-cols-1 min-[1300px]:grid-cols-[1fr_min-content] items-start gap-7">
      <div className="w-full h-full">
        <h1 className="font-bold text-3xl">Nova Ordem de Serviço</h1>

        <NewOrderForm />
      </div>
      <div className="bg-[#ebebeb] p-12 rounded-lg">
        <PrintPreview />
      </div>
    </div>
  );
}
