import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headers = req.headers;
    const receivedSignature = headers.get('x-bold-signature');
    
    const secretKey = process.env.NODE_ENV === 'production' ? process.env.BOLD_WEBHOOK_SECRET || '' : '';
    const encodedBody = Buffer.from(rawBody).toString('base64');
    const hashed = crypto.createHmac('sha256', secretKey).update(encodedBody).digest('hex');

    if (receivedSignature && !crypto.timingSafeEqual(Buffer.from(hashed), Buffer.from(receivedSignature))) {
       return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const body = JSON.parse(rawBody);
    const paymentData = body.data;
    const paymentStatus = body.type;
    const orderId = paymentData?.metadata?.reference;

    if (paymentStatus === 'SALE_APPROVED' && orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } } }
      });

      if (order && order.status !== 'PAID') {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'PAID' }
        });

        const productsHtml = order.items.map(item =>
          `<li>${item.quantity}x ${item.product.name} - $${(item.price * item.quantity).toLocaleString('es-CO')}</li>`
        ).join('');

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #2E7D32;">Pago Confirmado</h2>
            <p>Orden: <strong>${order.id}</strong></p>
            <p>Cliente: ${order.customerName}</p>
            <p>Dirección: ${order.address}</p>
            <p>Total: $${order.total.toLocaleString('es-CO')} COP</p>
            <h3>Productos:</h3>
            <ul>${productsHtml}</ul>
          </div>
        `;

        await resend.emails.send({
          from: 'ventas@insumos360.com',
          to: [order.customerEmail, process.env.EMAIL_RECEIVER as string].filter(Boolean) as string[],
          subject: `Pedido Pagado #${order.id} - Comfort 360`,
          html: emailHtml
        });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}