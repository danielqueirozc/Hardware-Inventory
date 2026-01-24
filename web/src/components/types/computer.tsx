import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Item } from "../ui/item";
import { useInventoryStore } from "@/context/inventory-store";
import { DialogAddNew } from "../dialog-add-new-item";
import { SearchInputMobile } from "../ui/search-input-mobile";
import { ItemType } from "@/@types";

export function Computers() {
  const { itemsByType } = useInventoryStore()


  return (
    <div className="h-auto bg-gray-200">
       <header className="flex items-center justify-items-start bg-green px-10 py-4">
        <div className="flex items-center justify-center gap-4">
          <Link 
            className="text-white w-10 h-10 bg-green-700 rounded-full flex items-center justify-center"
            to="/dashboard"
          >
             <ArrowLeft />
          </Link>
          <span className="font-semibold text-white">Computador</span>
        </div>
      </header>

      <div className="flex flex-col px-10 py-6 h-full">
        <div className="flex gap-4 justify-between items-center w-full h-8">
         
         <SearchInputMobile />

          <div className="w-px bg-gray-700 h-4/5" />

        <DialogAddNew />
         
        </div>

        <div className="flex flex-col gap-6 mt-8">
          {itemsByType.map(item => (
            <Item 
              key={item.code}
              name={item.name}
              id={item.id}
              code={item.code}
              amount={item.amount}
            />
          ))}
        </div>
      </div>
    </div>
  )
}