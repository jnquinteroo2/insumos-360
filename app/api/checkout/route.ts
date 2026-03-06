import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { cartItems } = await req.json();

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
      console.error('CRITICAL: BOLD_SECRET_KEY is not defined in environment variables.');
      return NextResponse.json({ error: 'Server Configuration Error' }, { status: 500 });
    }

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
    console.error('Error generating Bold checkout data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}