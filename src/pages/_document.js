// src/pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(){
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#0b5fff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="description" content="CarScan Pro — AI camera to identify car parts, bolts, and tools with guides and recommendations." />
        <meta property="og:title" content="CarScan Pro" />
        <meta property="og:description" content="AI-powered automotive assistant." />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main/><NextScript/>
      </body>
    </Html>
  );
}
