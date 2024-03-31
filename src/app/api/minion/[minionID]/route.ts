import { prisma } from "~/server/prisma";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { minionID: string } },
) {
  try {
    const data = await prisma.auction.findUnique({
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
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch auction" }), {
      status: 500,
    });
  }
}
