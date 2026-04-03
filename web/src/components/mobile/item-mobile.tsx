import { useInventoryStore } from "@/context/inventory-store";
import { Trash } from "lucide-react";
import { EditItem } from "../edit-item";
import type { ItemFilterType } from "@/@types";

interface ItemType {
  name: string
  code: string
  amount: number
  id: string
  filters: ItemFilterType[]
}

export function ItemMobile({  name, code, amount, id, filters }: ItemType) {
  const { deleteItem } = useInventoryStore()


  return (
    <div className="flex flex-col border-x border-gray-300 rounded-lg bg-white shadow-[0_4px_6px_-1px] shadow-gray-400 md:px-2 md:py-4">
      <div className="flex items-center justify-between border-b-3 border-gray-300 pl-5 pr-8 py-2">
        <span className="font-bold text-xs md:text-lg">{name}</span>

        <div className="flex gap-4 md:gap-8">
          <button onClick={() => deleteItem(id)}>
            <Trash 
              className="text-red-400 w-4 md:w-6 h-4 md:h-6"  
            />
          </button>
          
         <EditItem id={id} name={name} amount={amount} filters={filters}  />
        </div>
      </div>
      <div className="flex justify-between pl-5 pr-8 py-2 border-b border-gray-300 ">
        <p className="text-sm md:text-lg font-semibold">Código:</p>
        <p className="text-gray-500 font-medium text-sm md:text-lg">{code}</p>
      </div>
      <div className="flex justify-between pl-5 pr-8 py-2">
        <p className="text-sm md:text-lg font-semibold">Estoque:</p>
        <p className="text-gray-500 font-medium text-sm md:textlg">{amount}</p>
      </div>
    </div>
  )
}