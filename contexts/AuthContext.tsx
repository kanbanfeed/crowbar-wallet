"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signInWithCrowbar = () => {
    const callbackUrl = `${window.location.origin}/auth/callback`;
    window.location.href =
      `https://www.crowbarltd.com/login?redirect_to=${encodeURIComponent(callbackUrl)}`;
  };

  const signOutUser = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const init = async () => {
      const hash = window.location.hash;
      if (hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1));
        const access = params.get("access_token");
        const refresh = params.get("refresh_token");

        await supabase.auth.setSession({
          access_token: access!,
          refresh_token: refresh!,
        });

        window.history.replaceState({}, "", window.location.pathname);
      }

      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    init();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signInWithCrowbar, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
