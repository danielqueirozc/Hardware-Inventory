import type { Item, ItemType, Prisma, Filter } from "../generated/prisma/client";

export interface GetItemsQuantityResponse {
  Component: number
  Computer: number
  Notebook: number
  Materials: number
  Cables: number
}

export interface EditItemInput {
  id: string
  name: string
  amount: number
  filters: Filter[]
}

export interface InventoryRepository {
  create(data: Prisma.ItemCreateInput): Promise<Item>
  getItemsQuantity(): Promise<GetItemsQuantityResponse>
  getItemsByType(type: ItemType): Promise<Item[]>
  deleteItem(id: string): Promise<void>
  editItem(data: EditItemInput): Promise<Item> // nao coloquei Prisma.ItemUpdateInput tem uma estrutura diferente para arrays de enums. A tipagem espera { set: [...] } na propriedade, mas você está recebendo um array simples.
}