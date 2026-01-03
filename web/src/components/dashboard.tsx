
import { DashboardItem } from "./ui/dashboard-item"
import { Cable, Component, Laptop, LaptopMinimal, Wrench } from "lucide-react"
import { Menu } from "./menu"
import { useAuthStore } from "@/context/auth-store"
import { useInventoryStore } from "@/context/inventory-store"
import { useEffect } from "react"

export function Dashboard() {
  const { user } = useAuthStore()
  const { itemsQuantity, getItemsQuantity } = useInventoryStore()

  useEffect(() => {
    getItemsQuantity()
  }, [])

  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-between bg-green px-10 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-300 text-xs">Bem vindo,</p>
          <span className="text-white text-xs font-bold">{user?.name}</span>
        </div>

      <Menu />
      </header>

      <div className="flex flex-col py-10 gap-10 px-8 bg-gray-200 h-screen">
        <span className="text-green font-medium">Visão Geral</span>

        <div className="flex flex-col w-full gap-8">

        <DashboardItem amount={itemsQuantity?.Computer || 0} type={'Computadores'} icon={<LaptopMinimal />} />
        <DashboardItem amount={itemsQuantity?.Component || 0} type={'Components'} icon={<Component />} />
        <DashboardItem amount={itemsQuantity?.Materials || 0} type={'Materiais'} icon={<Wrench />} />
        <DashboardItem amount={itemsQuantity?.Notebook || 0} type={'Notebooks'} icon={<Laptop />} />
        <DashboardItem amount={itemsQuantity?.Cables || 0} type={'Cabos'} icon={<Cable />} />

        </div>
      </div>
    </div>
  )
}