import { prisma } from "~/server/prisma";

export const runtime = "edge";

export async function GET(
  request: Request,
  { params }: { params: { user: string } },
) {
  const data = await prisma.user.findUnique({
    where: { username: params.user },
  });

  return Response.json(data);
}
