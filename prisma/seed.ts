import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const categories = [
    { name: 'Van Life Essentials', slug: 'van-life-essentials' },
    { name: 'Backyard Comfort', slug: 'backyard-comfort' },
    { name: 'Outdoor Lighting', slug: 'outdoor-lighting' },
    { name: 'Storage & Utility', slug: 'storage-utility' },
    { name: 'Camping', slug: 'camping' },
    { name: 'Off Grid Living', slug: 'off-grid-living' },
    { name: 'Outdoor Cooking', slug: 'outdoor-cooking' },
    { name: 'Preparedness', slug: 'preparedness' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  // Create sample products
  const products = [
    {
      sku: 'BC-001',
      name: 'Premium Solar Panel 100W',
      slug: 'premium-solar-panel-100w',
      description: 'High-efficiency solar panel perfect for off-grid living',
      category: 'Off Grid Living',
      price: '299.99',
      cost: '150.00',
      stock: 50,
      isActive: true,
      isFeatured: true,
      tags: ['solar', 'renewable', 'off-grid'],
    },
    {
      sku: 'BC-002',
      name: 'Portable Camping Stove',
      slug: 'portable-camping-stove',
      description: 'Compact and efficient camping stove for outdoor cooking',
      category: 'Camping',
      price: '79.99',
      cost: '35.00',
      stock: 100,
      isActive: true,
      isFeatured: true,
      tags: ['camping', 'cooking', 'portable'],
    },
    {
      sku: 'BC-003',
      name: 'LED String Lights 50ft',
      slug: 'led-string-lights-50ft',
      description: 'Weather-resistant LED string lights for outdoor ambiance',
      category: 'Outdoor Lighting',
      price: '49.99',
      cost: '20.00',
      stock: 150,
      isActive: true,
      isFeatured: false,
      tags: ['lighting', 'outdoor', 'decorative'],
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { sku: product.sku },
      update: {},
      create: {
        ...product,
        price: parseFloat(product.price),
        cost: parseFloat(product.cost),
      },
    });
  }

  console.log('✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
