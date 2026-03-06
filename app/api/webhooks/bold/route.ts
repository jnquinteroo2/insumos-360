import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const paymentStatus = body?.payment?.status || body?.event_type;

    if (paymentStatus === 'APPROVED' || paymentStatus === 'PAYMENT_APPROVED') {
      
      const customerEmail = body?.payment?.customer?.email;
      const customerName = body?.payment?.customer?.name || 'Cliente';
      const amount = body?.payment?.amount || '0';
      const reference = body?.payment?.reference || 'Desconocida';

      console.log(`Pago aprobado por $${amount}. Enviando correo a ${customerEmail}...`);

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: [customerEmail, process.env.EMAIL_RECEIVER as string], 
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
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Error procesando el webhook de Bold:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}