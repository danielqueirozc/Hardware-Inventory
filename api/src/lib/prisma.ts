import "dotenv/config"
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

if (!connectionString || connectionString === 'undefined') {
  console.error('DATABASE_URL não está definida no arquivo .env')
  throw new Error('DATABASE_URL não está definida')
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({
  adapter,
  log: ['query', 'error', 'warn']
})

export { prisma }