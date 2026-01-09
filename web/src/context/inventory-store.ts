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
  code: string
  name: string
  filter: ItemFilterType
}

interface InventoryStoreType {
  itemsByType: ItemProps[] | []
  itemsQuantity: ItemsQuantityType | null

  getItemsQuantity: () => Promise<ItemsQuantityType>
  getItemsByType: (type: ItemType) => Promise<ItemProps[] | []>
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
    } 
  }),
)
