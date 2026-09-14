"use client";

import React from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-[#131622] border border-white/[0.12] shadow-2xl text-xs font-mono text-white max-w-md">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="flex-1 leading-snug">{message}</span>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-white transition-colors p-1"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
