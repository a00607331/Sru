import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LetterDisplay({ onDone }: { onDone: () => void }) {
  const message = `Hey you,\n\nI just wanted to remind you that you're one of the brightest parts of my day.\nYour smile, your kindness, and the way you see the world—it all means so much.\n\nNo rush to reply. Just know I'm here, cheering for you, always. 💖`;
  return (
    <div className="relative flex min-h-[50vh] w-full items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-2xl rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur-md ring-1 ring-white/40"
      >
        <div className="prose prose-pink max-w-none">
          <Typewriter text={message} onDone={onDone} />
        </div>
      </motion.div>
    </div>
  );
}

function Typewriter({ text, speed = 24, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const chars = Array.from(text);
    const id = setInterval(() => {
      setDisplay((d) => d + chars[i]);
      i++;
      if (i >= chars.length) {
        clearInterval(id);
        setTimeout(() => onDone && onDone(), 400);
      }
    }, 1000 / speed);
    return () => clearInterval(id);
  }, [text, speed, onDone]);

  return (
    <pre className="whitespace-pre-wrap text-[15px] leading-relaxed text-rose-900/90">
      {display}
      <span className="ml-0.5 inline-block h-5 w-[2px] translate-y-[2px] animate-caret bg-rose-500/80" />
    </pre>
  );
}
