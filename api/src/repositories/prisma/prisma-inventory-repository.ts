import type { Item, ItemType, Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import type { GetItemsQuantityResponse, InventoryRepository } from "../inventory-repository";

export class PrismaInventoryRepository implements InventoryRepository {
  async create(data: Prisma.ItemCreateInput): Promise<Item> {
    const item = await prisma.item.create({
      data
    })

    return item
  }

  async getByType(type: ItemType): Promise<Item[]> {
    const items = await prisma.item.findMany({
      where: { type }
    })

    return items
  }

  async getItemsQuantity(): Promise<GetItemsQuantityResponse> {
    try {
      const itemsByType = await prisma.item.groupBy({
        by: ['type'],
        _count: {
          id: true
        }
      })

     const overview = itemsByType.reduce<Record<ItemType, number>>((acc, item) => {
        acc[item.type] = item._count.id // acc[] = atribuindo a prop type no objeto que esta vazio de inicio, ex: component / = item._count.id esta atribuindo o valor da contagem
        return acc
      }, {} as Record<ItemType, number>) // Tipagem no valor inicial

      return overview

    } catch (error) {
        throw new Error('Erro ao buscacar quantidade de itens')
      }
    }
}
