import { prisma } from './lib/prisma'

async function testDatabase() {
  try {
    console.log('Testando conexão com o banco de dados...')

    // Testa a conexão
    await prisma.$connect()
    console.log('✓ Conexão estabelecida com sucesso!')

    // Testa a query de items
    console.log('\nTestando query de items...')
    const items = await prisma.item.findMany()
    console.log(`✓ Encontrados ${items.length} items no banco`)

    // Testa o groupBy
    console.log('\nTestando groupBy...')
    const itemsByType = await prisma.item.groupBy({
      by: ['type'],
      _count: {
        id: true
      }
    })
    console.log('✓ GroupBy executado com sucesso:')
    console.log(itemsByType)

  } catch (error) {
    console.error('✗ Erro ao testar banco de dados:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabase()
