import { NextResponse } from 'next/server';
import { capturePayPalOrder } from '@/lib/paypal';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paypalOrderId } = body;

    if (!paypalOrderId) {
      return NextResponse.json(
        { success: false, error: 'paypalOrderId required' },
        { status: 400 }
      );
    }

    // Capture payment
    const captureResponse = await capturePayPalOrder(paypalOrderId);

    // Find and update order
    const transaction = await prisma.paypalTransaction.findUnique({
      where: { paypalOrderId },
    });

    if (!transaction) {
      return NextResponse.json(
        { success: false, error: 'PayPal transaction not found' },
        { status: 404 }
      );
    }

    // Update order status
    await prisma.order.update({
      where: { id: transaction.orderId },
      data: {
        status: 'paid',
        paymentStatus: 'completed',
        paidAt: new Date(),
      },
    });

    // Update payment transaction
    await prisma.paypalTransaction.update({
      where: { id: transaction.id },
      data: {
        status: 'completed',
        paypalTransactionId: captureResponse.id,
        verifiedAt: new Date(),
        details: JSON.stringify(captureResponse),
      },
    });

    return NextResponse.json({
      success: true,
      data: captureResponse,
    });
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to capture payment' },
      { status: 500 }
    );
  }
}
