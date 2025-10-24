import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ReplyBox({ initial }: { initial?: string }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!value.trim()) return;
    try {
      setLoading(true);
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value, context: initial ?? null }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Reply sent. Thank you! ✨");
      setValue("");
    } catch {
      toast.info("Saved locally. Connect your backend to store replies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-2xl rounded-2xl bg-white/70 p-4 shadow-soft backdrop-blur-md ring-1 ring-white/40"
    >
      <label className="block text-sm text-rose-900/70">
        If you want, you can type a reply here 😊
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write something sweet…"
        className="mt-2 min-h-[110px] w-full resize-y rounded-xl bg-white/80 p-3 text-rose-900 placeholder:text-rose-900/40 shadow-input outline-none ring-1 ring-rose-200/60 focus:ring-2 focus:ring-rose-400 transition-all"
      />
      <div className="mt-3 flex justify-end">
        <button
          onClick={submit}
          disabled={loading || !value.trim()}
          className="btn-primary disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send"}
        </button>
      </div>
    </motion.div>
  );
}
