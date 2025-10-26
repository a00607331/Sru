import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const MESSAGE = `
(Click for full text on screen)
"agar tu ye mobile pr dekh rahi hai toh don't forget to turn on desktop-view"

Hey, hello, hii Sruu 🌙

I hope you’ve been doing well — truly, from the heart.

It’s been three… maybe four months since we last spoke, but honestly, 
it feels like a long, quiet winter that forgot how to end.

I ruin things sometimes 🥲, and maybe this silence was one of them.

But I’m not here to drag the past back — I just want you to listen, peacefully.

Were these months happy?

Yes, they were — but not because you weren’t there.

jab jab maine kuch achieve kiya kuch paaya , tab tab tera khayal mujhe aaya.

Even the smallest wins felt half-hearted without the 
instinct to tell you first as I always did.

If I skip our silly fights and look only at the good, those convos, the laughter, 
the random late-night talks, 
the comfort of knowing someone understood even when words didn’t.
That someone was you fr fr 😓.

Aur ek baat… asahi tasahi konic VAIT nahi zalay kona somorch shemdee.

Haa, tu buri hai 😡 par bas mere liye 😒 — kyunki tu chup rehne mein bhi baat keh deti hai.

Kabhi kabhi lagta hai silence heals, par kabhi wo bas aur zyada dooriya bana deta hai.

You once said na “mujhe nahi lgta ki hoga terese move on.” Ha sahi kaha tha…

Aur hoga bhi kaise… did we even dated? 🙂‍↔️🤧

But we *did* care — and maybe that’s what mattered.

and and one more thing…

Unblock kar Insta pe, 
Snap pe add kar le, 
aur contact list mein naam wapas likh le 
😶‍🌫️ number tk delete kr diya tune mera!

Not because I’m trying to get attention —

bas itna ki agar kabhi kuch bolna ho, toh ek raasta khula rahe.

I don’t want to vanish from your world completely and not make you vanish from mine.

Whatever we were — can we just be that again?
I still love you the same, 
but ab terko paane ki chah nhi hai bhas tere sath ki chah hai🙂‍↔️

Not rewinding, not forcing — just rebuilding (😭 engineer brain)

Take care of yourself, Sruu.

And I genuinely hope life keeps giving you reasons to smile, 
the way you once gave reasons for mine.

Agar tere side se kuch respond hai toh
niche reply box mein “yes” / “ha” likh de (database issues 😭),
fir “WhatsApp/Instagram” pe bhej dena aage ka — beginner hu,
I still doubt my development

If not, bas “No” likh dena…
at least mujhe pata rahega ki tune padha pura🥹🥹
`;

export default function LetterDisplay({ onDone }: { onDone: () => void }) {
  return (
    <div
  // MODIFICATION: Added a fine gradient background
  className="relative flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-white to-rose-50 overflow-hidden"
>
  {/* MODIFICATION: Added background emojis */}
  {/* These are z-0, so they sit behind the z-10 card */}
  <span className="absolute top-[20%] left-[15%] z-0 text-5xl opacity-40 -rotate-12 select-none pointer-events-none">
    💖
  </span>
  <span className="absolute top-[30%] right-[20%] z-0 text-4xl opacity-50 rotate-12 select-none pointer-events-none">
    ✨
  </span>
  <span className="absolute bottom-[25%] left-[30%] z-0 text-3xl opacity-30 rotate-6 select-none pointer-events-none">
    ✨
  </span>
  <span className="absolute bottom-[20%] right-[25%] z-0 text-5xl opacity-30 -rotate-6 select-none pointer-events-none">
    💖
  </span>

  {/* letter box only */}
  <motion.div
    initial={{ opacity: 0, scale: 1, y: 40 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 1 }}
    // MODIFICATION: Made the box wider (was max-w-3xl)
    className="relative z-10 mx-auto w-full max-w-5xl rounded-3xl bg-white shadow-[0_8px_50px_rgba(0,0,0,0.08)] border border-rose-100 p-10"
  >
    <div className="font-[500] text-[17px] leading-relaxed text-rose-900 whitespace-pre-wrap">
      <Typewriter text={MESSAGE} onDone={onDone} />
    </div>
  </motion.div>
</div>
  );
}

function Typewriter({
  text,
  speed = 40,
  onDone,
}: {
  text: string;
  speed?: number;
  onDone?: () => void;
}) {
  const [display, setDisplay] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDisplay((prev) => prev + text[indexRef.current]);
      indexRef.current += 1;
      if (indexRef.current >= text.length && intervalRef.current) {
        clearInterval(intervalRef.current);
        setTimeout(() => onDone?.(), 500);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed, onDone]);

  const handleClick = () => {
    // Clear any ongoing typing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Set the full text immediately and prevent further typing
    setDisplay(text);
    indexRef.current = text.length; // Mark as completed
    
    // Call onDone after a short delay
    setTimeout(() => onDone?.(), 300);
  };

  return (
    <pre
      className="cursor-pointer select-none font-[500] text-left tracking-normal"
      onClick={handleClick}
    >
      {display}
      <motion.span
        className="inline-block h-5 w-[2px] bg-rose-700 ml-1"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
      />
    </pre>
  );
}