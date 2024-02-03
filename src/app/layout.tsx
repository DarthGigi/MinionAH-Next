import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "MinionAH OG Generator",
  description: "MinionAH Open Graph image generator",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`dark h-full w-full bg-[#171717] font-sans text-white ${inter.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
