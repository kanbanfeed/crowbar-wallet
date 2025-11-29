"use client";

import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import WalletEntry from "@/components/WalletEntry";
import WalletSummary from "@/components/WalletSummary";
import Link from "next/link";

export default function WalletPage() {
  const { user, loading, signInWithCrowbar } = useAuth();
  const [credits, setCredits] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("credits_log")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setCredits(data);
        const sum = data.reduce(
          (acc, c) => acc + (c.type === "credit" ? c.amount : -c.amount),
          0
        );
        setTotal(sum);
      }
    })();
  }, [user]);

  if (loading)
    return <div className="text-slate-400 text-center py-20">Loading...</div>;

  if (!user)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Login Required</h2>
        <p className="text-slate-400 mb-6">Please login to view your wallet.</p>
        <button
          onClick={signInWithCrowbar}
          className="bg-indigo-600 px-6 py-2 rounded-full text-white"
        >
          Sign in with Crowbar
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-2">Crowbar Wallet</h1>
      <p className="text-slate-400 mb-6">Your complete credit history</p>

      <WalletSummary total={total} />

      <div className="flex gap-4 my-6">
        <Link href="/wallet/earn" className="text-indigo-400">Earn Credits</Link>
        <Link href="/wallet/use" className="text-slate-400">Use Credits</Link>
      </div>

      <div className="grid gap-4">
        {credits.length === 0 ? (
          <p className="text-slate-600">No credit activity yet.</p>
        ) : (
          credits.map((entry, i) => <WalletEntry key={i} entry={entry} />)
        )}
      </div>
    </div>
  );
}
