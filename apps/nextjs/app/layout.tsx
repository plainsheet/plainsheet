import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

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
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
