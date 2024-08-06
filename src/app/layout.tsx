import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerador de links para WhatsApp grátis",
  description:
    "Crie links personalizados para números no WhatsApp sem criar conta, sem pagar nada e sem anúncios. Basta inserir o número de telefone e a mensagem, gerar o seu link, copiar e enviar para quem quiser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
