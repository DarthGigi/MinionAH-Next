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
          name: true,
          texture: true,
          generator_tier: true,
        },
      },
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      price: true,
      amount: true,
    },
  });

  return Response.json(data);
}
