import { AuctionReminderEmail } from "$emails/index";
import { render } from "@react-email/render";
import { z } from "zod";
import { env } from "~/env";
import { prisma } from "~/server/prisma";
import { usesend } from "~/server/usesend";

const BATCH_SIZE = 100;

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

  let allEmails:
    | {
        username: string;
        userEmail: string;
        auctions: {
          id: string;
          minionId: string;
        }[];
      }[]
    | undefined = undefined;
  try {
    const body = await request.json();

    console.info(body, "body");

    // Validate the request body
    allEmails = z
      .object({
        username: z.string(),
        userEmail: z.string(),
        auctions: z.array(
          z.object({
            id: z.string(),
            minionId: z.string()
          })
        )
      })
      .array()
      .parse(body);

    console.info("allEmails", allEmails);
    console.info("for prisma in", allEmails?.map((email) => email.auctions.map((a) => a.id)).flat() ?? []);

    const requests: Array<ReturnType<typeof usesend.emails.batch>> = [];

    // Process emails in batches of 100
    for (let i = 0; i < allEmails.length; i += BATCH_SIZE) {
      const batch = allEmails.slice(i, i + BATCH_SIZE);

      // Prepare batch emails
      const emailBatch = await Promise.all(
        batch.map(async (email) => {
          const emailComponent = AuctionReminderEmail({
            username: email.username,
            auctions: email.auctions
          });

          const html = await render(emailComponent);

          return {
            from: "MinionAH <notifications@minionah.com>",
            to: email.userEmail,
            subject: `${email.auctions.length} auction${email.auctions.length > 1 ? "s" : ""} of yours ${email.auctions.length > 1 ? "are" : "is"} about to expire!`,
            html,
            text: html
          };
        })
      );

      requests.push(usesend.emails.batch(emailBatch));
    }

    const responses = await prisma
      .$transaction(async (tx) => {
        const results = await Promise.allSettled(requests);
        const now = new Date();

        const response = await tx.auction.updateMany({
          where: {
            id: {
              in: allEmails?.map((email) => email.auctions.map((a) => a.id)).flat() ?? []
            }
          },
          data: {
            timeEmailed: now
          }
        });

        console.log(`Updated ${response.count} auctions`);

        return results;
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
        throw new Error("Failed to send emails and update database");
      });

    return Response.json({ success: true, responses });
  } catch (error) {
    console.error("Error details:", {
      timestamp: new Date().toISOString(),
      error:
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
              name: error.name
            }
          : error,
      context: {
        emailCount: allEmails?.length ?? 0,
        batchCount: Math.ceil((allEmails?.length ?? 0) / BATCH_SIZE)
      }
    });
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      },
      {
        status: 500
      }
    );
  }
}
