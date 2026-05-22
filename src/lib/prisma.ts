import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const adapterPg = new PrismaPg(process.env.DATABASE_URL)
const prisma = new PrismaClient({
  adapter: adapterPg,
});

export default prisma;