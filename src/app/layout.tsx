import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "MinionAH OG Generator",
  description: "This project generates Open Graph images for https://minionah.com.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "MinionAH OG Generator",
    description: "This project generates Open Graph images for https://minionah.com.",
    images: [{ url: "/assets/images/ogBanner.png" }],
  },
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
