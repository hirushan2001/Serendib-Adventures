import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Serendib Adventures | Admin Portal",
  description: "Admin portal for managing tours, bookings, and customer inquiries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-900 text-slate-100 min-h-screen antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
