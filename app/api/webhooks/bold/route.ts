import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headers = req.headers;
    const receivedSignature = headers.get('x-bold-signature');

    const secretKey = process.env.BOLD_WEBHOOK_SECRET || '';
    const encodedBody = Buffer.from(rawBody).toString('base64');
    const hashed = crypto.createHmac('sha256', secretKey).update(encodedBody).digest('hex');

    if (receivedSignature) {
      const hashedBuffer = Buffer.from(hashed);
      const signatureBuffer = Buffer.from(receivedSignature);

      if (hashedBuffer.length !== signatureBuffer.length || !crypto.timingSafeEqual(hashedBuffer, signatureBuffer)) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    const body = JSON.parse(rawBody);
    const paymentStatus = body.type;
    const orderId = body.data?.metadata?.reference;

    if (paymentStatus === 'SALE_APPROVED' && orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } } },
      });

      if (order && order.status !== 'PAID') {
        await prisma.$transaction(async (tx) => {
          await tx.order.update({
            where: { id: orderId },
            data: { status: 'PAID', boldPaymentId: body.data?.id || null },
          });

          for (const item of order.items) {
            const product = await tx.product.findUnique({
              where: { id: item.productId },
            });

            if (!product) continue;

            const newStock = Math.max(0, product.stock - item.quantity);

            await tx.product.update({
              where: { id: item.productId },
              data: { stock: newStock },
            });
          }
        });

        const productsHtml = order.items
          .map(
            (item) =>
              `<tr>
                <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${item.product.name}</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${item.color || 'N/A'}</td>
                <td style="padding: 8px 12px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toLocaleString('es-CO')}</td>
              </tr>`
          )
          .join('');

        const customerEmailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 20px 0; border-bottom: 3px solid #D4AF37;">
              <h1 style="color: #0A192F; margin: 0;">Insumos 360 Pro</h1>
            </div>
            <div style="padding: 30px 0;">
              <h2 style="color: #25D366; margin-bottom: 5px;">✓ Pago Confirmado</h2>
              <p>Hola <strong>${order.customerName}</strong>,</p>
              <p>Tu pedido <strong>#${order.id}</strong> ha sido procesado exitosamente.</p>
            </div>
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
              <h3 style="margin-top: 0; color: #0A192F;">Datos de entrega:</h3>
              <p><strong>Dirección:</strong> ${order.address}</p>
              <p><strong>Teléfono:</strong> ${order.customerPhone}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background-color: #0A192F; color: white;">
                  <th style="padding: 10px 12px; text-align: left;">Producto</th>
                  <th style="padding: 10px 12px; text-align: center;">Cant.</th>
                  <th style="padding: 10px 12px; text-align: left;">Color</th>
                  <th style="padding: 10px 12px; text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>${productsHtml}</tbody>
            </table>
            <div style="text-align: right; padding: 15px; background: #0A192F; color: white; border-radius: 8px;">
              <span style="font-size: 20px; font-weight: bold;">Total: $${order.total.toLocaleString('es-CO')} COP</span>
            </div>
            <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
              © ${new Date().getFullYear()} Insumos 360 Pro SAS — Bogotá, Colombia
            </p>
          </div>
        `;

        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0A192F; border-bottom: 3px solid #D4AF37; padding-bottom: 10px;">
              🚀 Nuevo pedido para despacho
            </h2>
            <p><strong>ID de la Orden:</strong> #${order.id}</p>
            <div style="background-color: #fbf7e7; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #d4af37;">
              <h3 style="margin-top: 0; color: #0A192F;">Datos del cliente:</h3>
              <p><strong>Nombre:</strong> ${order.customerName}</p>
              <p><strong>Documento:</strong> ${order.document}</p>
              <p><strong>Email:</strong> ${order.customerEmail}</p>
              <p><strong>Teléfono:</strong> ${order.customerPhone}</p>
              <p><strong>Dirección de envío:</strong> ${order.address}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background-color: #0A192F; color: white;">
                  <th style="padding: 10px 12px; text-align: left;">Producto</th>
                  <th style="padding: 10px 12px; text-align: center;">Cant.</th>
                  <th style="padding: 10px 12px; text-align: left;">Color</th>
                  <th style="padding: 10px 12px; text-align: right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>${productsHtml}</tbody>
            </table>
            <div style="text-align: right; padding: 15px; background: #D4AF37; color: #0A192F; border-radius: 8px; font-weight: bold; font-size: 18px;">
              Total: $${order.total.toLocaleString('es-CO')} COP
            </div>
          </div>
        `;

        try {
          const emailPromises = [
            resend.emails.send({
              from: 'Insumos 360 <ventas@insumos360.com>',
              to: order.customerEmail,
              subject: `Confirmación de Pedido #${order.id}`,
              html: customerEmailHtml,
            }),
          ];

          if (process.env.EMAIL_RECEIVER) {
            emailPromises.push(
              resend.emails.send({
                from: 'Insumos 360 <ventas@insumos360.com>',
                to: process.env.EMAIL_RECEIVER,
                subject: `NUEVO PEDIDO PARA DESPACHO - #${order.id}`,
                html: adminEmailHtml,
              })
            );
          }
          await Promise.all(emailPromises);
        } catch (emailError) {
          console.error('Email send error:', emailError);
        }
      }
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}