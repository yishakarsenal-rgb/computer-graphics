import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Computer Graphics — Course & Lab Hub",
  description:
    "Interactive Computer Graphics course platform: study notes, live C++ graphics visualizer, in-browser C++ runner, timed mock exams, and an algorithm cheat sheet.",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-black text-white ${geistSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-black text-white font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
