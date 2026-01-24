import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useInventoryStore } from "@/context/inventory-store";
import { ItemType } from "@/@types";

export function Menu() {
  const [selectedValue, setSelectedValue] = useState<string>('') // Controla qual está selecionado
  const { getItemsByType } = useInventoryStore()
  const navigate = useNavigate()

  const MAP_ROUTES: Record<string, string> = {
    'Início': '/dashboard',
    'Componentes': '/items/Component',
    'Computador': '/items/Computer',
    'Notebook': '/items/Notebook',
    'Materiais': '/items/Materials',
    'Cabos': '/items/Cables',
    'Perfil': '/profile'
  }

  const MAP_ROUTES_API: Record<string, ItemType> = {
    'Início': ItemType.Computer,
    'Componentes': ItemType.Component,
    'Computador': ItemType.Computer,
    'Notebook': ItemType.Notebook,
    'Materiais': ItemType.Materials,
    'Cabos': ItemType.Cables,
    'Perfil': ItemType.Computer
  }

  function redirectToRoute(value: string) {
    console.log(value)
    setSelectedValue(value) // Atualiza o valor selecionado
    
    const routeApi = MAP_ROUTES_API[value]
    getItemsByType(routeApi)

    const route = MAP_ROUTES[value]

    if (route) {
      navigate(route)
      console.log('Navegando para:', route)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex flex-col justify-around items-center w-7.5 h-6.25 bg-transparent border-0 cursor-pointer focus:outline-none focus:shadow-none max-[481px]:w-6.25 max-[481px]:h-5">
          <span className="h-0.75 w-full bg-gray-100 rounded-3xl transition-all duration-400 ease-in-out" />
          <span className="h-0.75 w-full bg-gray-100 rounded-3xl transition-all duration-400 ease-in-out" />
          <span className="h-0.75 w-full bg-gray-100 rounded-3xl transition-all duration-400 ease-in-out" />
        </button>
      </SheetTrigger>
        <SheetContent className="absolute top-18 bg-green h-7/10 w-6/10 rounded-l-[60px] border-0">

          <RadioGroup
            className="flex flex-col gap-12 justify-center pl-12 py-20"
            value={selectedValue} // ← Adicione isso
            onValueChange={redirectToRoute}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Início" />
              <Label className="text-gray-350 text-lg font-semibold">Início</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Componentes" />
              <Label className="text-gray-350 text-lg font-semibold">Componentes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Computador" />
              <Label className="text-gray-350 text-lg font-semibold">Computador</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Notebook" />
              <Label className="text-gray-350 text-lg font-semibold">Notebook</Label>
            </div>
             <div className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Materiais" />
              <Label className="text-gray-350 text-lg font-semibold">Materiais</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Cabos" />
              <Label className="text-gray-350 text-lg font-semibold">Cabos</Label>
            </div>

            <div className="flex items-center space-x-2 mt-8">
              <RadioGroupItem
                color="blue" // ← Cor diferente só para o Perfil!
                className="border-0 bg-gray-350 w-2 h-2" 
                value="Perfil" 
              />
              <Label className="text-gray-350 text-lg font-semibold">Perfil</Label>
            </div>
          </RadioGroup>
        </SheetContent>
    </Sheet>
  )
}