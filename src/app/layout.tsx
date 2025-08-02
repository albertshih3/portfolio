import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import FirebaseAnalytics from "@/components/analytics/firebase-analytics";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Albert Shih - Software Engineer",
  description: "Software engineer and Computer Science graduate passionate about creating innovative solutions that make a positive impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <FirebaseAnalytics />
          {children}
        </Providers>
      </body>
    </html>
  );
}
