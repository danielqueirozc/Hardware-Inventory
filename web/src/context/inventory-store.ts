import { inventoryService } from "@/lib/axios";
import { create } from "zustand";

interface ItemsQuantityType {
  Component: number
  Computer: number
  Notebook: number
  Materials: number
  Cables: number
}

interface InventoryStoreType {
  itemsByType: number
  itemsQuantity: ItemsQuantityType | null

  getItemsQuantity: () => Promise<ItemsQuantityType>
}

export const useInventoryStore = create<InventoryStoreType>()(
  (set) => ({
    itemsByType: 0,
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
    }
  }),
)
