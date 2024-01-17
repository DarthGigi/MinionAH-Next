// import { ImageResponse } from "next/og";
// import type { ReactElement } from "react";
// import type { User } from "@prisma/client";
// // import type { Font as FontOptions } from "next/dist/compiled/@vercel/og/satori";

// export const runtime = "edge";

// const headers = {
//   "content-type": "image/png",
//   "cache-control": "public, no-transform, max-age=86400s",
// };

// function ErrorTemplate({
//   errorTitle,
//   errorDescription,
// }: {
//   errorTitle: string;
//   errorDescription: string;
// }): ReactElement {
//   return (
//     <div tw="flex h-full w-full text-white text-7xl flex-col items-center justify-center bg-[#131313]">
//       <span>{errorTitle}</span>
//       <span tw="text-3xl mt-10">{errorDescription}</span>
//     </div>
//   );
// }

// function Template({
//   user,
// }: {
//   user: {
//     username: string;
//     avatar: string;
//   };
// }): ReactElement {
//   return (
//     <div tw="flex h-full w-full flex-col items-center justify-center bg-[#131313]">
//       <div tw="flex w-full max-w-2xl justify-center rounded-lg border border-neutral-700 bg-neutral-800 shadow">
//         <div tw="mx-auto flex flex-col items-center rounded py-20">
//           <div tw="flex mb-3 items-center h-44 w-44 shadow-lg overflow-hidden justify-center rounded-full bg-neutral-700">
//             <img
//               tw="h-full w-full p-4"
//               src={`data:image/png;base64,${user.avatar}`}
//             />
//           </div>
//           <span tw="mb-1 text-4xl font-medium text-white">{user.username}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export async function GET(
//   request: Request,
//   { params }: { params: { user: string } },
// ) {
//   const { searchParams } = new URL(request.url);
//   // const minecraftFont: boolean = searchParams.get("minecraftFont") !== "false";
//   // let fonts: FontOptions[] | undefined = undefined;

//   // if (minecraftFont) {
//   //   const minecraftFontData = await fetch(
//   //     new URL("/public/assets/fonts/minecraft.ttf", import.meta.url),
//   //   ).then((res) => res.arrayBuffer());
//   //   fonts = [
//   //     {
//   //       name: "Minecraft",
//   //       data: minecraftFontData,
//   //     },
//   //   ];
//   // } else {
//   //   const fontData400 = await fetch(
//   //     new URL("/public/assets/fonts/Inter-Regular.ttf", import.meta.url),
//   //   ).then((res) => res.arrayBuffer());

//   //   const fontData700 = await fetch(
//   //     new URL("/public/assets/fonts/Inter-Bold.ttf", import.meta.url),
//   //   ).then((res) => res.arrayBuffer());
//   //   fonts = [
//   //     {
//   //       name: "Inter",
//   //       data: fontData400,
//   //       weight: 400,
//   //       style: "normal",
//   //     },
//   //     {
//   //       name: "Inter",
//   //       data: fontData700,
//   //       weight: 700,
//   //       style: "normal",
//   //     },
//   //   ];
//   // }

//   const user: User | null = await fetch(
//     new URL(`/src/app/api/user/${params.user}`, import.meta.url),
//   ).then((res) => res.json());

//   if (!user) {
//     try {
//       return new ImageResponse(
//         ErrorTemplate({
//           errorTitle: `User ${user} not found`,
//           errorDescription: "User not found",
//         }),
//         {
//           height: 630,
//           width: 1200,
//           headers,
//         },
//       );
//     } catch (error) {
//       console.error(error);
//       return new Response(`Failed to generate the image`, {
//         status: 500,
//       });
//     }
//   }

//   try {
//     return new ImageResponse(Template({ user }), {
//       height: 630,
//       width: 1200,
//       headers,
//     });
//   } catch (error) {
//     console.error(error);
//     try {
//       return new ImageResponse(
//         ErrorTemplate({
//           errorTitle: `Something went wrong`,
//           errorDescription:
//             "Something went wrong while trying to generate the image",
//         }),
//         {
//           height: 630,
//           width: 1200,
//           headers,
//         },
//       );
//     } catch (error) {
//       console.error(error);
//       return new Response(`Failed to generate the image`, {
//         status: 500,
//       });
//     }
//   }
// }
