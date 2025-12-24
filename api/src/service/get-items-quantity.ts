import type { InventoryRepository } from "../repositories/inventory-repository"

interface GetItemsQuantityResponse {
  Component: number
  Computer: number
  Notebook: number
  Materials: number
  Cables: number
}

export class GetItemsQuantity {
  constructor(private inventoryRepository: InventoryRepository) {}

  async execute(): Promise<GetItemsQuantityResponse> {
    const overview = await this.inventoryRepository.getItemsQuantity()

    return overview
  }

}