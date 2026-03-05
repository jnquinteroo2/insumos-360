import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [process.env.EMAIL_RECEIVER as string],
      subject: "✅ Prueba Exitosa con Resend",
      html: "<h2>¡Adiós errores SMTP!</h2><p>El sistema de correos ya funciona mediante API. Podemos continuar con la tienda.</p>",
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, mensaje: error.message },
      { status: 500 },
    );
  }
}
