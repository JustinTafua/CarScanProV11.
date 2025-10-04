// src/pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* PWA basics */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#111111" />
        <link rel="icon" href="/icons/icon-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />

        {/* Preload build-stage backgrounds to avoid flicker */}
        <link rel="preload" as="image" href="/mockup_stage1.png" />
        <link rel="preload" as="image" href="/mockup_stage2.png" />
        <link rel="preload" as="image" href="/mockup_stage3.png" />
        <link rel="preload" as="image" href="/mockup_stage4.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}