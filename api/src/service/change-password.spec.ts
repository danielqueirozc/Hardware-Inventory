import {it, describe, expect, beforeEach}  from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { RegisterService } from './register'
import { compare } from 'bcryptjs'
import { ChangePasswordService } from './change-password'

let usersRepository: InMemoryUsersRepository
let registerService: RegisterService
let sut: ChangePasswordService

describe('Change password Service', () => {
    beforeEach(() => {
      usersRepository = new InMemoryUsersRepository()
      registerService = new RegisterService(usersRepository)
      sut = new ChangePasswordService(usersRepository)
    })

    it('should be able to change password', async () => {
      await registerService.execute({
        name: 'John Doe',
        email: '8B0lT@example.com',
        password: '1234567'
      })

      const { user } = await sut.execute({
        id: 'user-1',
        newPassword: '1234567'
      })

      const isPasswordDiferent = await compare('12345678', user.password_hash)
          
      expect(isPasswordDiferent).toBe(false)
    })
})