"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import {
  ArrowRight,
  WalletCards,
  Crown,
  Sparkles,
  TrendingUp,
  Gift,
  Zap,
  Users,
  Target,
  Calendar,
  CreditCard,
  Coins,
  History,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Star,
  Rocket,
  Shield,
  BarChart3,
  LogOut,
  X,
  Construction,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";


// Mock data - replace with actual API calls
const mockCreditData = {
  balance: 1250,
  history: [
    {
      id: 1,
      type: "earned",
      amount: 500,
      description: "Profile Completion",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      type: "earned",
      amount: 250,
      description: "Referral Bonus",
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      type: "earned",
      amount: 300,
      description: "Weekly Challenge",
      date: "2024-01-13",
      status: "completed",
    },
    {
      id: 4,
      type: "used",
      amount: -200,
      description: "Premium Feature",
      date: "2024-01-12",
      status: "completed",
    },
    {
      id: 5,
      type: "earned",
      amount: 400,
      description: "Skill Event",
      date: "2024-01-10",
      status: "completed",
    },
  ],
  upcoming: [
    {
      id: 6,
      type: "pending",
      amount: 150,
      description: "Tier Achievement",
      date: "2024-01-20",
      status: "pending",
    },
  ],
};

const earningMethods = [
  {
    icon: Target,
    title: "Complete Profile",
    description: "Finish setting up your Crowbar profile",
    credits: 500,
    status: "completed",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Refer Friends",
    description: "Earn credits for each successful referral",
    credits: 250,
    status: "available",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Skill Events",
    description: "Participate in weekly skill challenges",
    credits: 300,
    status: "available",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Crown,
    title: "Tier Achievements",
    description: "Unlock new tiers and earn bonus credits",
    credits: 400,
    status: "available",
    color: "from-rose-500 to-pink-500",
  },
];

const features = [
  {
    icon: Rocket,
    title: "Instant Updates",
    description: "Real-time credit tracking and synchronization",
    color: "text-blue-600",
  },
  {
    icon: Shield,
    title: "Secure & Verified",
    description: "Bank-level security with Crowbar verification",
    color: "text-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Detailed insights into your credit activity",
    color: "text-purple-600",
  },
  {
    icon: Star,
    title: "Premium Rewards",
    description: "Exclusive benefits for active members",
    color: "text-amber-600",
  },
];

