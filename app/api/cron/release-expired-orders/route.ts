import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

// NOTE: only orders created after the stock-reservation-at-checkout deploy ever
// had their stock decremented at order-creation time (see app/api/checkout/route.ts).
// Any PENDING order created BEFORE that deploy never reserved stock, so releasing
// it here would incorrectly ADD stock to products that never lost it. Before
// enabling this cron in production, check for legacy PENDING orders
// (`SELECT * FROM Order WHERE status = 'PENDING'`) predating the deploy and either
// resolve them manually or raise EXPIRATION_CUTOFF_DATE below to exclude them.
const EXPIRATION_CUTOFF_DATE: Date | null = null;

const EXPIRATION_MINUTES = Number(process.env.ORDER_EXPIRATION_MINUTES) || 30;

export async function GET(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const receivedSecret = req.headers.get('x-cron-secret');

  if (!cronSecret || !receivedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const expectedBuffer = Buffer.from(cronSecret);
  const receivedBuffer = Buffer.from(receivedSecret);

  if (
    expectedBuffer.length !== receivedBuffer.length ||
    !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const cutoff = new Date(Date.now() - EXPIRATION_MINUTES * 60 * 1000);

    const expiredOrders = await prisma.order.findMany({
      where: {
        status: 'PENDING',
        createdAt: {
          lt: cutoff,
          ...(EXPIRATION_CUTOFF_DATE ? { gte: EXPIRATION_CUTOFF_DATE } : {}),
        },
      },
      include: { items: true },
    });

    let expiredCount = 0;
    const restoredProducts: Record<number, number> = {};

    for (const order of expiredOrders) {
      const released = await prisma.$transaction(async (tx) => {
        // Atomic guard: only one concurrent cron run can flip PENDING -> EXPIRED,
        // so the stock restore below runs at most once per order (idempotent).
        const result = await tx.order.updateMany({
          where: { id: order.id, status: 'PENDING' },
          data: { status: 'EXPIRED' },
        });

        if (result.count === 0) return false;

        const quantityByProductId = new Map<number, number>();
        for (const item of order.items) {
          quantityByProductId.set(
            item.productId,
            (quantityByProductId.get(item.productId) || 0) + item.quantity
          );
        }

        for (const [productId, quantity] of quantityByProductId) {
          await tx.product.update({
            where: { id: productId },
            data: { stock: { increment: quantity } },
          });
          restoredProducts[productId] = (restoredProducts[productId] || 0) + quantity;
        }

        return true;
      });

      if (released) expiredCount++;
    }

    console.log(
      `[cron/release-expired-orders] expired ${expiredCount} order(s), restored stock:`,
      restoredProducts
    );

    return NextResponse.json({ expiredCount, restoredProducts });
  } catch (error) {
    console.error('[cron/release-expired-orders] error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
