import type { Item } from "../generated/zod"
import type { EditItemInput, InventoryRepository } from "../repositories/inventory-repository"

export class EditItem {
  constructor (private inventoryRepository: InventoryRepository) {}

  async execute({ id, name, amount, filters }: EditItemInput): Promise<Item> {
    const item = await this.inventoryRepository.editItem({ id, name, amount, filters })

    return item
  }
}