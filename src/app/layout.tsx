import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "✨ Nisa Fredlina, My Beloved Soulmate FR FR No Cap! 💖",
  description:
    "Ini tuh buat kamu yang paling real, lover of my life, fr deh ga main-main! Yang bikin hari-hari jadi ngefly banget sumpah! 🦋💝",
  manifest: "/manifest.json",
  themeColor: "#EC4899",
  icons: {
    apple: "/icons/apple-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-quicksand">{children}</body>
    </html>
  );
}
