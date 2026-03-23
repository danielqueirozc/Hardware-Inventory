import { Search, SlidersHorizontal } from "lucide-react";
import { InfoUser } from "./ui/info-user";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { DialogAddNew } from "./dialog-add-new-item";
import { ItemDesktop } from "./item-desktop";
import { useInventoryStore } from "@/context/inventory-store";
import { useState } from "react";
import type { ItemType } from "@/@types";

interface DashboardItemType {
  type: ItemType
}

export function DashboardItem({ type }: DashboardItemType) {
  const [checkboxValueSelected,  setCheckboxValueSelected] = useState<string[]>([])

  const { itemsByType, getItemsByFilter } = useInventoryStore()

  async function handleSelected (value: string, checked: boolean) {
    const newFilters = checked
      ? [...checkboxValueSelected, value]
      : checkboxValueSelected.filter(v => v !== value)

    setCheckboxValueSelected(newFilters)

    try {
      await getItemsByFilter(newFilters, type )
    } catch (error) {
      console.error('nao foi')
    }
  }
  
  console.log(checkboxValueSelected)
  console.log(itemsByType)

  

  return (
    <div className="flex-1 flex flex-col gap-16 px-24 bg-[#FAFAFA]">
      <header className="flex justify-between py-8 -mx-20 px-20 border-b-4 border-gray-300">
        <div className="flex items-center gap-4">
          <h1 className="text-green font-bold text-3xl">{type}</h1>
          <div className="bg-gray-400 font-extrabold w-0.5 h-6" />
          <h2 className="text-gray-400 text-2xl font-bold">Estoque</h2>
        </div>
        <InfoUser />
      </header>

      <main className="border-3 border-gray-300 rounded-4xl px-12 pt-8 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex gap-8">
            <div className="flex items-center relative w-120 border-2 border-green-500 rounded-lg h-10">
              <Search
                className="absolute left-3 text-green-500 w-5 h-5 pointer-events-none"
              />
              <input
                className="pl-9 placeholder:text-gray-400 md:placeholder:text-lg placeholder:font-medium w-full h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
                type="text"
                placeholder="Pesquisar"
              />
            </div>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-4 text-green-500 font-medium px-4 border-2 border-green-500 rounded-lg">
                    <span>Filtrar</span>
                    <SlidersHorizontal className="text-gray-600 w-5 md:w-6 h-5 md:h-6" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-4 w-auto">
                  <div className="flex items-center space-x-2">
                    <Checkbox className="border-green" value="Lab Línguas" onCheckedChange={checked => handleSelected('Lab Línguas', checked as boolean)} />
                    <Label className="text-gray-600" htmlFor="terms">Lab Línguas</Label>
                  </div>

                    <div className="flex items-center space-x-2">
                    <Checkbox className="border-green" value="Lab Informática" onCheckedChange={checked => handleSelected('Lab Informática', checked as boolean)} />
                    <Label className="text-gray-600" htmlFor="terms">Lab Informática</Label>
                  </div>

                    <div className="flex items-center space-x-2">
                    <Checkbox className="border-green" value="Lab Hardware" onCheckedChange={checked => handleSelected('Lab Hardware', checked as boolean)} />
                    <Label className="text-gray-600" htmlFor="terms">Lab Hardware</Label>
                  </div>
                </PopoverContent>
              </Popover>
          </div>

          <DialogAddNew />
        </div>

        <div className="overflow-y-auto">
          <table className="w-full mt-6">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="text-left py-3 px-4 text-gray-900 font-extrabold">Código</th>
                <th className="text-left py-3 px-4 text-gray-900 font-extrabold">Componente</th>
                <th className="text-left py-3 px-4 text-gray-900 font-extrabold">Estoque</th>
                <th className="text-left py-3 px-4 text-gray-900 font-extrabold">Editar</th>
                <th className="text-left py-3 px-4 text-gray-900 font-extrabold">Deletar</th>
              </tr>
            </thead>
            <tbody>
              { itemsByType.map(item => (
                <ItemDesktop
                  key={item.id}
                  name={item.name}
                  amount={item.amount}
                  code={item.code}
                />
              )) }
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}