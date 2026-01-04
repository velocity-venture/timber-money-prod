import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B1F3B] text-white">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Timber<span className="text-[#00D084]">Money</span>
        </h1>
        <div className="flex gap-6">
          <Link href="/auth"><button className="px-5 py-2 border border-[#00D084] text-[#00D084] rounded hover:bg-[#00D084]/10">Log In</button></Link>
          <Link href="/auth"><button className="px-5 py-2 bg-[#00D084] text-[#0B1F3B] font-bold rounded hover:bg-[#00D084]/90">Get Started Free</button></Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-20 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-block px-4 py-2 bg-[#00D084]/10 text-[#00D084] rounded-full border border-[#00D084]/20">
            ✨ Meet Timber: Your AI Financial Beaver
          </div>
          <h2 className="text-5xl lg:text-7xl font-bold">
            Build Your<br /><span className="bg-gradient-to-r from-[#00D084] to-emerald-400 bg-clip-text text-transparent">Financial Dam</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-xl">
            Turn your shoebox of receipts into automated wealth. Timber clears debt and stacks assets — no daily effort required.
          </p>
          <Link href="/auth">
            <button className="px-8 py-4 bg-[#00D084] text-[#0B1F3B] text-lg font-bold rounded shadow-lg shadow-[#00D084]/30 hover:bg-[#00D084]/90">
              Start Building Free
            </button>
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 bg-[#00D084]/20 blur-3xl rounded-full"></div>
            <img src="/mascot/timber_v1.png" alt="Timber the Beaver" className="relative drop-shadow-2xl animate-bounce" />
          </div>
        </div>
      </main>
    </div>
  );
}
