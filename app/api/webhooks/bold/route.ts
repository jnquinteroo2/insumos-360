import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const rawStatus = body?.type || body?.payment?.status || body?.event_type || 'DESCONOCIDO';
    const paymentStatus = String(rawStatus).toUpperCase();
    if (paymentStatus.includes('APPROVE')) {
      const paymentData = body?.data || body?.payment || {};
      
      const customerEmail = paymentData?.payer_email || paymentData?.customer?.email || 'cliente@ejemplo.com';
      const customerName = paymentData?.payer_name || paymentData?.customer?.name || 'Cliente';
      
      const amountObj = paymentData?.amount;
      const amount = typeof amountObj === 'object' ? amountObj?.total || amountObj?.value : amountObj || '0';
      
      const reference = paymentData?.metadata?.reference || body?.subject || paymentData?.reference || body?.id || 'Desconocida';

      await resend.emails.send({
        from: 'ventas@insumos360.com',
        to: [customerEmail, process.env.EMAIL_RECEIVER as string].filter(Boolean),
        subject: '¡Pago Confirmado! Tu pedido en Comfort 360',
        html: `
          <div style="font-family: Arial, sans-serif; color: #0A192F; padding: 20px;">
            <h2 style="color: #D4AF37;">¡Gracias por tu compra, ${customerName}!</h2>
            <p>Hemos recibido la confirmación de tu pago de forma exitosa a través de Bold.</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
              <p><strong>Referencia de Pedido:</strong> ${reference}</p>
              <p><strong>Total Pagado:</strong> $${amount} COP</p>
            </div>
            <p>En breve comenzaremos a preparar tu pedido para el envío.</p>
          </div>
        `
      });

    } else {
      await resend.emails.send({
        from: 'ventas@insumos360.com',
        to: process.env.EMAIL_RECEIVER as string,
        subject: `🚨 MODO DETECTIVE: Estado Bold ${paymentStatus}`,
        text: `Bold se comunicó con la tienda, pero mandó un estado diferente a Aprobado.\n\nJSON que envió Bold:\n${JSON.stringify(body, null, 2)}`
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}