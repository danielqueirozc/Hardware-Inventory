import type { Item, Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import type { InventoryRepository } from "../inventory-repository";

export class PrismaInventoryRepository implements InventoryRepository {
  async create(data: Prisma.ItemCreateInput): Promise<Item> {
    const item = await prisma.item.create({
      data
    })

    return item
  }
}
