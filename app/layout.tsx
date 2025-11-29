import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Crowbar Wallet",
  description: "Unified credit tracking for Crowbar Connected Network users.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-[#0A0D14] text-white antialiased min-h-screen 
                   selection:bg-indigo-500/40 selection:text-white"
      >
        <AuthProvider>
          {/* Smooth fade-in for entire app */}
          <div className="animate-fade-in">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
