import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Landing from "@/components/landing/landing";
import NavbarComponent from "@/components/navigation/navbar";
import "./globals.css";
import Footer from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavbarComponent />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
