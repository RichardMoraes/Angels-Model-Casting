import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitrine de Talentos",
  description: "Protótipo funcional para exibição de talentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
