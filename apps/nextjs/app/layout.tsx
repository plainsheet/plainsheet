import type { Metadata } from "next";
import { VercelToolbar } from "@vercel/toolbar/next";
import { Provider } from "@/components/ui/provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Plain Sheet - Next.js example",
  description:
    "An example repository showing how to use plain sheet for Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body className="">
        <Provider>{children}</Provider>

        <VercelToolbar />
      </body>
    </html>
  );
}
