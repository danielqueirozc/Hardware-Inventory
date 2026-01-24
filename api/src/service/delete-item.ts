import type { InventoryRepository } from "../repositories/inventory-repository";

interface DeleteItemRequest {
  id: string
}

export class DeleteItem {
  constructor (private inventoryRepository: InventoryRepository) {}

  async execute({ id }: DeleteItemRequest): Promise<void> {
    await this.inventoryRepository.deleteItem(id)
  }
}