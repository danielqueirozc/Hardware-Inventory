import { LayoutGrid, Package } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Link } from "react-router-dom";

export function Sidebar() {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<string>('')

  function redirectToRoute(value: string) {
    setSelectedValue(value)
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
          onClick={() => setIsClicked(!isClicked)}
          className={`
            ${isClicked ? null : 
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-4px_0_rgba(0,0,0,0.25)] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white before:rounded-r-full'} relative flex items-center gap-4 text-white text-lg font-bold rounded-lg py-3 -ml-4 pl-4
            `}
        >
          <LayoutGrid />
          Inicío
        </Link>

        <button
          onClick={() => setIsClicked(!isClicked)}
          className={`${isClicked ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-4px_0_rgba(0,0,0,0.25)] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white before:rounded-r-full' : null} relative flex items-center gap-4 text-white text-lg font-bold rounded-lg py-3 -ml-4 pl-4` }
        >
          <Package />
          Estoque
        </button>
      </div>

      <div className="">
        {isClicked ? (
           <RadioGroup
            className="flex flex-col gap-8"
            value={selectedValue}
            onValueChange={redirectToRoute}
          >
            <Link to="/items/Components" className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Componentes" />
              <Label className="text-gray-350 text-sm font-semibold">Componentes</Label>
            </Link>
            <Link to="/items/Computer" className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Computador" />
              <Label className="text-gray-350 text-sm font-semibold">Computador</Label>
            </Link>
            <Link to="/items/Notebook" className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Notebook" />
              <Label className="text-gray-350 text-sm font-semibold">Notebook</Label>
            </Link>
             <Link to="/items/Materials" className="flex items-center space-x-2">
              <RadioGroupItem className="border-0 bg-gray-350 w-2 h-2" value="Materiais" />
              <Label className="text-gray-350 text-sm font-semibold">Materiais</Label>
            </Link>
            <Link to="/items/Cables" className="flex items-center space-x-2">
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