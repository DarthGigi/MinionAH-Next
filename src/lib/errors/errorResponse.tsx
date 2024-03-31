import type { Font as FontOptions } from "next/dist/compiled/@vercel/og/satori";
import { ImageResponse } from "next/og";
import { ErrorTemplate } from "~/lib/components/error";
import { headers } from "~/lib/headers";

export const generateErrorResponse = (
  title: string,
  description: string,
  fonts?: FontOptions[],
) => {
  try {
    return new ImageResponse(
      ErrorTemplate({
        errorTitle: title,
        errorDescription: description,
      }),
      {
        height: 630,
        width: 1200,
        headers,
        fonts,
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
};
