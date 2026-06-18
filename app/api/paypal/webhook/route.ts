import { NextResponse } from 'next/server';
import { verifyPayPalWebhookSignature } from '@/lib/paypal';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const webhookId = process.env.PAYPAL_WEBHOOK_ID;
    
    // Store webhook event for audit
    const webhookEvent = await prisma.webhookEvent.create({
      data: {
        provider: 'paypal',
        eventType: body.event_type,
        externalId: body.id,
        payload: JSON.stringify(body),
        processed: false,
      },
    });

    // Handle different PayPal events
    switch (body.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        const orderId = body.resource?.supplementary_data?.related_ids?.order_id;
        if (orderId) {
          await prisma.paypalTransaction.updateMany({
            where: { paypalOrderId: orderId },
            data: {
              status: 'completed',
              paypalTransactionId: body.resource?.id,
              verifiedAt: new Date(),
              webhookData: JSON.stringify(body),
            },
          });
        }
        break;

      case 'PAYMENT.CAPTURE.REFUNDED':
        // Handle refund
        const refundOrderId = body.resource?.supplementary_data?.related_ids?.order_id;
        if (refundOrderId) {
          await prisma.refund.create({
            data: {
              orderId: refundOrderId,
              amount: parseFloat(body.resource?.amount?.value),
              reason: 'Customer requested refund',
              status: 'completed',
              paypalRefundId: body.resource?.id,
            },
          });
        }
        break;
    }

    // Mark webhook as processed
    await prisma.webhookEvent.update({
      where: { id: webhookEvent.id },
      data: { processed: true, processedAt: new Date() },
    });

    return NextResponse.json(
      { success: true, message: 'Webhook processed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing PayPal webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
