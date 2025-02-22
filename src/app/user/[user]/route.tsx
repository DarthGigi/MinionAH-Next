import type { Font as FontOptions } from "next/dist/compiled/@vercel/og/satori";
import { ImageResponse } from "next/og";
import { UserTemplate } from "~/lib/components/user";
import { generateErrorResponse } from "~/lib/errors/errorResponse";
import { headers } from "~/lib/headers";

export const runtime = "edge";

export async function GET(request: Request, props: { params: Promise<{ user: string }> }) {
  const params = await props.params;
  try {
    const { searchParams } = new URL(request.url);
    const minecraftFont: boolean = searchParams.get("minecraftFont") !== "false";
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
          data: fontData400,
          weight: 400,
          style: "normal",
          name: "Inter"
        }
      ];
    }

    const user = await fetch(`https://next.minionah.com/api/user/${params.user}`).then((res) => res.json());

    if (!user) {
      return generateErrorResponse("User not found", `The user could not be found`);
    }

    try {
      return new ImageResponse(UserTemplate({ user }), {
        height: 630,
        width: 1200,
        headers,
        fonts
      });
    } catch (error) {
      console.error(error);
      return generateErrorResponse("Something went wrong", "Something went wrong while trying to generate the image");
    }
  } catch (error) {
    console.error(error);
    return generateErrorResponse("Something went wrong", "Something went wrong while trying to generate the image");
  }
}
