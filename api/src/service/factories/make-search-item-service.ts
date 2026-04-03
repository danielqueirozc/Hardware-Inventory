import { PrismaInventoryRepository } from "../../repositories/prisma/prisma-inventory-repository";
import { SearchItem } from "../search-item";

export function makeSearchItemService() {
  const inventoryRepository = new PrismaInventoryRepository()
  const searchItem = new SearchItem(inventoryRepository)

  return searchItem
}