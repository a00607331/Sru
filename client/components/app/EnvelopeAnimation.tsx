import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EnvelopeAnimation({
  onOpened,
}: {
  onOpened: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 900); // delay before opening
    const t2 = setTimeout(() => onOpened(), 2000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [onOpened]);

  return (
    <div className="relative flex min-h-[60vh] w-full items-center justify-center px-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
          className="relative"
        >
          <Envelope open={open} />
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: -8 }}
              transition={{ duration: 0.8 }}
              className="absolute left-1/2 top-[-36px] -translate-x-1/2"
            >
              <HeartPulse />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Envelope({ open }: { open: boolean }) {
  return (
    <div className="relative">
      <svg
        width="280"
        height="200"
        viewBox="0 0 280 200"
        className="drop-shadow-xl"
      >
        <defs>
          <linearGradient id="paper" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--peach-50))" />
            <stop offset="100%" stopColor="hsl(var(--peach-100))" />
          </linearGradient>
        </defs>
        {/* envelope body */}
        <path
          d="M20 40h240v120a12 12 0 0 1-12 12H32a12 12 0 0 1-12-12z"
          fill="url(#paper)"
          stroke="hsl(var(--peach-200))"
          strokeWidth="2"
        />
        {/* inner letter */}
        <motion.rect
          x="34"
          y="58"
          width="212"
          height="100"
          rx="10"
          fill="white"
          stroke="hsl(var(--rose-200))"
          strokeWidth="1.5"
          initial={false}
          animate={{ y: open ? -24 : 0, opacity: open ? 1 : 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        {/* flap */}
        <motion.path
          d="M20 40l120 90L260 40z"
          fill="hsl(var(--peach-200))"
          stroke="hsl(var(--peach-300))"
          strokeWidth="2"
          style={{ transformOrigin: "140px 40px" }}
          initial={false}
          animate={{ rotate: open ? -180 : 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
        {/* top shadow */}
        <path
          d="M20 40l120 90L260 40"
          fill="none"
          stroke="hsl(var(--peach-300))"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

function HeartPulse() {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{
        scale: [1, 1.15, 1],
        filter: [
          "drop-shadow(0 0 0 rgba(0,0,0,0))",
          "drop-shadow(0 6px 18px rgba(255,0,92,0.25))",
          "drop-shadow(0 0 0 rgba(0,0,0,0))",
        ],
      }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s-6.716-4.418-9.192-7.03C.498 11.498.937 7.5 4.2 6.3 6.4 5.5 8.2 6.7 9 7.6c.8-.9 2.6-2.1 4.8-1.3 3.263 1.2 3.702 5.198 1.392 7.67C18.716 16.582 12 21 12 21z"
          fill="hsl(var(--rose-500))"
        />
      </svg>
    </motion.div>
  );
}
