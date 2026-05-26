import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle } from "lucide-react";

export function ContactModal({ isOpen, onClose }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...form,
        }).toString(),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", message: "" });
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-lg"
              style={{
                background: "rgba(10,10,11,0.98)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 0 1px rgba(0,200,206,0.08), 0 32px 64px rgba(0,0,0,0.8)",
              }}
            >
              {/* Teal top line */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 sm:p-10">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-8 gap-4"
                  >
                    <CheckCircle className="w-10 h-10 text-cyan-500" strokeWidth={1.5} />
                    <h3 className="text-2xl font-bold text-white tracking-tight">Message Sent</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      Thanks for reaching out. Brian will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-4 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white transition-all"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-[9px] font-bold uppercase tracking-[0.45em] text-zinc-600 mb-3 font-mono">
                      INITIALIZE_COLLABORATION
                    </p>
                    <h3 className="text-3xl font-bold text-white tracking-tight mb-8">
                      Let's Work Together
                    </h3>

                    {/* Netlify form detection */}
                    <form
                      name="contact"
                      data-netlify="true"
                      netlify-honeypot="bot-field"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <input type="hidden" name="form-name" value="contact" />
                      <input type="hidden" name="bot-field" />

                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-500 mb-2 font-mono">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full px-4 py-3 text-sm text-white placeholder-zinc-600 bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-500 mb-2 font-mono">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 text-sm text-white placeholder-zinc-600 bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-500 mb-2 font-mono">
                          Message
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell Brian about your project..."
                          className="w-full px-4 py-3 text-sm text-white placeholder-zinc-600 bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-xs text-red-400 font-mono">
                          Something went wrong. Try emailing directly at expertsmedia@gmail.com
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === "submitting"}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-white text-black text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-3.5 h-3.5" />
                        {status === "submitting" ? "Sending..." : "Send Message"}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
