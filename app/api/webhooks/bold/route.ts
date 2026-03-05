import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Webhook de Bold recibido:", body);

    const paymentStatus = body?.payment?.status || body?.event_type;

    if (paymentStatus === "APPROVED" || paymentStatus === "PAYMENT_APPROVED") {
      const customerEmail =
        body?.payment?.customer?.email || "cliente@ejemplo.com";
      const customerName = body?.payment?.customer?.name || "Cliente";
      const amount = body?.payment?.amount || "0";
      const reference = body?.payment?.reference || "Desconocida";

      console.log(
        `Pago aprobado por $${amount}. Enviando correo a ${customerEmail}...`,
      );

      await resend.emails.send({
        from: "ventas@tudominio.com",
        to: customerEmail,
        subject: "¡Pago Confirmado! Tu pedido en Comfort 360",
        html: `
          <div style="font-family: Arial, sans-serif; color: #0A192F; max-w-md; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
            <h2 style="color: #D4AF37;">¡Gracias por tu compra, ${customerName}!</h2>
            <p>Hemos recibido la confirmación de tu pago de forma exitosa a través de Bold.</p>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <ul style="list-style: none; padding: 0; margin: 0;">
                <li style="margin-bottom: 10px;"><strong>Referencia de Pedido:</strong> ${reference}</li>
                <li><strong>Total Pagado:</strong> $${amount} COP</li>
              </ul>
            </div>
            <p>En breve comenzaremos a preparar tu pedido para el envío a la dirección indicada.</p>
            <br/>
            <p>Atentamente,<br/><strong>El equipo de Comfort 360</strong></p>
          </div>
        `,
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error procesando el webhook de Bold:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
