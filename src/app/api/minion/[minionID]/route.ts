import { prisma } from "~/server/prisma";

// Removed edge runtime - not compatible with OpenNext for Cloudflare
// export const runtime = "edge";

export async function GET(_request: Request, props: { params: Promise<{ minionID: string }> }) {
  const params = await props.params;
  try {
    const data = await prisma.auction.findUnique({
      where: {
        id: params.minionID
      },
      select: {
        minion: {
          select: {
            id: true,
            name: true,
            generator_tier: true
          }
        },
        user: {
          select: {
            id: true,
            username: true
          }
        },
        price: true,
        amount: true
      }
    });

    return Response.json(data);
  } catch (error: unknown) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch auction" }), {
      status: 500
    });
  }
}
