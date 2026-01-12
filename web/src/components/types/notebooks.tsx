import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Item } from "../ui/item";
import { useInventoryStore } from "@/context/inventory-store";
import { DialogAddNew } from "../dialog-add-new";

export function Notebooks() {
  const { itemsByType } = useInventoryStore()

  return (
    <div className="h-full bg-gray-200">
       <header className="flex items-center justify-items-start bg-green px-10 py-4">
        <div className="flex items-center justify-center gap-4">
          <Link 
            className="text-white w-10 h-10 bg-green-700 rounded-full flex items-center justify-center"
            to="/dashboard"
          >
             <ArrowLeft />
          </Link>
          <span className="font-semibold text-white">Notebooks</span>
        </div>
      </header>

      <div className="flex flex-col px-10 py-6 h-full">
        <div className="flex gap-4 justify-between items-center w-full h-8">
          <div className="flex items-center relative w-full border border-green rounded-lg h-8">
            <Search
              className="absolute left-3 text-gray-600 w-5 h-5 pointer-events-none"
            />
            <input
              className="pl-9 placeholder:text-gray-600 placeholder:font-medium w-full h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              type="text"
              placeholder="Pesquisar"
            />
          </div>

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