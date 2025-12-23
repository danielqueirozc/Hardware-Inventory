import {it, describe, expect, beforeEach}  from 'vitest'
import { CreateItemService } from './create-item'
import { InMemoryInventoryRepository } from '../repositories/in-memory/in-memory-inventory-repository'
import { generateCode } from '../utils/code-generator'

let inventoryRepository: InMemoryInventoryRepository
let sut: CreateItemService

describe('CreateItem Service', () => {
    beforeEach(() => {
      inventoryRepository = new InMemoryInventoryRepository()
      sut = new CreateItemService(inventoryRepository)
    })

    it('should be able to create new item', async () => {
      const code = generateCode()

      const { item } = await sut.execute({
        name: 'RTX 5070',
        amount: 50,
        code: code, 
        type: 'Component',
        filter: 'Lab_Informática'
      })

      expect(item.id).toEqual('item-1')
    })
})