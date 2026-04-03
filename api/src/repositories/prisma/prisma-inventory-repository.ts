import type { Filter, Item, ItemType, Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import type { EditItemInput, GetItemsQuantityResponse, InventoryRepository } from "../inventory-repository";
export class PrismaInventoryRepository implements InventoryRepository {
  async create(data: Prisma.ItemCreateInput): Promise<Item> {
    const item = await prisma.item.create({
      data
    })

    return item
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
  
  async getItemsByType(type: ItemType): Promise<Item[]> {
    const items = await prisma.item.findMany({
      where: { type }
    })

    return items
  }

  async getItemsByFilter(filter: Filter[], type: ItemType): Promise<Item[]> {
    console.log('esse e o resultado do prisma',filter)

    const items = await prisma.item.findMany({
      where: { type, filters: { hasSome: filter } }
    })

    return items
  }

  async searchItem(q: string, type?: ItemType): Promise<Item[]> {

      const result = await prisma.item.findMany({
        where: { name: { contains: q, mode: 'insensitive' }, ...(type && { type }) }
      })
  
      return result
  }

  async deleteItem(id: string): Promise<void> {
    const item  = await prisma.item.delete({
      where: { id }
    })
  }

  async editItem({ id, name, amount, filter }: EditItemInput): Promise<Item> {
    const item = await prisma.item.update({
      where: { id },
      data: {
        name,
        amount,
        filters: { set: filter } // set: no Prisma, para campos de array (enum array), você precisa usar a sintaxe set:
      }
    })

    return item
  }
}
