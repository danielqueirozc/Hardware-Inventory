import type { Item, ItemType, Prisma } from "../generated/prisma/client";

export interface GetItemsQuantityResponse {
  Component: number
  Computer: number
  Notebook: number
  Materials: number
  Cables: number
}

export interface InventoryRepository {
  create(data: Prisma.ItemCreateInput): Promise<Item>
  getItemsQuantity(): Promise<GetItemsQuantityResponse>
  getItemsByType(type: ItemType): Promise<Item[]>
}