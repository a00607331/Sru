import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";
import LetterDisplay from "./LetterDisplay";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface LetterResponse {
  id: string;
  letter_response: string;
  created_at: string;
}

export default function ReplyBox({ initial }: { initial?: string }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<LetterResponse[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Fetch existing responses when component mounts
  useEffect(() => {
    async function fetchResponses() {
      try {
        setFetchLoading(true);
        const { data, error } = await supabase
          .from('letter_responses')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setResponses(data || []);
      } catch (error) {
        console.error('Error fetching responses:', error);
        toast.error('Failed to load previous responses');
      } finally {
        setFetchLoading(false);
      }
    }
    
    fetchResponses();
  }, []);

  async function submit() {
    if (!value.trim()) return;
    try {
      setLoading(true);
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('letter_responses')
        .insert([{ letter_response: value }])
        .select()
        .single();
      
      if (error) throw error;
      
      // Add the new response to the list
      setResponses(prev => [data, ...prev]);
      toast.success("Reply sent. Thank you! ✨");
      setValue("");
    } catch (error) {
      console.error('Error saving response:', error);
      toast.error("Failed to save your response");
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
        placeholder="Type your reply here..."
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
      
      {/* Display previous responses */}
      {responses.length > 0 && (
        <div className="mt-6 border-t border-rose-200/30 pt-4">
          <h3 className="text-sm font-medium text-rose-900/70 mb-3">Previous Responses</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
            {fetchLoading ? (
              <p className="text-sm text-rose-900/50">Loading responses...</p>
            ) : (
              responses.map(response => (
                <div 
                  key={response.id} 
                  className="p-3 bg-white/50 rounded-lg shadow-sm ring-1 ring-rose-100/30"
                >
                  <p className="text-sm text-rose-900/80">{response.letter_response}</p>
                  <p className="text-xs text-rose-900/40 mt-1">
                    {new Date(response.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </motion.div>     
  );
}
