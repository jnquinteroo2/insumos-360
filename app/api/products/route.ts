import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 30;

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        image: true,
        stock: true,
        colors: true,
        size: true,
      },
    });

    return NextResponse.json(products, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}