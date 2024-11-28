import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Definer Prisma-klienten basert på miljøet
const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

// Eksporter klienten
export default prisma;

// Eksporter type basert på Prisma-klienten
export type Prisma = typeof prisma;
