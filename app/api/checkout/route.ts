import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { cartItems, customerInfo } = await req.json();

    const totalAmount = cartItems.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    );

    const order = await prisma.order.create({
      data: {
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        total: totalAmount,
        items: {
          create: cartItems.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    const itemsListHtml = cartItems
      .map(
        (item: any) =>
          `<li>${item.quantity}x ${item.name} - $${item.price.toLocaleString("es-CO")}</li>`,
      )
      .join("");

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [process.env.EMAIL_RECEIVER as string],
      subject: `🛒 NUEVA ORDEN: ${customerInfo.name} - $${totalAmount.toLocaleString("es-CO")}`,
      html: `
<h2>¡Tienes un nuevo pedido en Comfort 360!</h2>
        <p><strong>Cliente:</strong> ${customerInfo.name}</p>
        <p><strong>Teléfono:</strong> ${customerInfo.phone}</p>
        <p><strong>Email:</strong> ${customerInfo.email}</p>
        <p><strong>Documento:</strong> ${customerInfo.document}</p>
        <p><strong>Dirección de Entrega:</strong> ${customerInfo.address}</p> 
        <h3>Productos seleccionados:</h3>
        <ul>${itemsListHtml}</ul>
        <p><strong>Total a pagar:</strong> $${totalAmount.toLocaleString("es-CO")}</p>
        <p><em>*El cliente fue redirigido a Bold para el pago.</em></p>
      `,
    });

    const secretKey = process.env.BOLD_SECRET_KEY as string;
    const currency = "COP";
    const hashString = `${order.id}${totalAmount}${currency}${secretKey}`;
    const integritySignature = crypto
      .createHash("sha256")
      .update(hashString)
      .digest("hex");

    return NextResponse.json({
      orderId: order.id,
      totalAmount,
      integritySignature,
    });
  } catch (error: any) {
    console.error("Error en checkout:", error);
    return NextResponse.json(
      { error: "Error procesando la orden" },
      { status: 500 },
    );
  }
}
