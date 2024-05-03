import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { env } from "~/env";


const prismaClientSingleton = () => {
  return new PrismaClient({
    // log:
    //   env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }).$extends(withAccelerate());
}

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prisma ?? prismaClientSingleton()


if (env.NODE_ENV !== 'production') globalThis.prisma = prisma