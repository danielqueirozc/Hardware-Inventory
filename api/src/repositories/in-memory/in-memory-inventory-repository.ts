import type { Item, Prisma, User } from "../../generated/prisma/client";
import { generateCode } from "../../utils/code-generator";
import type { InventoryRepository } from "../inventory-repository";

export class InMemoryInventoryRepository implements InventoryRepository {
  public items: Item[] = []

  async create(data: Prisma.ItemCreateInput): Promise<Item> {
    const code = generateCode()

    const item = {
      id: 'item-1',
      name: data.name,
      amount: data.amount,
      code: code,
      type: data.type,
      filter: data.filter,
    }

    this.items.push(item)

    return item
  }

}