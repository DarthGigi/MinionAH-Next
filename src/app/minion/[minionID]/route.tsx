import type { Font as FontOptions } from "next/dist/compiled/@vercel/og/satori";
import { ImageResponse } from "next/og";
import { MinionTemplate } from "~/lib/components/minion";
import { generateErrorResponse } from "~/lib/errors/errorResponse";
import { headers } from "~/lib/headers";

// Removed edge runtime - not compatible with OpenNext for Cloudflare
// export const runtime = "edge";

export async function GET(request: Request, props: { params: Promise<{ minionID: string }> }) {
  const params = await props.params;
  try {
    const { searchParams } = new URL(request.url);
    const minecraftFont: boolean = searchParams.get("minecraftFont") !== "false";
    const romanNumerals: boolean = searchParams.get("romanNumerals") !== "false";
    let fonts: FontOptions[] | undefined = undefined;

    if (minecraftFont) {
      const minecraftFontData = await fetch(new URL("public/assets/fonts/minecraft.ttf", import.meta.url)).then((res) => res.arrayBuffer());
      fonts = [
        {
          name: "Minecraft",
          data: minecraftFontData
        }
      ];
    } else {
      const fontData400 = await fetch(new URL("public/assets/fonts/Inter-Regular.ttf", import.meta.url)).then((res) => res.arrayBuffer());

      fonts = [
        {
          name: "Inter",
          data: fontData400,
          weight: 400,
          style: "normal"
        }
      ];
    }

    const minion = await fetch(`https://next.minionah.com/api/minion/${params.minionID}`).then((res) => res.json());

    if (!minion) {
      return generateErrorResponse("Minion not found", `The minion could not be found`, fonts);
    }
    const coinImageData = await fetch(new URL("public/assets/images/coin.png", import.meta.url)).then((res) => res.arrayBuffer());
    // @ts-expect-error Ignore for now
    return new ImageResponse(MinionTemplate({ minion, coinImageData, romanNumerals }), {
      height: 630,
      width: 1200,
      headers,
      fonts
    });
  } catch (error) {
    console.error(error);
    return generateErrorResponse("Something went wrong", "Something went wrong while trying to generate the image");
  }
}
