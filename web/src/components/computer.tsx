import { ArrowLeft, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Computeritem } from "./ui/computer-item";

export function Computer() {
  const items = [
    { name: 'Computador tal', code: '#123D56', amount: 10 },
    { name: 'Computador tal', code: '#123F56', amount: 10 },
    { name: 'Computador tal', code: '#123H56', amount: 10 },
    { name: 'Computador tal', code: '#123G56', amount: 10 },
    { name: 'Computador tal', code: '#123H56', amount: 10 },
  ]

  return (
    <div className="h-screen">
       <header className="flex items-center justify-items-start bg-green px-10 py-4">
        <div className="flex items-center justify-center gap-4">
          <Link 
            className="text-white w-10 h-10 bg-green-700 rounded-full flex items-center justify-center"
            to="/dashboard"
          >
             <ArrowLeft />
          </Link>
          <span className="font-semibold text-white">Computador</span>
        </div>
      </header>

      <div className="flex flex-col px-10 py-6 bg-gray-200 h-full">
        <div className="flex gap-4 justify-between items-center w-full h-8">
          <div className="flex items-center relative w-full border border-green rounded-lg h-8">
            <Search
              className="absolute left-3 text-gray-600 w-5 h-5 pointer-events-none"
            />
            <input
              className="pl-9 placeholder:text-gray-600 placeholder:font-medium w-full h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              type="text"
              placeholder="Pesquisar"
            />
          </div>

          <div className="w-px bg-gray-700 h-4/5" />

          <button className="flex items-center justify-center gap-2 text-white text-xs font-normal bg-green px-2 py-2 rounded-lg">
            Novo
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col gap-6 mt-8">
          {items.map(items => (
            <Computeritem 
              key={items.code}
              name={items.name}
              code={items.code}
              amount={items.amount}
            />
          ))}
        </div>
      </div>
    </div>
  )
}