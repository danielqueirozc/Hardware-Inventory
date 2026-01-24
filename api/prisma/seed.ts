import { prisma } from '../src/lib/prisma';

type FilterType = "Lab_Línguas" | "Lab_Informática" | "Lab_Hardware";
type ItemType = "Component" | "Computer" | "Notebook" | "Materials" | "Cables";

interface ItemData {
  code: string;
  name: string;
  amount: number;
  type: ItemType;
  filters: FilterType[];
}

async function main() {
  console.log('Start seeding...');

  // Apagar todos os dados da tabela items
  console.log('Deleting all items...');
  const deleteResult = await prisma.item.deleteMany({});
  console.log(`${deleteResult.count} items deleted.`);

  // Itens reais organizados por tipo
  const items: ItemData[] = [
    // Componentes - podem estar em múltiplos labs
    { code: 'COMP-001', name: 'Memória RAM DDR4 8GB Kingston', amount: 25, type: 'Component', filters: ['Lab_Informática', 'Lab_Hardware'] },
    { code: 'COMP-002', name: 'SSD 240GB SATA III', amount: 15, type: 'Component', filters: ['Lab_Informática', 'Lab_Hardware'] },
    { code: 'COMP-003', name: 'Processador Intel Core i5-10400', amount: 8, type: 'Component', filters: ['Lab_Hardware'] },
    { code: 'COMP-004', name: 'Placa-mãe Asus H410M-E', amount: 10, type: 'Component', filters: ['Lab_Hardware'] },
    { code: 'COMP-005', name: 'Fonte ATX 500W Real', amount: 12, type: 'Component', filters: ['Lab_Informática', 'Lab_Hardware'] },
    { code: 'COMP-006', name: 'Cooler para CPU Universal', amount: 20, type: 'Component', filters: ['Lab_Hardware'] },
    { code: 'COMP-007', name: 'HD 1TB SATA III', amount: 18, type: 'Component', filters: ['Lab_Informática', 'Lab_Hardware'] },
    { code: 'COMP-008', name: 'Placa de Vídeo GTX 1650 4GB', amount: 6, type: 'Component', filters: ['Lab_Informática', 'Lab_Hardware'] },

    // Computadores - podem estar em todos os labs
    { code: 'PC-001', name: 'Desktop Dell OptiPlex 3080', amount: 30, type: 'Computer', filters: ['Lab_Informática', 'Lab_Línguas'] },
    { code: 'PC-002', name: 'Desktop Lenovo ThinkCentre M720', amount: 25, type: 'Computer', filters: ['Lab_Informática', 'Lab_Línguas'] },
    { code: 'PC-003', name: 'Desktop HP ProDesk 400 G6', amount: 20, type: 'Computer', filters: ['Lab_Informática'] },
    { code: 'PC-004', name: 'Workstation Dell Precision 3640', amount: 8, type: 'Computer', filters: ['Lab_Hardware', 'Lab_Informática'] },
    { code: 'PC-005', name: 'Desktop Positivo Master D550', amount: 15, type: 'Computer', filters: ['Lab_Línguas'] },

    // Notebooks - móveis, podem ser usados em qualquer lab
    { code: 'NB-001', name: 'Notebook Dell Inspiron 15 3000', amount: 12, type: 'Notebook', filters: ['Lab_Informática', 'Lab_Línguas', 'Lab_Hardware'] },
    { code: 'NB-002', name: 'Notebook Lenovo IdeaPad S145', amount: 10, type: 'Notebook', filters: ['Lab_Informática', 'Lab_Línguas'] },
    { code: 'NB-003', name: 'Notebook HP 246 G7', amount: 8, type: 'Notebook', filters: ['Lab_Informática', 'Lab_Línguas'] },
    { code: 'NB-004', name: 'Notebook Asus VivoBook X515', amount: 6, type: 'Notebook', filters: ['Lab_Informática'] },

    // Materiais - compartilhados entre labs
    { code: 'MAT-001', name: 'Mouse USB Logitech M90', amount: 50, type: 'Materials', filters: ['Lab_Informática', 'Lab_Línguas', 'Lab_Hardware'] },
    { code: 'MAT-002', name: 'Teclado USB ABNT2 Multilaser', amount: 50, type: 'Materials', filters: ['Lab_Informática', 'Lab_Línguas', 'Lab_Hardware'] },
    { code: 'MAT-003', name: 'Monitor LED 21.5" LG', amount: 35, type: 'Materials', filters: ['Lab_Informática', 'Lab_Línguas'] },
    { code: 'MAT-004', name: 'Headset com Microfone USB', amount: 40, type: 'Materials', filters: ['Lab_Línguas', 'Lab_Informática'] },
    { code: 'MAT-005', name: 'Webcam HD 720p Logitech C270', amount: 20, type: 'Materials', filters: ['Lab_Línguas', 'Lab_Informática'] },
    { code: 'MAT-006', name: 'Mousepad Básico', amount: 60, type: 'Materials', filters: ['Lab_Informática', 'Lab_Línguas', 'Lab_Hardware'] },
    { code: 'MAT-007', name: 'Caixa de Som USB 2.0', amount: 25, type: 'Materials', filters: ['Lab_Línguas', 'Lab_Informática'] },
    { code: 'MAT-008', name: 'Kit Ferramentas para Manutenção', amount: 10, type: 'Materials', filters: ['Lab_Hardware'] },
    { code: 'MAT-009', name: 'Multímetro Digital', amount: 5, type: 'Materials', filters: ['Lab_Hardware'] },
    { code: 'MAT-010', name: 'Pulseira Antiestática', amount: 15, type: 'Materials', filters: ['Lab_Hardware'] },

    // Cabos - usados em todos os labs
    { code: 'CAB-001', name: 'Cabo HDMI 1.5m', amount: 40, type: 'Cables', filters: ['Lab_Informática', 'Lab_Línguas', 'Lab_Hardware'] },
    { code: 'CAB-002', name: 'Cabo VGA 1.8m', amount: 30, type: 'Cables', filters: ['Lab_Informática', 'Lab_Línguas'] },
    { code: 'CAB-003', name: 'Cabo USB 2.0 A-B (Impressora)', amount: 25, type: 'Cables', filters: ['Lab_Informática', 'Lab_Línguas'] },
    { code: 'CAB-004', name: 'Cabo de Rede Cat6 3m', amount: 50, type: 'Cables', filters: ['Lab_Informática', 'Lab_Línguas', 'Lab_Hardware'] },
    { code: 'CAB-005', name: 'Cabo de Força Padrão NBR', amount: 60, type: 'Cables', filters: ['Lab_Informática', 'Lab_Línguas', 'Lab_Hardware'] },
    { code: 'CAB-006', name: 'Cabo DisplayPort 1.8m', amount: 15, type: 'Cables', filters: ['Lab_Informática', 'Lab_Hardware'] },
    { code: 'CAB-007', name: 'Cabo SATA III 50cm', amount: 35, type: 'Cables', filters: ['Lab_Hardware'] },
    { code: 'CAB-008', name: 'Cabo USB-C para USB-A', amount: 20, type: 'Cables', filters: ['Lab_Informática', 'Lab_Línguas'] },
    { code: 'CAB-009', name: 'Cabo P2 Auxiliar 1.5m', amount: 30, type: 'Cables', filters: ['Lab_Línguas', 'Lab_Informática'] },
    { code: 'CAB-010', name: 'Adaptador DVI para HDMI', amount: 12, type: 'Cables', filters: ['Lab_Informática', 'Lab_Hardware'] },
  ];

  console.log(`Creating ${items.length} items...`);

  for (const item of items) {
    await prisma.item.create({
      data: {
        code: item.code,
        name: item.name,
        amount: item.amount,
        type: item.type,
        filters: item.filters,
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