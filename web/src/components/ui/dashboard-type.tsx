import type { ItemType } from "@/@types";
import { useInventoryStore } from "@/context/inventory-store";
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface DashboardItemTypeProps extends React.ComponentProps<'div'> {
  amount: number
  type: string
  itemType: ItemType
  icon: ReactNode
}

export function DashboardType({ amount, type, itemType, icon }: DashboardItemTypeProps) {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(window.innerWidth >= 1024)

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)

  }, [isLargeScreen])

  const { getItemsByType } = useInventoryStore()

  function handleClick() {
    console.log('DashboardItem clicked:', itemType)
    getItemsByType(itemType)
  }

  return (
    <>
      {isLargeScreen ? (
         <Link onClick={handleClick} to={`/items/${itemType}`} className="flex items-center gap-8 pl-4 py-4 pr-10 bg-white rounded-lg h-18 md:h-28 w-md">
           {/* [&>svg] aplica o tamanho diretamente no SVG filho */}
          <div className="flex items-center justify-center bg-green-300 rounded-[50%] h-20 w-28 text-green [&>svg]:size-8">
            {icon}
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col justify-center">
              <p className="text-green font-semibold text-xl">{type}</p>
              <span className="font-bold text-black text-2xl">{amount}</span>
            </div>
          </div>

        </Link>
        
      ) : (
        <Link onClick={handleClick} to={`/items/${itemType}`} className="flex justify-between items-center pl-4 py-4 pr-10 bg-white rounded-lg h-18 md:h-24 border border-gray-700 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex gap-4">
            <div className="self-stretch w-0.75 bg-green rounded-lg lg:hidden"/>

            <div className="flex flex-col justify-center">
              <span className="font-bold text-black md:text-lg">{amount}</span>
              <p className="text-green md:text-lg">{type}</p>
            </div>
          </div>

          {/* [&>svg] aplica o tamanho diretamente no SVG filho */}
          <div className="flex items-center justify-center bg-green-300 rounded-full h-12 md:h-16 w-12 md:w-16 text-green [&>svg]:size-5">
            {icon}
          </div>
        </Link>
      )}
    </>
  )
}