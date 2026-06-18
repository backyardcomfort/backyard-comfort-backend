import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '20');

    const where = category ? { category, isActive: true } : { isActive: true };

    const products = await prisma.product.findMany({
      where,
      skip,
      take,
      select: {
        id: true,
        sku: true,
        name: true,
        slug: true,
        description: true,
        price: true,
        salePrice: true,
        images: true,
        thumbnail: true,
        rating: true,
        reviewCount: true,
        category: true,
        isFeatured: true,
      },
    });

    const total = await prisma.product.count({ where });

    return NextResponse.json({
      success: true,
      data: products,
      pagination: { skip, take, total },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // TODO: Add auth middleware to verify admin
    const body = await request.json();
    const { sku, name, slug, description, category, price, cost, stock } = body;

    const product = await prisma.product.create({
      data: {
        sku,
        name,
        slug,
        description,
        category,
        price: parseFloat(price),
        cost: parseFloat(cost),
        stock,
      },
    });

    return NextResponse.json(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
