import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}