import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { cartItems, customerInfo } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const totalAmount = cartItems.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const currency = 'COP';
    const secretKey = process.env.BOLD_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json({ error: 'Server Configuration Error' }, { status: 500 });
    }

    await prisma.order.create({
      data: {
        id: orderId,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        address: customerInfo.address,
        document: customerInfo.document,
        total: totalAmount,
        status: 'PENDING',
        items: {
          create: cartItems.map((item: any) => ({
            productId: Number(item.id),
            quantity: item.quantity,
            price: item.price,
            color: item.selectedColor
          }))
        }
      }
    });

    const signatureString = `${orderId}${totalAmount}${currency}${secretKey}`;

    const integritySignature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');

    return NextResponse.json({
      orderId,
      totalAmount,
      integritySignature
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}