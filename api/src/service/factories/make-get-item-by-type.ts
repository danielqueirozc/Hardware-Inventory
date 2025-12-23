import { PrismaInventoryRepository } from "../../repositories/prisma/prisma-inventory-repository";
import { GetItemByTypeService } from "../get-item-by-type";

export function makeGetItemByTypeService() {
  const inventoryRepository = new PrismaInventoryRepository()
  const getItemByType = new GetItemByTypeService(inventoryRepository)

  return getItemByType
}