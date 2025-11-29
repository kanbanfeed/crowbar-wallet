"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

export default function WalletEntry({ entry }: any) {
  const isCredit = entry.type === "credit";

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
      <div>
        <h4 className="text-white font-medium">{entry.title}</h4>
        <p className="text-sm text-slate-400">{entry.date}</p>
      </div>

      <div
        className={`flex items-center gap-1 text-sm font-semibold ${
          isCredit ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {isCredit ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        {isCredit ? "+" : "-"} {entry.amount} cr
      </div>
    </div>
  );
}
