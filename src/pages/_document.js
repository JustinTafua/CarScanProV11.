import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Preload garage and Skyline mockups from /public/icons */}
        <link rel="preload" as="image" href="/icons/mockup_stage1.png" />
        <link rel="preload" as="image" href="/icons/mockup_stage2.png" />
        <link rel="preload" as="image" href="/icons/mockup_stage3.png" />
        <link rel="preload" as="image" href="/icons/mockup_stage4.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}