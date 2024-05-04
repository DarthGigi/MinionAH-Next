import type { Font as FontOptions } from "next/dist/compiled/@vercel/og/satori";
import { ImageResponse } from "next/og";
import { generateErrorResponse } from "~/lib/errors/errorResponse";
import { headers } from "~/lib/headers";
import { MinionTemplate } from "~/lib/components/minion";

export const runtime = "edge";

export async function GET(request: Request, { params }: { params: { minionID: string } }) {
  try {
    const { searchParams } = new URL(request.url);
    const minecraftFont: boolean = searchParams.get("minecraftFont") !== "false";
    const romanNumerals: boolean = searchParams.get("romanNumerals") !== "false";
    let fonts: FontOptions[] | undefined = undefined;

    if (minecraftFont) {
      const minecraftFontData = await fetch(new URL("/public/assets/fonts/minecraft.ttf", import.meta.url)).then((res) => res.arrayBuffer());
      fonts = [
        {
          name: "Minecraft",
          data: minecraftFontData
        }
      ];
    } else {
      const fontData400 = await fetch(new URL("/public/assets/fonts/Inter-Regular.ttf", import.meta.url)).then((res) => res.arrayBuffer());

      fonts = [
        {
          name: "Inter",
          data: fontData400,
          weight: 400,
          style: "normal"
        }
      ];
    }

    const minion = await fetch(`https://og.minionah.com/api/minion/${params.minionID}`).then((res) => res.json());

    if (!minion) {
      return generateErrorResponse("Minion not found", `The minion could not be found`, fonts);
    }
    const coinImageData = await fetch(new URL("/public/assets/images/coin.png", import.meta.url)).then((res) => res.arrayBuffer());
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
