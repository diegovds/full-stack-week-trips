import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { NextAuthProvider } from "@/providers/auth";
import ToastProvider from "@/providers/toast";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FSW Trips",
  description: "Sistema de Reservas de Viagens",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <div className="flex flex-col h-screen">
              <div className="h-[94px]">
                <Header />
              </div>
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