export default function WalletLanding() {
  const { user, loading, signInWithCrowbar, signOutUser } = useAuth();
  const [mobileMenu, setMobileMenu] = useState(false);

  const [creditData, setCreditData] = useState(mockCreditData);
  const [activeTab, setActiveTab] = useState("all");

  /** ⭐ Dropdown closing issue fix */
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /** ⭐ Coming Soon placeholder overlay */
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredHistory =
    activeTab === "all"
      ? creditData.history
      : creditData.history.filter((item) => item.type === activeTab);

  const formatUserEmail = (email: string) =>
    email.length > 20 ? `${email.substring(0, 20)}...` : email;

  const openPlaceholder = () => {
    setShowPlaceholder(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900 scroll-smooth overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* ========== MODERN NAVBAR ========== */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 group cursor-pointer"
    >
      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
        <WalletCards className="w-5 h-5 text-white" />
      </div>
      <div>
        <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Crowbar Wallet
        </span>
        <div className="text-xs text-slate-500 -mt-1">Credit Management</div>
      </div>
    </motion.div>

    {/* ---------------- MOBILE MENU BUTTON ---------------- */}
    <div className="md:hidden">
      <button
        onClick={() => setMobileMenu((prev) => !prev)}
        className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
      >
        {mobileMenu ? (
          <X className="w-6 h-6 text-slate-700" />
        ) : (
          <Menu className="w-6 h-6 text-slate-700" />
        )}
      </button>
    </div>

    {/* ---------------- DESKTOP NAV LINKS ---------------- */}
    <nav className="hidden md:flex items-center gap-8">
      {["Home", "Credits", "Earn", "Use"].map((item, index) => (
        <motion.a
          key={item}
          href={`#${item.toLowerCase()}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group"
        >
          {item}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all"></span>
        </motion.a>
      ))}
    </nav>

    {/* ---------------- RIGHT SIDE AUTH ---------------- */}
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      {loading ? (
        <div className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl">
          Checking...
        </div>
      ) : user ? (
        <div className="hidden md:flex items-center gap-4">
          {/* Email */}
          <div className="hidden sm:block text-right">
            <div className="text-sm font-semibold text-emerald-600">
              Welcome back!
            </div>
            <div className="text-xs text-slate-500">
              {formatUserEmail(user.email || "")}
            </div>
          </div>

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen((p) => !p)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-semibold flex items-center justify-center shadow-md hover:scale-105 transition-transform"
            >
              {user.email?.charAt(0).toUpperCase()}
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-50">
                <div className="p-4 border-b border-slate-100">
                  <div className="text-sm font-semibold text-slate-900 truncate">
                    {user.email}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Crowbar Account
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    signOutUser();
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 text-sm text-slate-600 hover:bg-slate-50 rounded-b-xl"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={signInWithCrowbar}
          className="hidden md:flex px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-xl gap-2"
        >
          <WalletCards className="w-4 h-4" />
          Sign In with Crowbar
        </button>
      )}
    </motion.div>
  </div>

  {/* ---------------- MOBILE DROPDOWN MENU ---------------- */}
  {mobileMenu && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="md:hidden bg-white border-t border-slate-200 shadow-lg px-6 py-4 space-y-4"
    >
      {["Home", "Credits", "Earn", "Use"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          onClick={() => setMobileMenu(false)}
          className="block text-slate-700 text-lg font-medium py-2"
        >
          {item}
        </a>
      ))}

      {/* Auth inside mobile menu */}
      {!user ? (
        <button
          onClick={signInWithCrowbar}
          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-md"
        >
          Sign In with Crowbar
        </button>
      ) : (
        <button
          onClick={signOutUser}
          className="w-full px-6 py-3 bg-red-100 text-red-600 rounded-xl"
        >
          Sign Out
        </button>
      )}
    </motion.div>
  )}
</header>


      {/* ========== VIBRANT HERO SECTION ========== */}
      <section id="home" className="pt-36 pb-28 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-full border border-cyan-200 bg-cyan-50 text-cyan-700 mb-6 backdrop-blur-sm font-medium"
        >
          <Sparkles className="w-4 h-4" />
          Crowbar Connected Network • Live Credit Tracking
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Your Digital
          <span className="block bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
            Credit Hub
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Track, earn, and manage your Crowbar credits in one beautifully designed
          interface. Real-time updates, comprehensive history, and seamless
          integration.
        </motion.p>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <feature.icon className={`w-6 h-6 ${feature.color} mb-2 mx-auto`} />
              <div className="text-xs font-semibold text-slate-700">
                {feature.title}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {!user ? (
            <>
              <button
                onClick={signInWithCrowbar}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group shadow-cyan-500/25"
              >
                <WalletCards className="w-5 h-5" />
                Sign In with Crowbar SSO
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={openPlaceholder}
                className="px-8 py-4 rounded-xl border border-slate-300 bg-white/80 hover:bg-white text-slate-700 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm"
              >
                Watch Demo
              </button>
            </>
          ) : (
            <motion.div
              className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/60"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                {creditData.balance} Credits
              </div>
              <div className="text-slate-600 font-medium">Current Balance</div>
              <div className="text-sm text-slate-500 mt-2">
                Live from Crowbar Dashboard
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Conditional rendering based on authentication */}
      {user ? (
        <>
          {/* ========== CREDIT DASHBOARD SECTION ========== */}
          <section id="credits" className="max-w-6xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Credit Dashboard
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
                Welcome back! Heres your complete credit overview.
              </p>
            </motion.div>

            {/* Balance Cards */}
            <div className="grid lg:grid-cols-3 gap-6 mb-12">
              {/* Total Balance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl shadow-blue-500/25"
              >
                <div className="flex items-center justify-between mb-4">
                  <Coins className="w-8 h-8 text-cyan-100" />
                  <TrendingUp className="w-6 h-6 text-emerald-200" />
                </div>
                <div className="text-3xl font-bold mb-2">{creditData.balance}</div>
                <div className="text-cyan-100 font-semibold">Total Credits</div>
                <div className="text-cyan-200 text-sm mt-2">Live from Crowbar DB</div>
              </motion.div>

              {/* Available Credits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <WalletCards className="w-8 h-8 text-blue-600" />
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <div className="text-3xl font-bold mb-2 text-slate-900">
                  {creditData.balance - 200}
                </div>
                <div className="text-slate-700 font-semibold">Available Now</div>
                <div className="text-slate-500 text-sm mt-2">Ready to use</div>
              </motion.div>

              {/* Pending Credits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-amber-600" />
                  <Gift className="w-6 h-6 text-violet-600" />
                </div>
                <div className="text-3xl font-bold mb-2 text-slate-900">150</div>
                <div className="text-slate-700 font-semibold">Pending</div>
                <div className="text-slate-500 text-sm mt-2">Next reward: Jan 20</div>
              </motion.div>
            </div>

            {/* Credit History */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-3">
                    <History className="w-5 h-5 text-cyan-600" />
                    Credit History
                  </h3>

                  {/* Filter Tabs */}
                  <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
                    {[
                      { id: "all", label: "All" },
                      { id: "earned", label: "Earned" },
                      { id: "used", label: "Used" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          activeTab === tab.id
                            ? "bg-white text-cyan-700 shadow-sm"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  {filteredHistory.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors group border border-transparent hover:border-slate-200"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            transaction.type === "earned"
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-rose-100 text-rose-600"
                          } group-hover:scale-110 transition-transform`}
                        >
                          {transaction.type === "earned" ? (
                            <TrendingUp className="w-5 h-5" />
                          ) : (
                            <CreditCard className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {transaction.description}
                          </div>
                          <div className="text-sm text-slate-500 flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {transaction.date}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`text-lg font-bold ${
                          transaction.type === "earned"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        }`}
                      >
                        {transaction.type === "earned" ? "+" : ""}
                        {transaction.amount}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* ========== VIBRANT EARN CREDITS SECTION ========== */}
          <section id="earn" className="max-w-6xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Earn Credits
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
                Multiple ways to grow your credit balance and unlock premium features
                across the Crowbar network.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {earningMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-slate-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <method.icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">
                        +{method.credits}
                      </div>
                      <div className="text-sm text-slate-500">credits</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">{method.description}</p>

                  <button
                    onClick={
                      method.status === "completed" ? undefined : openPlaceholder
                    }
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                      method.status === "completed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                        : `bg-gradient-to-r ${method.color} hover:shadow-lg text-white`
                    }`}
                    disabled={method.status === "completed"}
                  >
                    {method.status === "completed" ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed
                      </span>
                    ) : (
                      "Start Earning"
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ========== PREMIUM USE CREDITS SECTION ========== */}
          <section id="use" className="max-w-6xl mx-auto px-6 py-20 pb-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Use Credits
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
                Redeem your credits for exclusive features, premium content, and
                special privileges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              onClick={openPlaceholder}
              role="button"
              tabIndex={0}
              className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-8 text-center text-white shadow-xl shadow-purple-500/25 overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/30">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Premium Redemption Coming Soon
                </h3>
                <p className="text-violet-100 text-lg mb-6 max-w-md mx-auto">
                  We are building an incredible marketplace for you to spend your
                  hard-earned credits. Launching Q1 2025.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="px-4 py-2 rounded-full bg-white/20 text-violet-100 text-sm border border-white/30 backdrop-blur-sm">
                    Exclusive Features
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/20 text-violet-100 text-sm border border-white/30 backdrop-blur-sm">
                    Premium Content
                  </div>
                  <div className="px-4 py-2 rounded-full bg-white/20 text-violet-100 text-sm border border-white/30 backdrop-blur-sm">
                    Special Access
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </>
      ) : (
        /* ========== PUBLIC LANDING CONTENT ========== */
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-slate-200/60"
          >
            <WalletCards className="w-16 h-16 text-cyan-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Sign In to Access Your Credit Dashboard
            </h2>
            <p className="text-slate-600 text-lg mb-8 max-w-md mx-auto">
              Connect with your Crowbar account to view your credit balance,
              transaction history, and earning opportunities.
            </p>
            <button
              onClick={signInWithCrowbar}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <WalletCards className="w-5 h-5" />
              Sign In with Crowbar SSO
            </button>
          </motion.div>
        </section>
      )}

      {/* ========== COMING SOON PLACEHOLDER OVERLAY ========== */}
      {showPlaceholder && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative max-w-md w-full mx-4 rounded-3xl bg-white shadow-2xl p-8 text-center"
          >
            <button
              onClick={() => setShowPlaceholder(false)}
              className="absolute top-4 right-4 rounded-full p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <Construction className="w-8 h-8 text-indigo-600" />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-slate-900 mb-2">
              Coming Soon
            </h2>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">
              This Crowbar Wallet feature is still being finalised. Please check
              back soon for the full experience.
            </p>

            <button
              onClick={() => setShowPlaceholder(false)}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md"
            >
              Go Back
            </button>
          </motion.div>
        </div>
      )}

      {/* ========== MODERN FOOTER ========== */}
      <footer className="bg-[#211832] backdrop-blur-sm border-t border-slate-200/60 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
                <WalletCards className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-white">
                  Crowbar Wallet
                </span>
                <div className="text-xs text-white">Credit Management System</div>
              </div>
            </div>

            <div className="text-white text-sm text-center md:text-right">
              <div className="font-medium">
                © 2025 Crowbar Wallet — Part of the Crowbar Connected Network
              </div>
              <div className="text-xs mt-1 text-white">
                Securely integrated with Crowbar Dashboard
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
