"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Construction } from "lucide-react";

export default function Placeholder() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 text-center max-w-md"
      >
        <Construction className="w-16 h-16 text-yellow-400 mx-auto mb-4" />

        <h1 className="text-3xl font-bold mb-3">Coming Soon</h1>
        <p className="text-slate-300 mb-6">
          This feature of Crowbar Wallet is under development.
        </p>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
        >
          <ArrowLeft className="w-4 h-4 inline-block mr-2" />
          Go Back
        </button>
      </motion.div>
    </div>
  );
}
