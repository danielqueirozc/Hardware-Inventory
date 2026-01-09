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

export function DialogAddNew() {
  const [inputValue, setInputValue] = useState('')

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value)
  }

  function deleteLetter() {
    setInputValue(inputValue.slice(0, -1))
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
            <Checkbox className="border-green" id="terms" />
            <Label className="text-gray-600" htmlFor="terms">Lab Línguas</Label>
          </div>

            <div className="flex items-center space-x-2">
            <Checkbox className="border-green" id="terms" />
            <Label className="text-gray-600" htmlFor="terms">Lab Informática</Label>
          </div>

            <div className="flex items-center space-x-2">
            <Checkbox className="border-green" id="terms" />
            <Label className="text-gray-600" htmlFor="terms">Lab Hardware</Label>
          </div>
        </div>
        
        <div className="flex flex-col gap-4  border-b border-gray-300 pt-3 pb-6">
          <div className="flex gap-2">
            <Label className="text-gray-600" htmlFor="terms">Nome</Label>
            <div className="flex items-center border border-green rounded-sm h-8">
              <input
                value={inputValue}
                type="text" 
                onChange={handleInputChange}
                className="focus:outline-none placeholder:text-gray-350 placeholder:font-normal px-3 placeholder:text-sm" 
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
                type="text" 
                className="focus:outline-none border border-green rounded-sm h-8 w-18 text-gray-350 px-3"
              />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm font-semibold">

          <DialogClose asChild>
            <button className="text-red-600">Voltar</button>
          </DialogClose>  

          <button className="text-white px-10 py-2 bg-green rounded-sm">Salvar</button>
        </div>
      </DialogContent>
    </Dialog>
  )
}