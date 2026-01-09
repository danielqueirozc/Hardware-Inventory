import type { Item } from "../generated/prisma/client";
import type { ItemType } from "../generated/prisma/enums";
import type { InventoryRepository } from "../repositories/inventory-repository";

interface GetItemByTypeRequest {
  type: ItemType
}

interface GetItemByTypeResponse {
  items: Item[]
}

export class GetItemByTypeService {
  constructor (private inventoryRepository: InventoryRepository) {}

  async execute(type: GetItemByTypeRequest): Promise<GetItemByTypeResponse> {
    const items = await this.inventoryRepository.getItemsByType(type.type)

    return {
      items
    }
  
  }

}