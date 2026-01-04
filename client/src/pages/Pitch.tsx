import { Link } from "wouter";

export default function Pitch() {
  return (
    <div className="min-h-screen bg-[#0B1F3B] text-white font-sans">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">
            Timber<span className="text-[#00D084]">Money</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/auth">
            <button className="px-5 py-2 rounded border border-[#00D084] text-[#00D084] hover:bg-[#00D084]/10 transition-colors">
              Log In
            </button>
          </Link>
          <Link href="/auth">
            <button className="px-5 py-2 rounded bg-[#00D084] text-[#0B1F3B] font-bold hover:bg-[#00D084]/90 transition-transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D084]/10 text-[#00D084] text-sm font-medium border border-[#00D084]/20">
            <span>✨ Meet Timber: Your AI Financial Guide</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D084] to-emerald-400">
              Financial Dam
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Turn your shoebox of receipts into automated wealth. 
            Timber the Beaver helps you clear the "termites" (debt) and stack your "logs" (assets) automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/auth">
              <button className="h-14 px-8 rounded bg-[#00D084] text-[#0B1F3B] text-lg font-bold hover:bg-[#00D084]/90 transition-all shadow-[0_0_20px_rgba(0,208,132,0.3)]">
                Start Building Free
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center items-center">
          {/* Mascot Container */}
          <div className="relative w-[500px] h-[500px] animate-float">
             {/* Glow Effect */}
            <div className="absolute inset-0 bg-[#00D084]/20 blur-[100px] rounded-full -z-10"></div>
            
            {/* The Mascot */}
            <img 
              src="/mascot/timber_v1.png" 
              alt="Timber the Beaver" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
