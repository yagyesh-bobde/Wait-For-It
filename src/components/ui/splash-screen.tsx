import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const text = "Legen... Wait For It!";
  const letters = Array.from(text);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50"
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <div className="relative">
            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 -m-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1.5],
                opacity: [0.3, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-indigo-500/30" />
            </motion.div>
            <motion.div
              className="absolute inset-0 -m-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.1, 1.3],
                opacity: [0.3, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.2,
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-indigo-500/30" />
            </motion.div>

            {/* Text container with Safari-compatible gradient */}
            <div className="relative">
              <div className="flex space-x-1 overflow-hidden">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="text-4xl md:text-6xl font-bold relative"
                    style={{
                      background:
                        "linear-gradient(to right, #2563eb, #4f46e5, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>

              {/* Sliding bar under text */}
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  delay: 1,
                  ease: "easeInOut",
                }}
                style={{ originX: 0 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
