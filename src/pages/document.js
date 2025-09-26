import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* App Icons */}
        <link rel="icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-512.png" />
        <meta name="theme-color" content="#0d47a1" />
        <meta name="description" content="CarScan Pro v11 — DIY Auto Scan & Repair Helper" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
