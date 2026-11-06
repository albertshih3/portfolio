"use client"

import {ThemeProvider as NextThemesProvider} from "next-themes";
import {MotionConfig} from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {/* Honors prefers-reduced-motion for every motion.* entrance/hover site-wide:
          drops transform/scale, keeps opacity crossfades. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
