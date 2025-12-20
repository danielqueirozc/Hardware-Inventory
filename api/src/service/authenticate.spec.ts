import {it, describe, expect, beforeEach}  from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { compare, hash } from 'bcryptjs'
import { TokenProvider } from '../@types/token-provider'
import { Authenticate } from './authenticate'

class FakeTokenProvider implements TokenProvider {
  sign(payload: object): string {
    return 'fake-token'
  }
}

let usersRepository: InMemoryUsersRepository
let sut: Authenticate
let tokenProvider: FakeTokenProvider

describe('Authenticate Service', () => {
    beforeEach(() => {
      usersRepository = new InMemoryUsersRepository()
      tokenProvider = new FakeTokenProvider()
      sut = new Authenticate(usersRepository, tokenProvider)
    })

    it('should be able to authenticate', async () => {
      await usersRepository.create({
        name: 'John Doe',
        email: '8B0lT@example.com',
        password_hash: await hash('1234567', 7),
      })

      const { user } = await sut.execute({  
        email: '8B0lT@example.com',
        password: '1234567'
      })

      expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
      await expect(async () => {
        await sut.execute({
          email: '8B0lT@example.com',
          password: '1234567'
        })
      }).rejects.toBeInstanceOf(Error)
    }
  )

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: '8B0lT@example.com',
      password_hash: await hash('1234567', 7),
    })

    await expect(async () => {
      await sut.execute({
        email: '8B0lT@example.com',
        password: '123456'
      })
    }).rejects.toBeInstanceOf(Error)
  
  })
})