import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { cartItems, customerInfo } = await req.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
    }

    if (!customerInfo?.name || !customerInfo?.email || !customerInfo?.phone || !customerInfo?.address || !customerInfo?.document) {
      return NextResponse.json({ error: 'Datos del cliente incompletos' }, { status: 400 });
    }

    const productIds = cartItems.map((item: any) => Number(item.id));
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));

    const outOfStock: string[] = [];
    const priceMismatch: string[] = [];

    for (const item of cartItems) {
      const product = productMap.get(Number(item.id));

      if (!product) {
        outOfStock.push(item.name || `Producto #${item.id}`);
        continue;
      }

      if (product.stock < item.quantity) {
        outOfStock.push(`${product.name} (disponible: ${product.stock}, solicitado: ${item.quantity})`);
      }

      if (product.price !== item.price) {
        priceMismatch.push(product.name);
      }
    }

    if (outOfStock.length > 0) {
      return NextResponse.json(
        { error: 'Stock insuficiente', details: outOfStock },
        { status: 409 }
      );
    }

    if (priceMismatch.length > 0) {
      return NextResponse.json(
        { error: 'Los precios han cambiado, por favor recarga la página', details: priceMismatch },
        { status: 409 }
      );
    }

    const totalAmount = cartItems.reduce((acc: number, item: any) => {
      const product = productMap.get(Number(item.id));
      return acc + (product!.price * item.quantity);
    }, 0);

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
            price: productMap.get(Number(item.id))!.price,
            color: item.selectedColor,
          })),
        },
      },
    });

    const signatureString = `${orderId}${totalAmount}${currency}${secretKey}`;

    const integritySignature = crypto
      .createHash('sha256')
      .update(signatureString)
      .digest('hex');

    return NextResponse.json({
      orderId,
      totalAmount,
      integritySignature,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}