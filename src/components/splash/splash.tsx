"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SESSION_KEY = "splash-seen";
const LINE_DELAY = 150;
const LINE_DURATION = 500;
const HOLD_AFTER_LINE = 250;

const Splash = () => {
  const [visible, setVisible] = useState(true);
  const [lineDrawn, setLineDrawn] = useState(false);

  const dismiss = () => setVisible(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(SESSION_KEY);

    if (reduced || seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");

    const drawTimer = setTimeout(() => setLineDrawn(true), LINE_DELAY);
    const dismissTimer = setTimeout(
      dismiss,
      LINE_DELAY + LINE_DURATION + HOLD_AFTER_LINE
    );

    window.addEventListener("keydown", dismiss);
    window.addEventListener("wheel", dismiss, { passive: true });

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(dismissTimer);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("wheel", dismiss);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-testid="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-950 cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={dismiss}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Albert Shih
            </span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: lineDrawn ? 1 : 0 }}
              transition={{ duration: LINE_DURATION / 1000, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 h-[3px] w-40 bg-amber-500 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Splash;
