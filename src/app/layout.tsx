import type { Metadata } from "next";
import { Providers } from "./providers";
import { ToastContainer } from "./components/ToastContainer";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeraLayer",
  description: "The Verifiable Foundation for Global Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
