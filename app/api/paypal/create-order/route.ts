import { NextResponse } from 'next/server';
import { createPayPalOrder, capturePayPalOrder } from '@/lib/paypal';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, amount, currency } = body;

    if (!orderId || !amount) {
      return NextResponse.json(
        { success: false, error: 'orderId and amount required' },
        { status: 400 }
      );
    }

    const paypalOrder = await createPayPalOrder({
      orderId,
      amount,
      currency: currency || 'USD',
    });

    // Store PayPal order reference
    await prisma.paypalTransaction.create({
      data: {
        orderId,
        paypalOrderId: paypalOrder.id,
        status: 'pending',
        amount,
        currency: currency || 'USD',
        payer: '{}',
        details: JSON.stringify(paypalOrder),
      },
    });

    return NextResponse.json({
      success: true,
      data: paypalOrder,
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}
