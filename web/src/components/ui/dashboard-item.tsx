import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface DashboardItemProps extends React.ComponentProps<'div'> {
  amount: number
  type: string
  icon: ReactNode
}

export function DashboardItem({ amount, type, icon, ...props  }: DashboardItemProps) {
  return (
    <Link to="/computer"className="flex justify-between items-center pl-4 py-4 pr-10 bg-white rounded-lg h-18 border border-gray-700 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex gap-4">
        <div className="self-stretch w-0.75 bg-green rounded-lg"/>

        <div className="flex flex-col justify-center">
          <span className="font-bold text-black">{amount}</span>
          <p className="text-green">{type}</p>
        </div>
      </div>
      
      <div {...props} className="flex items-center justify-center bg-green-300 rounded-full h-12 w-12">
        {icon}
      </div>
    </Link>
  )
}