"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Crown } from "lucide-react";

export function WalletNavbar() {
  const { user, loading, signInWithCrowbar, signOutUser } = useAuth();

  return (
    <header className="border-b border-slate-800 bg-[#0F1620]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link href="/wallet" className="flex items-center gap-3">
          <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 font-semibold shadow">
            CW
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-sm">Crowbar Wallet</p>
            <p className="text-xs text-slate-400">Credit Activity Log</p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/wallet" className="text-sm text-slate-300 hover:text-white">
            Wallet
          </Link>
          <Link href="/wallet/earn" className="text-sm text-slate-300 hover:text-white">
            Earn Credits
          </Link>
          <Link href="/wallet/use" className="text-sm text-slate-300 hover:text-white">
            Use Credits
          </Link>

          {!loading && (
            <>
              {!user ? (
                <button
                  onClick={signInWithCrowbar}
                  className="bg-indigo-600 px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-indigo-500"
                >
                  Sign in with Crowbar
                </button>
              ) : (
                <button
                  onClick={signOutUser}
                  className="border border-slate-700 px-4 py-1.5 rounded-full text-xs hover:border-red-500 hover:bg-red-600/10"
                >
                  Logout
                </button>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
