import { Pencil, Trash2 } from "lucide-react";
interface ItemDesktopType {
  name: string
  code: string
  amount: number
} 

export function ItemDesktop({ code, name, amount}: ItemDesktopType) {

  return (
    <tr className="border-b border-gray-300">
      <td className="py-4 px-4 text-gray-600">{code}</td>
      <td className="py-4 px-4 text-gray-600">{name}</td>
      <td className="py-4 px-4 text-gray-600">{amount}</td>
      <td className="py-4 px-4">
        <button className="cursor-pointer">
          <Pencil className="text-green-500 w-5 h-5" />
        </button>
      </td>
      <td className="py-4 px-4">
        <button className="cursor-pointer">
          <Trash2 className="text-red-400 w-5 h-5" />
        </button>
      </td>
    </tr>
  )
}