import { AuctionReminderEmail } from "$emails/index";
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
    const { username, auctionAmount, auctionName, minionId, userEmail } = z
      .object({
        username: z.string(),
        auctionAmount: z.string(),
        auctionName: z.string(),
        minionId: z.string(),
        userEmail: z.string()
      })
      .parse(body);

    const data = await resend.emails.send({
      from: "MinionAH <notifications@minionah.com>",
      to: userEmail,
      subject: `Your ${auctionAmount} ${auctionName} auction is about to expire!`,
      react: AuctionReminderEmail({
        username,
        auctionAmount,
        auctionName,
        minionId
      }),
      text: await render(
        AuctionReminderEmail({
          username,
          auctionAmount,
          auctionName,
          minionId
        })
      )
    });

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
