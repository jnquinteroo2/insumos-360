import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function buildDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return raw;
  try {
    const url = new URL(raw);
    if (!url.searchParams.has("connection_limit")) url.searchParams.set("connection_limit", process.env.DB_CONNECTION_LIMIT || "5");
    if (!url.searchParams.has("pool_timeout")) url.searchParams.set("pool_timeout", "20");
    if (!url.searchParams.has("connect_timeout")) url.searchParams.set("connect_timeout", "10");
    return url.toString();
  } catch {
    return raw;
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: buildDatabaseUrl(),
    log: ["error"],
  });

globalForPrisma.prisma = prisma;
