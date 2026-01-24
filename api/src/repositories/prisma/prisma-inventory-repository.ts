import type { Item, ItemType, Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import type { EditItemInput, GetItemsQuantityResponse, InventoryRepository } from "../inventory-repository";

export class PrismaInventoryRepository implements InventoryRepository {
  async create(data: Prisma.ItemCreateInput): Promise<Item> {
    const item = await prisma.item.create({
      data
    })

    return item
  }

  async getItemsByType(type: ItemType): Promise<Item[]> {
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

      // console.log(overview)

      return {
        Component: overview.Component || 0,
        Computer: overview.Computer || 0,
        Notebook: overview.Notebook || 0,
        Materials: overview.Materials || 0,
        Cables: overview.Cables || 0
      }

    } catch (error) {
        console.error('Erro no repository getItemsQuantity:', error)
        throw new Error('Erro ao buscar quantidade de itens')
      }
  }

  async deleteItem(id: string): Promise<void> {
    const item  = await prisma.item.delete({
      where: { id }
    })
  }

  async editItem({ id, name, amount, filters }: EditItemInput): Promise<Item> {
    const item = await prisma.item.update({
      where: { id },
      data: {
        name,
        amount,
        filters: { set: filters } // set: no Prisma, para campos de array (enum array), você precisa usar a sintaxe set:
      }
    })

    return item
  }
}
