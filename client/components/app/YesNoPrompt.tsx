import { useState } from "react";
import { motion } from "framer-motion";

export default function YesNoPrompt({ onYes }: { onYes: () => void }) {
  const [swapped, setSwapped] = useState(false);

  const yesBtn = (
    <motion.button
      key="yes"
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onYes}
      className="btn-primary"
    >
      Yes
    </motion.button>
  );

  const noBtn = (
    <motion.button
      key="no"
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setSwapped((s) => !s)}
      className="btn-secondary"
    >
      No
    </motion.button>
  );

  return (
    <div className="relative flex min-h-[60vh] w-full items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md rounded-2xl bg-white/70 p-6 shadow-soft backdrop-blur-md ring-1 ring-white/40 text-center"
      >
        <h3 className="text-xl font-semibold text-rose-900/90">
          Want to read the message?
        </h3>
        <div className="mt-6 flex items-center justify-center gap-4">
          {swapped ? (
            <>
              {noBtn}
              {yesBtn}
            </>
          ) : (
            <>
              {yesBtn}
              {noBtn}
            </>
          )}
        </div>
        <p className="mt-3 text-xs text-rose-900/50">Try pressing No 😉</p>
      </motion.div>
    </div>
  );
}
