import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ClientProvider from "@/components/QueryClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatSync",
  description: "ChatSync is the best messaging app on the planet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <ClientProvider>
        <body className={`${geistSans.className} h-full antialiased`}>
          {children}
          <Toaster theme="light" closeButton richColors position="top-center" />
        </body>
      </ClientProvider>
    </html>
  );
}
