import { Cable, Component, Laptop, LaptopMinimal, Wrench } from "lucide-react";
import { useEffect } from "react";
import { InfoUser } from "./ui/info-user";
import { useAuthStore } from "@/context/auth-store";
import { DashboardType } from "./ui/dashboard-type.tsx";
import { ItemType } from "@/@types";
import { useInventoryStore } from "@/context/inventory-store";
import { Sidebar } from "./sidebar.tsx";

export function Dashboard() {
  const { user } = useAuthStore()
  const { itemsQuantity, getItemsQuantity } = useInventoryStore()

  const ITEM_CONFIG: Record<ItemType, {icon: React.ReactNode; label: string}> = {
    Computer: { icon: <LaptopMinimal />, label: 'Computadores' },
    Component: { icon: <Component />, label: 'Componentes' },
    Materials: { icon: <Wrench />, label: 'Materiais' },
    Notebook: { icon: <Laptop />, label: 'Notebooks' },
    Cables: { icon: <Cable />, label: 'Cabos' },
  }

  useEffect(() => {
    getItemsQuantity()
  }, [getItemsQuantity])

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col bg-[#FAFAFA]">
        <header className="flex items-center justify-between bg-white px-14 py-8 border-b-3 border-gray-300">
          <h1 className="text-green text-3xl font-bold">Components</h1>
         <InfoUser />
        </header>

        <main className="bg-[#FAFAFA] p-12 flex flex-col gap-8">
          <h1 className="text-2xl font-bold">Bem-Vindo, {user?.name}</h1>
          <span className="text-gray-400 font-medium">Overview</span>
          <div className="grid grid-cols-3 gap-3">
            {Object.keys(ITEM_CONFIG).map(key => {
              const type = key as ItemType

              const config = ITEM_CONFIG[type]
              const itemsAmount = itemsQuantity?.[type] || 0
              // console.log(itemsAmount)

              return (
                <DashboardType
                  key={type}
                  type={config.label}
                  itemType={type}
                  icon={config.icon}
                  amount={itemsAmount}
                />
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}