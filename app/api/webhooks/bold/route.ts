import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawStatus = body?.type || body?.payment?.status || body?.event_type || 'DESCONOCIDO';
    const paymentStatus = String(rawStatus).toUpperCase();

    if (paymentStatus.includes('APPROVE')) {
      const paymentData = body?.data || body?.payment || {};
      const orderId = paymentData?.metadata?.reference || body?.subject || paymentData?.reference || body?.id;

      if (orderId) {
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: {
            items: {
              include: { product: true }
            }
          }
        });

        if (order && order.status !== 'PAID') {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID' }
          });

          const productsHtml = order.items.map(item =>
            `<li>${item.quantity}x ${item.product.name} - $${(item.price * item.quantity).toLocaleString('es-CO')}</li>`
          ).join('');

          await resend.emails.send({
            from: 'ventas@insumos360.com',
            to: process.env.EMAIL_RECEIVER as string,
            subject: `🛒 NUEVO PEDIDO PAGADO: ${order.customerName}`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #111; padding: 20px;">
                <h2 style="color: #2E7D32;">✅ ¡Tienes un nuevo pedido pagado!</h2>
                <p>El pago de la orden <strong>${order.id}</strong> fue aprobado.</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px;">
                  <h3>Datos de Envío:</h3>
                  <p><strong>Cliente:</strong> ${order.customerName}</p>
                  <p><strong>Cédula:</strong> ${order.document}</p>
                  <p><strong>Teléfono:</strong> ${order.customerPhone}</p>
                  <p><strong>Email:</strong> ${order.customerEmail}</p>
                  <p><strong>Dirección:</strong> ${order.address}</p>
                </div>
                <div style="margin-top: 20px;">
                  <h3>Productos a Despachar:</h3>
                  <ul>${productsHtml}</ul>
                  <h3 style="color: #D4AF37;">Total Pagado: $${order.total.toLocaleString('es-CO')} COP</h3>
                </div>
              </div>
            `
          });

          let customerEmailToUse = order.customerEmail;
          if (customerEmailToUse.includes('XXX') && paymentData?.payer_email && !paymentData?.payer_email.includes('XXX')) {
            customerEmailToUse = paymentData.payer_email;
          }

          if (customerEmailToUse && !customerEmailToUse.includes('XXX')) {
            await resend.emails.send({
              from: 'ventas@insumos360.com',
              to: customerEmailToUse,
              subject: '¡Pago Confirmado! Tu pedido en Comfort 360',
              html: `
                <div style="font-family: Arial, sans-serif; color: #0A192F; padding: 20px;">
                  <h2 style="color: #D4AF37;">¡Gracias por tu compra, ${order.customerName}!</h2>
                  <p>Hemos recibido la confirmación de tu pago de forma exitosa.</p>
                  <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <p><strong>Referencia de Pedido:</strong> ${order.id}</p>
                    <p><strong>Total Pagado:</strong> $${order.total.toLocaleString('es-CO')} COP</p>
                    <p><strong>Dirección de entrega:</strong> ${order.address}</p>
                  </div>
                  <div style="margin-top: 20px;">
                    <h3>Resumen de tu compra:</h3>
                    <ul>${productsHtml}</ul>
                  </div>
                  <p style="margin-top: 20px;">En breve comenzaremos a preparar tu pedido para el envío. Te notificaremos cuando vaya en camino.</p>
                </div>
              `
            });
          }
        }
      }
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}