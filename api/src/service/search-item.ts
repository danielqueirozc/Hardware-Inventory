import type { Item } from "../generated/prisma/client"
import type { InventoryRepository } from "../repositories/inventory-repository"

interface SearchItemRequest {
  q: string
  type?: 'Component' | 'Computer' | 'Notebook' | 'Materials' | 'Cables'
}

interface SearchItemResponse {
  items: Item[]
}

export class SearchItem {
  constructor (private inventorRepository: InventoryRepository) {}

  async execute({ q, type }: SearchItemRequest): Promise<SearchItemResponse> {
    const items = await this.inventorRepository.searchItem(q, type)


    return { items }
  }
}