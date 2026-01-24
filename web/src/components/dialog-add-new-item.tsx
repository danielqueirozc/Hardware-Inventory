import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Delete, Plus } from "lucide-react";
import { useState } from "react";
import { ItemFilterType,  ItemType } from "@/@types";
import { useInventoryStore } from '@/context/inventory-store'


export function DialogAddNew() {
  const [name, setName] = useState('')
  const [ amount, setAmount ] = useState(0)
  const [ selectedFilters, setSeletedFilters ] = useState<ItemFilterType[]>([])

  const type = ItemType.Computer

  const { createItem } = useInventoryStore()

  function handleCheckboxChange(filter: ItemFilterType) {
    setSeletedFilters(prev => 
      prev.includes(filter)
      ? prev.filter(item => item !== filter)
      : [...prev, filter]
    )
  }

  async function handleSave() {
    try {
      await createItem({ name, amount, type, filters: selectedFilters })

      setName('')
      setAmount(0)
      setSeletedFilters([])
      
    } catch ( error ) {
      console.error(error)
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function deleteLetter() {
    setName(name.slice(0, -1))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center gap-2 text-white text-xs font-normal bg-green px-2 py-2 rounded-lg">
          Novo
          <Plus className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <span className="text-green font-semibold">Adicionar Novo</span>

        <div className="flex flex-col gap-2 border-b border-gray-300 pb-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={selectedFilters.includes(ItemFilterType.Lab_Línguas)}
              onCheckedChange={() => handleCheckboxChange(ItemFilterType.Lab_Línguas)}
              className="border-green" 
            />
            <Label className="text-gray-600" htmlFor="terms">Lab Línguas</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={selectedFilters.includes(ItemFilterType.Lab_Informática)}
              onCheckedChange={() => handleCheckboxChange(ItemFilterType.Lab_Informática)}
              className="border-green" 
            />
            <Label className="text-gray-600" htmlFor="terms">Lab Informática</Label>
          </div>

            <div className="flex items-center space-x-2">
            <Checkbox
              checked={selectedFilters.includes(ItemFilterType.Lab_Hardware)}
              onCheckedChange={() => handleCheckboxChange(ItemFilterType.Lab_Hardware)}
              className="border-green" 
            />
            <Label className="text-gray-600" htmlFor="terms">Lab Hardware</Label>
          </div>
        </div>
        
        <div className="flex flex-col gap-4  border-b border-gray-300 pt-3 pb-6">
          <div className="flex gap-2">
            <Label className="text-gray-600" htmlFor="terms">Nome</Label>
            <div className="flex items-center border border-green rounded-sm h-8">
              <input
                value={name}
                type="text" 
                onChange={handleInputChange}
                className="focus:outline-none placeholder:text-gray-350 placeholder:font-normal px-3 placeholder:text-sm w-full" 
                placeholder="Digite o novo item"
              />
              <div className="w-px h-7/10 bg-gray-350" />
              <button onClick={deleteLetter} className="px-3">
                <Delete className="text-gray-350" />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <Label className="text-gray-600" htmlFor="terms">Estoque</Label>
             <input
                value={amount}
                type="text" 
                className="focus:outline-none border border-green rounded-sm h-8 w-18 text-gray-350 px-3"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm font-semibold">

          <DialogClose asChild>
            <button className="text-red-600">Voltar</button>
          </DialogClose>  

          <button
            onClick={handleSave}
            className="text-white px-10 py-2 bg-green rounded-sm"
          >
            Salvar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}