export default function WalletSummary({ total }: { total: number }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg">
      <h3 className="text-sm opacity-80">Your Credits</h3>
      <p className="text-4xl font-bold mt-1">{total}</p>
    </div>
  );
}
