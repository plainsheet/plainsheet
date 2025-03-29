import "./app.css";
import { Analytics } from "@vercel/analytics/react";

export default function PlainSheetWebsite({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />;
      <Analytics />
    </>
  );
}
