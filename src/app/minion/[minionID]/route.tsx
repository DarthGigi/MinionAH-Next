import type { Font as FontOptions } from "next/dist/compiled/@vercel/og/satori";
import { ImageResponse } from "next/og";
import type { ReactElement } from "react";
import { formatNumber } from "~/lib/utilities";
import { prisma } from "~/server/prisma";

export const runtime = "edge";

const headers = {
  "content-type": "image/png",
  "cache-control": "public, no-transform, max-age=86400s",
};

function ErrorTemplate({
  errorTitle,
  errorDescription,
}: {
  errorTitle: string;
  errorDescription: string;
}): ReactElement {
  return (
    <div tw="flex h-full w-full text-white text-7xl flex-col items-center justify-center bg-[#131313]">
      <span>{errorTitle}</span>
      <span tw="text-3xl mt-10">{errorDescription}</span>
    </div>
  );
}

function Template({
  minion,
  coinImageData,
  romanNumerals,
}: {
  minion: {
    minion: {
      name: string;
      texture: string;
      generator_tier: number;
    };
    user: {
      username: string;
      avatar: string;
    };
    price: number;
    amount: number | null;
  };
  coinImageData: ArrayBuffer;
  romanNumerals: boolean;
}): ReactElement {
  return (
    <div tw="flex h-full w-full flex-col items-center justify-center bg-[#131313]">
      <div tw="flex w-full max-w-xl flex-col rounded-lg border border-neutral-700 bg-neutral-800 shadow">
        <div tw="mx-auto flex flex-col items-center rounded py-10">
          <div tw="flex mb-3 items-center h-44 w-44 shadow-lg overflow-hidden justify-center rounded-full bg-neutral-700">
            <img
              tw="h-full w-full p-4"
              src={`data:image/png;base64,${minion.user.avatar}`}
            />
          </div>
          <span tw="text-4xl font-medium text-white">
            {minion.user.username}
          </span>
        </div>
        <div tw="flex w-full flex-col items-center justify-center rounded">
          <div tw="flex h-24 w-24 rounded-full bg-neutral-700 p-1">
            <img
              tw="h-full w-full"
              src={`data:image/png;base64,${minion.minion.texture}`}
            />
          </div>
          <span tw="text-3xl mt-3 font-medium text-white">
            {minion.minion.name.replace(/ [IVX]+$/, "")}
          </span>
          <div tw="mx-auto mt-4 flex w-full items-center justify-center border-t border-neutral-700">
            <div tw="relative flex w-0 flex-1 items-center justify-center overflow-hidden text-2xl font-medium text-neutral-200">
              <span
                tw={`flex-shrink-0 rounded-full bg-neutral-400 px-2 py-0.5 font-medium text-neutral-800 group-hover:scale-125 group-hover:text-neutral-900`}
              >
                {romanNumerals
                  ? `Tier ${["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][minion.minion.generator_tier - 1]}`
                  : `Tier ${minion.minion.generator_tier}`}
              </span>
            </div>
            <div tw="relative border-l border-r border-neutral-700 -ml-px flex w-0 flex-1 overflow-hidden">
              <span tw="relative w-0 flex-1 items-center justify-center overflow-hidden py-4 text-2xl font-medium text-neutral-200 group-hover:scale-125 group-hover:text-neutral-900">
                <img
                  tw="mr-1 h-10 w-10"
                  src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(coinImageData)))}`}
                />
                {formatNumber(minion.price)}
                <span tw="ml-1 text-2xl text-neutral-200/50 group-hover:ml-0 group-hover:text-neutral-900/0">
                  /
                </span>
                <span tw="text-2xl text-neutral-200/50 group-hover:-ml-0.5 group-hover:text-neutral-900">
                  each
                </span>
              </span>
            </div>
            <div tw="relative flex w-0 flex-1 items-center justify-center text-sm font-medium text-neutral-200">
              <span tw="flex-shrink-0 rounded-full bg-neutral-400 px-2 py-0.5 text-2xl font-medium text-neutral-800 group-hover:scale-125 group-hover:text-neutral-900">
                {` Amount: ${minion.amount}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function GET(
  request: Request,
  { params }: { params: { minionID: string } },
) {
  const { searchParams } = new URL(request.url);
  const minecraftFont: boolean = searchParams.get("minecraftFont") !== "false";
  const romanNumerals: boolean = searchParams.get("romanNumerals") !== "false";
  let fonts: FontOptions[] | undefined = undefined;

  if (minecraftFont) {
    const minecraftFontData = await fetch(
      new URL("/public/assets/fonts/minecraft.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());
    fonts = [
      {
        name: "Minecraft",
        data: minecraftFontData,
      },
    ];
  } else {
    const fontData400 = await fetch(
      new URL("/public/assets/fonts/Inter-Regular.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());

    const fontData700 = await fetch(
      new URL("/public/assets/fonts/Inter-Bold.ttf", import.meta.url),
    ).then((res) => res.arrayBuffer());
    fonts = [
      {
        name: "Inter",
        data: fontData400,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: fontData700,
        weight: 700,
        style: "normal",
      },
    ];
  }

  const minion = await prisma.minionSeller.findUnique({
    where: {
      id: params.minionID
    },
    select: {
      minion: {
        select: {
          name: true,
          texture: true,
          generator_tier: true,
        },
      },
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
      price: true,
      amount: true,
    },
  });

  if (!minion) {
    try {
      return new ImageResponse(
        ErrorTemplate({
          errorTitle: "Minion not found",
          errorDescription: `The minion could not be found`,
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
  }

  try {
    const coinImageData = await fetch(
      new URL("/public/assets/images/coin.png", import.meta.url),
    ).then((res) => res.arrayBuffer());
    return new ImageResponse(
      Template({ minion, coinImageData, romanNumerals }),
      {
        height: 630,
        width: 1200,
        headers,
        fonts,
      },
    );
  } catch (error) {
    console.error(error);
    try {
      return new ImageResponse(
        ErrorTemplate({
          errorTitle: `Something went wrong`,
          errorDescription:
            "Something went wrong while trying to generate the image",
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
  }
}
