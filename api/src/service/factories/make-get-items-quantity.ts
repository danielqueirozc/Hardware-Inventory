import { PrismaInventoryRepository } from "../../repositories/prisma/prisma-inventory-repository";
import { GetItemsQuantity } from "../get-items-quantity";

export function makeGetItemsQuantityService() {
  const inventoryRepository = new PrismaInventoryRepository()
  const getItemsQuantity = new GetItemsQuantity(inventoryRepository)

  return getItemsQuantity
}