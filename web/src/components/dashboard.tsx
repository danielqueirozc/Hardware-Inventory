import { DashboardItem } from "./ui/dashboard-item"
import { Cable, Component, Laptop, LaptopMinimal, Wrench } from "lucide-react"
import { Menu } from "./menu"
import { useAuthStore } from "@/context/auth-store"
import { useInventoryStore } from "@/context/inventory-store"
import { useEffect } from "react"
import type { ItemType } from "@/@types"

const ITEM_CONFIG: Record<ItemType, { icon: React.ReactNode; label: string }> = {
  Computer: { icon: <LaptopMinimal />, label: 'Computadores' },
  Component: { icon: <Component />, label: 'Componentes' },
  Materials: { icon: <Wrench />, label: 'Materiais' },
  Notebook: { icon: <Laptop />, label: 'Notebooks' },
  Cables: { icon: <Cable />, label: 'Cabos' },
}

export function Dashboard() {
  const { user } = useAuthStore()
  const { itemsQuantity, getItemsQuantity } = useInventoryStore()

  useEffect(() => {
    getItemsQuantity()
  }, [getItemsQuantity])

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
          
          {/* Pega todas as chaves (nomes das propriedades) do objeto ITEM_CONFIG e transforma em um array, depois percorre cada uma. */}
          {/* Object.keys() pega só as etiquetas e faz uma lista. */}
          {Object.keys(ITEM_CONFIG).map((key) => {
            const type = key as ItemType
            // Pega a configuração do item com base no tipo
            // ex: type = component, entao: Component: { icon: <Component />, label: 'Componentes' },
            const config = ITEM_CONFIG[type]
            const itemsAmount = itemsQuantity?.[type] ?? 0

            return (
              <DashboardItem
                key={type}
                amount={itemsAmount}
                type={config.label}
                itemType={type}
                icon={config.icon}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
