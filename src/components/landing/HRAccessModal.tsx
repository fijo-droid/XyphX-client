import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Key, Lock, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface HRAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function HRAccessModal({ isOpen, onClose, onSuccess }: HRAccessModalProps) {
  const { verifyHRAccess, isHR, setHRMode } = useAuth();
  const { toast } = useToast();

  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) {
      setError("Please enter the HR authorization passkey.");
      return;
    }

    const authorized = verifyHRAccess(passkey);
    if (authorized) {
      toast({
        title: "HR Authorization Granted",
        description: "You now have permissions to insert, edit, and manage employee records.",
      });
      setPasskey("");
      setError("");
      if (onSuccess) onSuccess();
      onClose();
    } else {
      setError("Invalid HR passkey. Please check with the People & Culture team.");
    }
  };

  const handleDeauthorize = () => {
    setHRMode(false);
    toast({
      title: "HR Mode Deactivated",
      description: "Switched back to standard public view.",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A0014]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-line bg-paper shadow-2xl my-auto text-carbon p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-line text-carbon/60 transition-colors hover:bg-ink hover:border-ink hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink/10 text-ink">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-carbon">
                {isHR ? "HR Terminal Active" : "HR Authority Access"}
              </h3>
              <p className="mt-2 text-sm text-carbon/60 leading-relaxed">
                {isHR
                  ? "You currently have active HR permissions to insert and update employee directory records."
                  : "Only verified HR and People & Culture administrators are authorized to manage employee details and photos."}
              </p>
            </div>

            {isHR ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center">
                  <span className="label-mono text-emerald-700 text-xs font-semibold">
                    ✓ HR Security Level 1 Verified
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={onClose}
                    className="w-full rounded-full bg-ink px-6 py-3 font-display font-medium text-white shadow-sm hover:bg-ink-deep"
                  >
                    Continue to Directory
                  </button>
                  <button
                    onClick={handleDeauthorize}
                    className="w-full rounded-full border border-line px-6 py-3 font-display text-sm text-red-600 hover:bg-red-50"
                  >
                    Deactivate HR Mode
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="label-mono text-carbon/50 block mb-1.5 text-left">
                    HR Authorization Passkey
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-carbon/40" />
                    <input
                      type="password"
                      placeholder="Enter HR passkey"
                      value={passkey}
                      onChange={(e) => setPasskey(e.target.value)}
                      className="w-full rounded-xl border border-line bg-paper py-3 pl-10 pr-4 text-sm text-carbon placeholder:text-carbon/30 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-carbon/40 text-left font-mono">
                    Hint for demo/evaluation: <code className="text-ink font-semibold">xyphx-hr-2026</code>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-display font-medium text-white shadow-sm transition-all duration-300 hover:bg-ink-deep active:scale-95"
                >
                  <span>Authorize HR Mode</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
