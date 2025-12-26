import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { DashboardItem } from "./ui/dashboard-item"
import { Cable, Component, Laptop, LaptopMinimal, Wrench } from "lucide-react"

export function Dashboard() {
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between bg-green px-10 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-300 text-xs">Bem vindo,</p>
          <span className="text-white text-xs font-bold">Marina Bertioga</span>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col justify-around items-center `w-7.5 h-6.25 bg-transparent border-0 cursor-pointer focus:outline-none focus:shadow-none max-[481px]:w-6.25 max-[481px]:h-5">
              <span className="h-0.75 w-full bg-gray-100 rounded-3xl transition-all duration-400 ease-in-out" />
              <span className="h-0.75 w-full bg-gray-100 rounded-3xl transition-all duration-400 ease-in-out" />
              <span className="h-0.75 w-full bg-gray-100 rounded-3xl transition-all duration-400 ease-in-out" />
            </button>
          </SheetTrigger>
          <SheetContent>
             
          </SheetContent>
        </Sheet>

      </header>

      <div className="flex flex-col py-10 gap-10 px-8 bg-gray-200 h-screen">
        <span className="text-green font-medium">Visão Geral</span>

        <div className="flex flex-col w-full gap-8">
      
        <DashboardItem amount={10} type={'Computadores'} icon={<LaptopMinimal />} />
        <DashboardItem amount={10} type={'Components'} icon={<Component />} />
        <DashboardItem amount={10} type={'Materiais'} icon={<Wrench />} />
        <DashboardItem amount={10} type={'Notebooks'} icon={<Laptop />} />
        <DashboardItem amount={10} type={'Cabos'} icon={<Cable />} />

        </div>
      </div>
    </div>
  )
}