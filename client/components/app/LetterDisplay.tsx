import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// You can keep the message here if it's static
const MESSAGE = `Hey… I just wanted to share this little note with you. Hope it makes you smile 💖`;

export default function LetterDisplay({ onDone }: { onDone: () => void }) {
  return (
    <div className="relative flex min-h-[50vh] w-full items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-2xl rounded-3xl bg-gradient-to-tr from-pink-50/80 via-white/70
             p-8 shadow-2xl ring-1 ring-white/30 backdrop-blur-lg border border-white/20"
      >
        <div className="prose max-w-none text-rose-700/90 text-[17px] leading-relaxed cursor-pointer select-none">
          <Typewriter text={MESSAGE} onDone={onDone} />
        </div>
      </motion.div>
    </div>
  );
}

function Typewriter({
  text,
  speed = 50,
  onDone,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
}) {
  const [display, setDisplay] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDisplay((prev) => prev + text[indexRef.current]);
      indexRef.current += 1;

      if (indexRef.current >= text.length && intervalRef.current) {
        clearInterval(intervalRef.current);
        setTimeout(() => onDone?.(), 500);
      }
    }, speed);

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [text, speed, onDone]);

  // Skip typing on click
  const handleClick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setDisplay(text);
      setTimeout(() => onDone?.(), 200);
    }
  };

  return (
    <pre
      className="whitespace-pre-wrap text-[16px] leading-relaxed text-rose-900/95 cursor-pointer"
      onClick={handleClick}
    >
      {display}
      <motion.span
        className="inline-block h-5 w-[2px] bg-rose-500/80 ml-0.5"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      />
    </pre>
  );
}
