import { UserChatEmail } from "$emails/index";
import { render } from "@react-email/render";
import { Resend } from "resend";
import { z } from "zod";
import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
  if (!env.MINIONAH_SECRET || request.headers.get("Authorization") !== `Bearer ${env.MINIONAH_SECRET}`) {
    return Response.json(
      { success: false, error: "Invalid Authorization header" },
      {
        status: 401,
        statusText: "Unauthorized"
      }
    );
  }
  try {
    const body = await request.json();

    // Validate the request body
    const { username, chatByUserImage, chatByUsername, userEmail } = z
      .object({
        username: z.string(),
        chatByUserImage: z.string(),
        chatByUsername: z.string(),
        userEmail: z.string()
      })
      .parse(body);

    const data = await resend.emails.send({
      from: "MinionAH <notifications@minionah.com>",
      to: userEmail,
      subject: `${chatByUsername} has sent you a message on MinionAH`,
      react: UserChatEmail({
        username,
        chatByUserImage,
        chatByUsername
      }),
      text: await render(
        UserChatEmail({
          username,
          chatByUserImage,
          chatByUsername
        })
      )
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
