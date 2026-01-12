import { PrismaInventoryRepository } from "../../repositories/prisma/prisma-inventory-repository";
import { DeleteItem } from "../delete-item";

export function makeDeleteItemService() {
  const inventoryRepository = new PrismaInventoryRepository()
  const deleteItem = new DeleteItem(inventoryRepository)

  return deleteItem
}