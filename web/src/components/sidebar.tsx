import { LayoutGrid, Package } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Link } from "react-router-dom";
import { useInventoryStore } from "@/context/inventory-store";
import { ItemType } from "@/@types";

export function Sidebar() {
  const [activeLink, setActiveLink] = useState<string>(() => {
    return localStorage.getItem("activeLink") || "inicio"
  })
  const [selectedValue, setSelectedValue] = useState<string>(() => {
    return localStorage.getItem("selectedValue") || ''
  })

  const { getItemsByType ,itemsByType } = useInventoryStore()

  const handleSetActiveLink = (link: string) => {
    setActiveLink(link)
    localStorage.setItem("activeLink", link)
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
    setSelectedValue(value)
    localStorage.setItem("selectedValue", value)

    const routeApi = MAP_ROUTES_API[value]
    getItemsByType(routeApi)
  }

  return (
    <aside className="bg-green flex flex-col gap-8 px-4 py-2">
      <img
        className="w-44" 
        src="/logo-fundo-escuro.svg" 
        alt="" 
      />

      <div className="flex flex-col gap-10">
        <Link
          to='/dashboard'
          onClick={() => handleSetActiveLink("inicio")}
          // esta trocado a validacao porque no esta default para aparecer o css esta como false
          className={`
            ${activeLink === "inicio" ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-4px_0_rgba(0,0,0,0.25)] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white before:rounded-r-full' : null}
            relative flex items-center gap-4 text-white text-lg font-bold rounded-lg py-3 -ml-4 pl-4` }
        >
          <LayoutGrid />
          Inicío
        </Link>

              {/* 'shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-4px_0_rgba(0,0,0,0.25)] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white before:rounded-r-full' : null} relative flex items-center gap-4 text-white text-lg font-bold rounded-lg py-3 -ml-4 pl-4` } */}
        <button
          onClick={() => handleSetActiveLink("estoque")}
          className={`
            ${activeLink === "estoque" ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-4px_0_rgba(0,0,0,0.25)] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white before:rounded-r-full' : null}
            relative flex items-center gap-4 text-white text-lg font-bold rounded-lg py-3 -ml-4 pl-4` }
        >
          <Package />
          Estoque
        </button>
      </div>

      <div>
        {activeLink === 'estoque' ? (
           <RadioGroup
            className="flex flex-col gap-8"
            // value: compara esse valor com o value de cada RadioGroupItem — quando batem, aquele item renderiza o círculo laranja
            value={selectedValue}
            onValueChange={redirectToRoute}
          >
            <Link to="/items/Component" className="flex items-center space-x-2" onClick={() => redirectToRoute("Componentes")}>
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Componentes" />
              <Label className="text-gray-350 text-sm font-semibold">Componentes</Label>
            </Link>
            <Link to="/items/Computer" className="flex items-center space-x-2" onClick={() => redirectToRoute("Computador")}>
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Computador" />
              <Label className="text-gray-350 text-sm font-semibold">Computador</Label>
            </Link>
            <Link to="/items/Notebook" className="flex items-center space-x-2" onClick={() => redirectToRoute("Notebook")}>
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Notebook" />
              <Label className="text-gray-350 text-sm font-semibold">Notebook</Label>
            </Link>
             <Link to="/items/Materials" className="flex items-center space-x-2" onClick={() => redirectToRoute("Materiais")}>
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Materiais" />
              <Label className="text-gray-350 text-sm font-semibold">Materiais</Label>
            </Link>
            <Link to="/items/Cables" className="flex items-center space-x-2" onClick={() => redirectToRoute("Cabos")}>
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Cabos" />
              <Label className="text-gray-350 text-sm font-semibold">Cabos</Label>
            </Link>
          </RadioGroup>
        ) : (
          null
        )}
      </div>
    </aside>
  )
}