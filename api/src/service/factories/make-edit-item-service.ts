import { PrismaInventoryRepository } from "../../repositories/prisma/prisma-inventory-repository";
import { EditItem } from "../edit-item";
import { GetItemByTypeService } from "../get-items-by-type";

export function makeEditItemService() {
  const inventoryRepository = new PrismaInventoryRepository()
  const editItem = new EditItem(inventoryRepository)

  return editItem
}