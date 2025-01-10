import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "✨ Nisa Fredlina, My Beloved Soulmate FR FR No Cap! 💖",
  description:
    "Ini tuh buat kamu yang paling real, lover of my life, fr deh ga main-main! Yang bikin hari-hari jadi ngefly banget sumpah! 🦋💝",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-quicksand">{children}</body>
    </html>
  );
}
