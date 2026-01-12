import type { ItemType, ItemFilterType } from "@/@types";
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
  filter: ItemFilterType
}

interface InventoryStoreType {
  itemsByType: ItemProps[] | []
  itemsQuantity: ItemsQuantityType | null

  getItemsQuantity: () => Promise<ItemsQuantityType>
  getItemsByType: (type: ItemType) => Promise<ItemProps[] | []>
  deleteItem: (id: string) => Promise<void>
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
       console.log(response)

        set({ itemsQuantity: response })

        return response

     } catch (error) {
        throw error
     }
    },

    getItemsByType: async (type: ItemType) => {
      try {
        console.log('fetching items by type:', type)
        const response = await inventoryService.getItemsByType(type)

        console.log('items by type response:', response)

        set({ itemsByType: response })

        return response
      } catch (error) {
        throw error
      }
    },
    deleteItem: async (id: string) => {
      try {
        await inventoryService.deleteItem(id)

        set(state => ({
          itemsByType: state.itemsByType.filter(item => item.id !== id)
        }))
        
      } catch (error) {
        console.error('Error deleting item:', error)
        throw error
      }
    }
  }),
)
