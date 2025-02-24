import type { Metadata } from "next";
import { Lobster, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/modules/header";
import { ContextProvider } from "@/context";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "auto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "U Marry Me",
  description:
    "Pedido de casamento ou namoro com criatividade para marcar o começo desta jornada!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ContextProvider>
        <body
          className={`${poppins.className} ${lobster.variable} font-poppins antialiased dark min-h-svh`}
        >
          <Header />
          {children}
          <Toaster />
        </body>
      </ContextProvider>
    </html>
  );
}

