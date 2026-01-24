import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Delete, Edit } from "lucide-react";
import { useState } from "react";
import { useInventoryStore } from "@/context/inventory-store";
import { ItemFilterType } from "@/@types";

interface EditItemType {
  id: string
  name: string
  amount: number
  filters: ItemFilterType[]
}

export function EditItem({ id, name, amount, filters }: EditItemType) {
  const [selectedFilters, setSelectedFilters] = useState<ItemFilterType[]>([])
  const [inputName, setInputName] = useState(name)
  const [inputAmount, setInputAmount] = useState(amount)

  const { editItem } = useInventoryStore()

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputName(event.target.value)
  }

  // Simulação de click
  function handleCheckboxChange(filter: ItemFilterType) {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(item => item !== filter)  // (desmarca) remove se ja existe - se ja estiver dentro do array quer dizer que o checkbox ja esta marcado entao simula um click para retirar
        : [...prev, filter] // (marca)  adiciona se não existe 
    )
  }

  function deleteLetter() {
    setInputName(name.slice(0, -1))
  }

  async function handleSave() {
    console.log(selectedFilters)
    try {
      await editItem({
        id,
        name,
        amount,
        filters: selectedFilters
      })

      setInputName('')
      setInputAmount(0)
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Edit className="text-green w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="flex flex-col">
        <span className="text-green font-semibold">Editar Item</span>

        <div className="flex flex-col gap-2 border-b border-gray-300 pb-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              className="border-green"
              checked={selectedFilters.includes(ItemFilterType.Lab_Línguas)}
              onCheckedChange={() => handleCheckboxChange(ItemFilterType.Lab_Línguas)}
            />
            <Label className="text-gray-600">Lab Línguas</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              className="border-green"
              checked={selectedFilters.includes(ItemFilterType.Lab_Informática)}
              onCheckedChange={() => handleCheckboxChange(ItemFilterType.Lab_Informática)}
            />
            <Label className="text-gray-600">Lab Informática</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              className="border-green"
              checked={selectedFilters.includes(ItemFilterType.Lab_Hardware)}
              onCheckedChange={() => handleCheckboxChange(ItemFilterType.Lab_Hardware)}
            />
            <Label className="text-gray-600">Lab Hardware</Label>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 border-b border-gray-300 pt-3 pb-6">
          <div className="flex gap-2">
            <Label className="text-gray-600">Nome</Label>
            <div className="flex items-center border border-green rounded-sm h-8">
              <input
                value={inputName}
                type="text" 
                onChange={handleInputChange}
                className="focus:outline-none placeholder:text-gray-350 placeholder:font-normal px-3 placeholder:text-sm w-full" 
                placeholder="Digite o novo item"
              />
              <div className="w-px h-7/10 bg-gray-350" />
              <button onClick={deleteLetter} className="px-3" type="button">
                <Delete className="text-gray-350" />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <Label className="text-gray-600">Estoque</Label>
            <input
              value={inputAmount}
              onChange={(e) => setInputAmount(Number(e.target.value))}
              type="number" 
              className="focus:outline-none border border-green rounded-sm h-8 w-18 text-gray-350 px-3"
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm font-semibold">
          <DialogClose asChild>
            <button type="button" className="text-red-600">Voltar</button>
          </DialogClose>  

          <button
            onClick={handleSave}
            type="button"
            className="text-white px-10 py-2 bg-green rounded-sm"
          >
            Salvar
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}