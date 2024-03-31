import { prisma } from "~/server/prisma";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { user: string } },
) {
  try {
    const data = await prisma.user.findUnique({
      where: { username: params.user },
      select: {
        id: true,
        username: true,
      },
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
      status: 500,
    });
  }
}
