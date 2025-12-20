import type { Filter, Item, ItemType } from "../generated/prisma/client";
import type { InventoryRepository } from "../repositories/inventory-repository";

interface CreateItemRequest {
  name: string
  amount: number
  code: string
  type: ItemType
  filter: Filter 
}

interface CreateItemResponse {
  item: Item
}

export class CreateItem {
  constructor (private inventoryRepository: InventoryRepository) {}

  async execute({ name, amount, code, type, filter}: CreateItemRequest): Promise<CreateItemResponse> {
    try {
      const item = await this.inventoryRepository.create({ name, amount, code, type, filter})

      return {
        item
      }
    } catch (error) {
      console.log('ERROR IN SERVICE CREATE ITEM:', error)
      throw error
    }
  }
}
