import type { Filter, Item, ItemType } from "../generated/prisma/client";
import type { InventoryRepository } from "../repositories/inventory-repository";

interface CreateItemRequest {
  name: string
  amount: number
  code: string
  type: ItemType
  filters: Filter[]
}

interface CreateItemResponse {
  item: Item
}

export class CreateItem {
  constructor (private inventoryRepository: InventoryRepository) {}

  async execute({ name, amount, code, type, filters}: CreateItemRequest): Promise<CreateItemResponse> {
    try {
      console.log('chegou aqui no service', { name, amount, type, filters })
      const item = await this.inventoryRepository.create({ name, amount, code, type, filters})

      console.log('chegou aqui no retorno do service', item)
      

      return {
        item
      }
    } catch (error) {
      console.log('ERROR IN SERVICE CREATE ITEM:', error)
      throw error
    }
  }
}
