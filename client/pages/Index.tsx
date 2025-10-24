import { useState } from "react";
import FloatingBackground from "@/components/app/FloatingBackground";
import LandingStep from "@/components/app/LandingStep";
import YesNoPrompt from "@/components/app/YesNoPrompt";
import EnvelopeAnimation from "@/components/app/EnvelopeAnimation";
import LetterDisplay from "@/components/app/LetterDisplay";
import ReplyBox from "@/components/app/ReplyBox";

export default function Index() {
  const [step, setStep] = useState<"landing" | "prompt" | "envelope" | "letter" | "reply">("landing");
  const [note, setNote] = useState<string>("");

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-[hsl(var(--peach-50))] via-[hsl(var(--petal-50))] to-[hsl(var(--lav-50))]">
      <FloatingBackground />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 py-14">
        {step === "landing" && (
          <LandingStep onNext={(v) => { setNote(v); setStep("prompt"); }} />
        )}

        {step === "prompt" && (
          <YesNoPrompt onYes={() => setStep("envelope")} />
        )}

        {step === "envelope" && (
          <EnvelopeAnimation onOpened={() => setStep("letter")} />
        )}

        {step === "letter" && (
          <>
            <LetterDisplay onDone={() => setStep("reply")} />
          </>
        )}

        {step === "reply" && (
          <ReplyBox initial={note} />
        )}
      </main>

      <footer className="pointer-events-none absolute inset-x-0 bottom-2 z-10 flex justify-center text-[10px] text-rose-900/50">
        <p>Made with care • Smooth and playful interactions</p>
      </footer>
    </div>
  );
}
