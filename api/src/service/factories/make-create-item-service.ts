import { PrismaInventoryRepository } from "../../repositories/prisma/prisma-inventory-repository"
import { CreateItem } from "../create-item"

export function MakeCreateItemService() {
  const inventoryRepository = new PrismaInventoryRepository()
  const createItemService = new CreateItem(inventoryRepository)

  return createItemService
}