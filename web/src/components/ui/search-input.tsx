import type { ItemType } from '@/@types'
import { useInventoryStore } from '@/context/inventory-store'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SearchInputType {
  type: ItemType
}

export function SearchInput({ type }: SearchInputType) {
  const [search, setSearch] = useState<string>('')
  const [_, setIsCurrentSearchValid] = useState<boolean | null>()

  const InventoryStore = useInventoryStore() 

  useEffect(() => {
    if (search.length === 0) {
      setIsCurrentSearchValid(null)

      return
    }

    const timer = setTimeout(async () => {
      try {
        await InventoryStore.searchItem(search, type)
      } catch (error) {
        setIsCurrentSearchValid(false)
      } finally {
        setIsCurrentSearchValid(false)
      }

      return () => clearTimeout(timer)
    }, 500)
  }, [search])

  return (
    <div className="flex items-center relative w-120 border-2 border-green-500 rounded-lg h-10">
      <Search
        className="absolute left-3 text-green-500 w-5 h-5 pointer-events-none"
      />
      <input
        className="pl-9 placeholder:text-gray-400 md:placeholder:text-lg placeholder:font-medium w-full h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
        type="text"
        placeholder="Pesquisar"
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  )
}