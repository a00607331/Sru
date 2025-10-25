import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function LandingStep({ onNext }: { onNext: (name: string) => void; }) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleNext = async () => {
    if (!value.trim()) return;
    setSubmitting(true);

    // Save the input to Supabase
    try {
      await supabase.from("landing_responses").insert([{ response: value.trim() }]);
    } catch (err) {
      console.error("Failed to save response:", err);
    }

    setSubmitting(false);
    onNext(value.trim()); // go to the next step
  };

  return (
    <div className="relative flex min-h-[70vh] w-full items-center justify-center px-4">
      {/* Floating heart animation */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-8 right-8 text-pink-400 text-3xl select-none pointer-events-none"
      >
        ❤️
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto w-full max-w-md rounded-2xl bg-white/70 p-6 shadow-soft backdrop-blur-md ring-1 ring-white/40"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-rose-900/90">Hey… how are you doing?</h2>
          <p className="mt-2 text-rose-900/60 text-sm">Write anything you like. You can keep it short.</p>
        </div>

        <div className="mt-6">
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type here…"
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
                onClick={handleNext}
                disabled={submitting}
                className="btn-primary"
              >
                {submitting ? "Sending…" : "Next"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}