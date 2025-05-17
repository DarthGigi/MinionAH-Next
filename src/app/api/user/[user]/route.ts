import { prisma } from "~/server/prisma";

export const runtime = "edge";

export async function GET(_request: Request, props: { params: Promise<{ user: string }> }) {
  const params = await props.params;
  try {
    const data = await prisma.user.findUnique({
      where: { username: params.user },
      select: {
        id: true,
        username: true,
        settings: {
          select: {
            profileSettings: {
              select: {
                bio: true,
                urls: true,
                email: false
              }
            }
          }
        }
      }
    });

    return Response.json(data);
  } catch (error: unknown) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
      status: 500
    });
  }
}
