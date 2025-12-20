import type { Item, Prisma } from "../generated/prisma/client";

export interface InventoryRepository {
  create(data: Prisma.ItemCreateInput): Promise<Item>
}