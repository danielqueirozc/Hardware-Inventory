import { prisma } from './lib/prisma'

async function testDatabase() {
  try {

    // Testa a conexão
    await prisma.$connect()

    // Testa a query de items
    const items = await prisma.item.findMany()

    // Testa o groupBy
    const itemsByType = await prisma.item.groupBy({
      by: ['type'],
      _count: {
        id: true
      }
    })

  } catch (error) {
    console.error('✗ Erro ao testar banco de dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
