import type { ItemType, ItemFilterType, EditItemType, CreateItemType } from "@/@types";
import { inventoryService } from "@/lib/axios";
import { create } from "zustand";

interface ItemsQuantityType {
  Component: number
  Computer: number
  Notebook: number
  Materials: number
  Cables: number
}

interface ItemProps {
  type: ItemType
  amount: number
  id: string
  code: string
  name: string
  filters: ItemFilterType[]
}

interface InventoryStoreType {
  itemsByType: ItemProps[] | []
  itemsQuantity: ItemsQuantityType | null

  getItemsQuantity: () => Promise<ItemsQuantityType>
  getItemsByType: (type: ItemType) => Promise<ItemProps[] | []>
  getItemsByFilter: (filter: any, type: ItemType) => Promise<ItemProps[] | []>
  searchItem: (search: string, type: ItemType) => Promise<ItemProps[] | []>
  deleteItem: (id: string) => Promise<void>
  editItem: ({ id, name, amount, filters }: EditItemType) => Promise<void>
  createItem: ({ name, amount, type, filters }: CreateItemType) => Promise<void>
}

export const useInventoryStore = create<InventoryStoreType>()(
  (set) => ({
    itemsByType: [],
    itemsQuantity: {
      Component: 0,
      Computer: 0,
      Notebook: 0,
      Materials: 0,
      Cables: 0
    },

    getItemsQuantity: async () => {
     try {
       const response = await inventoryService.getItemsQuantity()

        set({ itemsQuantity: response })

        return response

     } catch (error) {
        throw error
     }
    },
    getItemsByType: async (type: ItemType) => {
      try {
        const response = await inventoryService.getItemsByType(type)


        set({ itemsByType: response })

        return response
      } catch (error) {
        throw error
      }
    },
    getItemsByFilter: async (filter: any, type: ItemType) => {
      try {
        const response = await inventoryService.getItemsByFilter(filter, type)


        set({ itemsByType: response.items })

        return response
      } catch (error) {
        throw error
      }
    },
    searchItem: async (search: string, type: ItemType) => {
      try {
        const response = await inventoryService.searchItem(search, type)


        set({ itemsByType: response.items })
        return response.items

      } catch {
        throw new Error
      }
    },
    deleteItem: async (id: string) => {
      try {
        await inventoryService.deleteItem(id)

        set(state => ({
          // mantém todos os itens cujo id é diferente do id que quero remover
          itemsByType: state.itemsByType.filter(item => item.id !== id)
        }))
        
      } catch (error) {
        console.error('Error deleting item:', error)
        throw error
      }
    },
    editItem: async ({ id, name, amount, filters }: EditItemType) => {
      try {
        const response = await inventoryService.editItem({ id, name, amount, filters })

        set(state => ({
          itemsByType: state.itemsByType.map(item =>
            item.id === id ? { ... item, ... response } : item
          )
        }))

      } catch (error) {
          console.error(error)  
        throw error
      }
    },
    createItem: async ({ name, amount, type, filters }: CreateItemType) => {
      try {
        
        const response = await inventoryService.createItem({ name, amount, type, filters })



        set(state => ({
          itemsByType: [...state.itemsByType, response.item]
        }))
      } catch (error) {
        throw error
      }
    },
  }), 
)
