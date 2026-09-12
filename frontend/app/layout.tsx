import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serendib Adventures | Wild Sri Lanka Experiences & Day Tours",
  description: "Discover premium white water rafting, canyoning, trekking, and safari day tours in Kitulgala and across Sri Lanka.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen antialiased flex flex-col justify-between" suppressHydrationWarning>
        <SiteHeader />
        <main className="min-h-[80vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
