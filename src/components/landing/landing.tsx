// Landing page component. This displays an animated full screen graphic with a greeting and my name.

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const lettersHello = "Hi There!".split("");
  const lettersName = "My name is Albert!".split("");
  const [showOverlay, setShowOverlay] = useState(true);
  const [showSecondLine, setShowSecondLine] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowSecondLine(true);
    }, 0);

    const timer2 = setTimeout(() => {
      setShowOverlay(false);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          className="fixed inset-0 flex flex-col items-start justify-center bg-opacity-50 backdrop-blur-lg z-50 bg-gradient-to-r from-cyan-900 to-blue-800"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.5 } }}
          transition={{ duration: 1 }}
        >
          <div className="ml-8 sm:ml-16 md:ml-24 lg:ml-32">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 1 }}
              animate={{
                y: showSecondLine ? -40 : 0,
                opacity: showSecondLine ? 0 : 1,
                transition: { duration: 1, delay: 4 },
              }}
            >
              <div className="flex">
                {lettersHello.map((letter, index) => (
                  <motion.span
                    key={index}
                    className="text-6xl sm:text-9xl md:text-10xl lg:text-11xl font-extrabold text-white"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
              {showSecondLine && (
                <motion.div
                  className="flex mt-2"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0 }}
                >
                  {lettersName.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white"
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1 + index * 0.08 }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
