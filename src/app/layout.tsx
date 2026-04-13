import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "./providers";
import FirebaseAnalytics from "@/components/analytics/firebase-analytics";
import { Toaster } from "sonner";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Albert Shih — Software Engineer",
  description:
    "Software Engineer at Palo Alto Networks specializing in AI integration, full-stack development, and digital transformation. CS/CE graduate from UC Merced.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${jakarta.variable} font-sans antialiased`}
      >
        <Providers>
          <FirebaseAnalytics />
          {children}
          <Toaster position="bottom-center" />
        </Providers>
      </body>
    </html>
  );
}
