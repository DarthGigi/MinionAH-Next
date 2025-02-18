import { AuctionReminderEmail } from "$emails/index";
import { render } from "@react-email/render";
import { type CreateBatchOptions, type CreateBatchResponse, type CreateEmailOptions, Resend } from "resend";
import { z } from "zod";
import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);
const BATCH_SIZE = 100; // Resend's maximum batch size

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
    const allEmails = z
      .object({
        username: z.string(),
        auctionAmount: z.string(),
        auctionName: z.string(),
        minionId: z.string(),
        userEmail: z.string()
      })
      .array()
      .parse(body);

    const requests: Promise<CreateBatchResponse>[] = [];

    // Process emails in batches of 100
    for (let i = 0; i < allEmails.length; i += BATCH_SIZE) {
      const batch = allEmails.slice(i, i + BATCH_SIZE);

      // Prepare batch emails
      const emailBatch = (await Promise.all(
        batch.map(async (email) => {
          const emailComponent = AuctionReminderEmail({
            username: email.username,
            auctionAmount: email.auctionAmount,
            auctionName: email.auctionName,
            minionId: email.minionId
          });

          return {
            from: "MinionAH <notifications@minionah.com>",
            to: email.userEmail,
            subject: `Your ${email.auctionAmount} ${email.auctionName} auction is about to expire!`,
            react: emailComponent,
            text: await render(emailComponent)
          } satisfies CreateEmailOptions;
        })
      )) satisfies CreateBatchOptions;

      requests.push(resend.batch.send(emailBatch));
    }

    const responses = await Promise.all(requests);

    return Response.json({ success: true, responses });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
}
