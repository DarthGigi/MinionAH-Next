import { prisma } from "~/server/prisma";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { minionID: string } },
) {
  const data = await prisma.minionSeller.findUnique({
    where: {
      id: params.minionID,
    },
    select: {
      minion: {
        select: {
          id: true,
          name: true,
          generator_tier: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      price: true,
      amount: true,
    },
  });

  return Response.json(data);
}
