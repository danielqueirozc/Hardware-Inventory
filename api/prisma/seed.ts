import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Start seeding...');

  // Using string arrays to avoid enum import issues
  const itemTypeValues = ['Component', 'Computer', 'Notebook', 'Materials', 'Cables'];
  const filterValues = ['Lab_Línguas', 'Lab_Informática', 'Lab_Hardware'];

  for (let i = 0; i < 100; i++) {
    const randomItemType = itemTypeValues[Math.floor(Math.random() * itemTypeValues.length)] as "Component" | "Computer" | "Notebook" | "Materials" | "Cables";
    const randomFilter = filterValues[Math.floor(Math.random() * filterValues.length)] as "Lab_Línguas" | "Lab_Informática" | "Lab_Hardware";

    await prisma.item.upsert({
      where: { code: `ITEM-${i.toString().padStart(3, '0')}` },
      update: {
        name: `Item Name ${i}`,
        amount: Math.floor(Math.random() * 100) + 1,
        type: randomItemType,
        filter: randomFilter,
      },
      create: {
        code: `ITEM-${i.toString().padStart(3, '0')}`,
        name: `Item Name ${i}`,
        amount: Math.floor(Math.random() * 100) + 1,
        type: randomItemType,
        filter: randomFilter,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });