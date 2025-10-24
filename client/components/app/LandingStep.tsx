import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingStep({
  onNext,
}: {
  onNext: (name: string) => void;
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-md rounded-2xl bg-white/70 p-6 shadow-soft backdrop-blur-md ring-1 ring-white/40"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-rose-900/90">
            Hey… how are you doing?
          </h2>
          <p className="mt-2 text-rose-900/60 text-sm">
            Write anything you like. You can keep it short.
          </p>
        </div>
        <div className="mt-6">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type here"
            className="w-full rounded-xl bg-white/80 px-4 py-3 text-rose-900 placeholder:text-rose-900/40 shadow-input outline-none ring-1 ring-rose-200/60 focus:ring-2 focus:ring-rose-400 transition-all duration-300"
          />
        </div>
        <AnimatePresence>
          {value.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35 }}
              className="mt-6 flex justify-center"
            >
              <button
                onClick={() => onNext(value.trim())}
                className="btn-primary"
              >
                Next
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
