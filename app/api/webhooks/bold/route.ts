import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log("Webhook recibido de Bold");
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
         console.error("Firma invalida.");
         return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    const body = JSON.parse(rawBody);
    const paymentStatus = body.type;
    const orderId = body.data?.metadata?.reference;

    console.log(`Estado: ${paymentStatus}, OrderID: ${orderId}`);

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
        console.log("Orden actualizada a PAID en la base de datos");

        const productsHtml = order.items.map(item =>
          `<li>${item.quantity}x ${item.product.name} - $${(item.price * item.quantity).toLocaleString('es-CO')}</li>`
        ).join('');

        const emailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4AF37;">¡Pago Confirmado!</h2>
            <p>Hola <strong>${order.customerName}</strong>,</p>
            <p>Tu pedido <strong>#${order.id}</strong> ha sido procesado exitosamente y lo estamos preparando para el despacho.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #eee;">
                <h3 style="margin-top: 0; color: #0A192F;">Datos de entrega:</h3>
                <p style="margin: 5px 0;"><strong>Dirección:</strong> ${order.address}</p>
                <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${order.customerPhone}</p>
                <p style="margin: 5px 0; font-size: 18px;"><strong>Total pagado:</strong> $${order.total.toLocaleString('es-CO')} COP</p>
            </div>
            
            <h3 style="color: #0A192F;">Resumen de tu compra:</h3>
            <ul>${productsHtml}</ul>
            <br/>
            <p>Gracias por confiar en Insumos 360 Pro.</p>
          </div>
        `;

        const destinatarios = [order.customerEmail];
        if (process.env.EMAIL_RECEIVER) {
          destinatarios.push(process.env.EMAIL_RECEIVER);
        }

        try {
          console.log("Enviando correo a:", destinatarios);
          const resendResponse = await resend.emails.send({
            from: 'Insumos 360 Pro <ventas@insumos360pro.com>', 
            to: destinatarios,
            subject: `Confirmación de Pedido #${order.id} - Insumos 360 Pro`,
            html: emailHtml
          });
          console.log("Correo enviado con exito:", resendResponse);
        } catch (emailError) {
          console.error("Error enviando correo desde Resend:", emailError);
        }

      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Error critico en el Webhook:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}