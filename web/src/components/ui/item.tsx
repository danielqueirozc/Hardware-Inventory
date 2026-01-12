import { useInventoryStore } from "@/context/inventory-store";
import { Trash, Edit } from "lucide-react";

interface ItemType {
  name: string
  code: string
  amount: number
  id: string
}

export function Item({  name, code, amount, id }: ItemType) {
  const { deleteItem } = useInventoryStore()

  return (
    <div className="flex flex-col border-x border-gray-300 rounded-lg bg-white shadow-[0_4px_6px_-1px] shadow-gray-400">
      <div className="flex items-center justify-between border-b-3 border-gray-300 pl-5 pr-8 py-2">
        <span className="font-bold text-xs">{name}</span>

        <div className="flex gap-4">
          <button onClick={() => deleteItem(id)}>
            <Trash 
              className="text-red-400 w-4 h-4"  
            />
          </button>
          
          <button>
            <Edit 
              className="text-green w-4 h-4"  
            />
          </button>
        </div>
      </div>
      <div className="flex justify-between pl-5 pr-8 py-2 border-b border-gray-300 ">
        <p className="text-sm font-semibold">Código:</p>
        <p className="text-gray-500 font-medium text-sm">{code}</p>
      </div>
      <div className="flex justify-between pl-5 pr-8 py-2">
        <p className="text-sm font-semibold">Estoque:</p>
        <p className="text-gray-500 font-medium text-sm">{amount}</p>
      </div>
    </div>
  )
}