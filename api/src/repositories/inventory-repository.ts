import type { Item, ItemType, Prisma } from "../generated/prisma/client";

export interface InventoryRepository {
  create(data: Prisma.ItemCreateInput): Promise<Item>
  getByType(type: ItemType): Promise<Item[]>
}