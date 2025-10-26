import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || "",
  import.meta.env.VITE_SUPABASE_ANON_KEY || "",
);

// Heart sparkle component
const HeartSparkle = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.span
              className="text-5xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 0.8, repeat: 1 }}
            >
              💖
            </motion.span>
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-6xl">✨</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Confirmation modal component
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-xl font-medium text-rose-900">
              Confirm Your Reply
            </h3>
            <p className="mb-6 text-rose-800/80">
              Are you sure you want to send this?
              <span className="block mt-2 italic text-sm font-medium">
                "{message}"
              </span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg text-white bg-rose-600 transition-all duration-200 hover:bg-rose-700"
              >
                Send Reply
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function RomanticReplyBox({ initial }: { initial?: string }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  // Handle quick reply buttons
  const handleQuickReply = (reply: "Yes" | "No") => {
    setConfirmMessage(reply);
    setShowConfirmation(true);
  };

  // Handle custom reply submission
  const handleSubmit = () => {
    if (!value.trim()) return;
    setConfirmMessage(value);
    setShowConfirmation(true);
  };

  // Handle final confirmation and submission to Supabase
  const handleConfirm = async () => {
    try {
      setLoading(true);
      setShowConfirmation(false);

      // Save to Supabase
      const { error } = await supabase
        .from("letter_responses")
        .insert([{ letter_response: confirmMessage }]);

      if (error) throw error;

      // Show success animation
      setShowHeartAnimation(true);
      toast.success("Your reply has been sent! 💌");
      setValue("");

      // Hide heart animation after a delay
      setTimeout(() => {
        setShowHeartAnimation(false);
      }, 2000);
    } catch (error) {
      console.error("Error saving response:", error);
      toast.error("Failed to send your reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full max-w-2xl rounded-2xl bg-white/70 p-4 sm:p-6 shadow-soft backdrop-blur-md ring-1 ring-white/40"
    >
      <HeartSparkle isVisible={showHeartAnimation} />

      <label className="block text-sm font-medium text-rose-900/80">
        Your reply to this letter 💌
      </label>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your reply here... 💌"
        className="mt-3 min-h-[100px] w-full resize-y rounded-xl bg-rose-50/80 p-4 text-rose-900 placeholder:text-rose-400 shadow-inner outline-none ring-1 ring-rose-200/60 focus:ring-2 focus:ring-rose-400 transition-all font-medium"
        disabled={loading}
      />

      <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-center gap-3">
        <div className="w-full sm:flex-1">
          <div className="flex gap-2 justify-center sm:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickReply("Yes")}
              className="px-4 py-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors font-medium"
              disabled={loading}
            >
              Yes 💬
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickReply("No")}
              className="px-4 py-2 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors font-medium"
              disabled={loading}
            >
              No 💭
            </motion.button>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading || !value.trim()}
          className="w-full sm:w-auto px-5 py-2 mt-3 sm:mt-0 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors font-medium disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reply"}
        </motion.button>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        message={confirmMessage}
      />
    </motion.div>
  );
}
