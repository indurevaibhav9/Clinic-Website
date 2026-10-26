import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import LayoutContent from "./(pages)/Components/LayoutContent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MediFast | Health & Medical",
  description: "Book appointments and find trusted healthcare services.",
  openGraph: {
    title: "MediFast | Health & Medical",
    description: "Your trusted healthcare platform.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MediFast - Health & Medical",
      },
    ],
    type: "website",
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full  flex flex-col">
        <LayoutContent>{children}</LayoutContent>

        <Toaster />
      </body>
    </html>
  );
}
