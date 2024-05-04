import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata = {
  title: "MinionAH Next",
  description: "This is a NextJS project for MinionAH. It is used to build stuff MinionAH needs that can't be done with Svelte/SvelteKit because a package isn't available or the ecosystem isn't mature enough.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "MinionAH Next",
    description: "This is a NextJS project for MinionAH. It is used to build stuff MinionAH needs that can't be done with Svelte/SvelteKit because a package isn't available or the ecosystem isn't mature enough.",
    images: [{ url: "/assets/images/ogBanner.png" }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full w-full">
      <body className={`dark h-full w-full bg-[#171717] font-sans text-white ${inter.variable}`}>{children}</body>
    </html>
  );
}
