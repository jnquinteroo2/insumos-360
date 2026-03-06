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
        include: { items: { include: { product: true } } }
      });

      if (order && order.status !== 'PAID') {
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'PAID' }
        });

        for (const item of order.items) {
          await prisma.product.update({
            where: { id: item.productId },
            data: { stock: { decrement: item.quantity } }
          });
        }

        const productsHtml = order.items.map(item =>
          `<li>${item.quantity}x ${item.product.name} - <strong>Color: ${item.color || 'No especificado'}</strong> - $${(item.price * item.quantity).toLocaleString('es-CO')}</li>`
        ).join('');

        const customerEmailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4AF37;">Pago Confirmado</h2>
            <p>Hola <strong>${order.customerName}</strong>,</p>
            <p>Tu pedido <strong>#${order.id}</strong> ha sido procesado exitosamente.</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
                <h3 style="margin-top: 0; color: #0A192F;">Datos de entrega:</h3>
                <p><strong>Dirección:</strong> ${order.address}</p>
                <p><strong>Teléfono:</strong> ${order.customerPhone}</p>
                <p style="font-size: 18px;"><strong>Total pagado:</strong> $${order.total.toLocaleString('es-CO')} COP</p>
            </div>
            <h3 style="color: #0A192F;">Resumen de compra:</h3>
            <ul>${productsHtml}</ul>
          </div>
        `;

        const adminEmailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0A192F;">Nuevo pedido para despacho</h2>
            <p><strong>ID de la Orden:</strong> #${order.id}</p>
            <div style="background-color: #fbf7e7; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #d4af37;">
                <h3 style="margin-top: 0; color: #0A192F;">Datos del cliente:</h3>
                <p><strong>Nombre:</strong> ${order.customerName}</p>
                <p><strong>Documento:</strong> ${order.document}</p>
                <p><strong>Email:</strong> ${order.customerEmail}</p>
                <p><strong>Teléfono:</strong> ${order.customerPhone}</p>
                <p><strong>Dirección de envío:</strong> ${order.address}</p>
            </div>
            <h3 style="color: #0A192F;">Productos a despachar:</h3>
            <ul>${productsHtml}</ul>
          </div>
        `;

        try {
          const emailPromises = [
            resend.emails.send({
              from: 'Insumos 360 <ventas@insumos360.com>', 
              to: order.customerEmail,
              subject: `Confirmacion de Pedido #${order.id}`,
              html: customerEmailHtml
            })
          ];

          if (process.env.EMAIL_RECEIVER) {
            emailPromises.push(resend.emails.send({
              from: 'Insumos 360 <ventas@insumos360.com>', 
              to: process.env.EMAIL_RECEIVER,
              subject: `NUEVO PEDIDO PARA DESPACHO - #${order.id}`,
              html: adminEmailHtml
            }));
          }
          await Promise.all(emailPromises);
        } catch (emailError) {
          console.error(emailError);
        }
      }
    }
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}