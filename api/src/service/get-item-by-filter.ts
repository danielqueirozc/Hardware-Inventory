import type { Item } from "../generated/prisma/client";
import type { Filter, ItemType } from "../generated/prisma/enums";
import type { InventoryRepository } from "../repositories/inventory-repository";

interface GetItemByFilterRequest {
  filter: Filter[]
  type: ItemType
}

interface GetItemByFilterResponse {
  item: Item[]
}

export class GetItemByFilter {
  constructor (private inventoryRepository: InventoryRepository) {}

  async execute({ filter, type }: GetItemByFilterRequest): Promise<GetItemByFilterResponse> {
    const item = await this.inventoryRepository.getItemsByFilter(filter, type)


    return { item }
  }
}