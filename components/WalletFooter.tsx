export default function WalletFooter() {
  return (
    <footer className="relative bg-[#0F1620] py-10 mt-16">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />

      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h3 className="text-lg font-semibold">Crowbar Wallet</h3>
          <p className="text-slate-400 text-sm">
            Track your credit earnings & usage.
          </p>
        </div>

        <div className="text-sm text-slate-300">
          Part of the <span className="text-yellow-400 font-medium">Crowbar Connected Network</span>
          <p className="text-xs text-slate-500">© 2024 Crowbar Wallet</p>
        </div>

      </div>
    </footer>
  );
}
