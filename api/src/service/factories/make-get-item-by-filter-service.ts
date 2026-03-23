import { PrismaInventoryRepository } from "../../repositories/prisma/prisma-inventory-repository";
import { GetItemByFilter } from  '../get-item-by-filter'

export function makeGetItemByFilter() {
  const inventoryRepository = new PrismaInventoryRepository()
  const getItemByFilterService = new GetItemByFilter(inventoryRepository)

  return getItemByFilterService
}