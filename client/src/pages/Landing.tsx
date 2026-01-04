import { Link } from "wouter";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A192F] text-white font-sans selection:bg-[#64FFDA] selection:text-[#0A192F]">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">
            Timber<span className="text-[#64FFDA]">Money</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/auth">
            <button className="px-5 py-2 rounded border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10 transition-colors">
              Log In
            </button>
          </Link>
          <Link href="/auth">
            <button className="px-5 py-2 rounded bg-[#64FFDA] text-[#0A192F] font-bold hover:bg-[#64FFDA]/90 transition-transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#64FFDA]/10 text-[#64FFDA] text-sm font-medium border border-[#64FFDA]/20">
            <span>✨ Meet Timber: Your AI Financial Guide</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            Build Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#64FFDA] to-emerald-500">
              Financial Dam
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
            Transform your shoebox of receipts into a fortress of wealth. 
            Timber the Beaver helps you clear the "termites" (debt) and stack your "logs" (assets) automatically.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/auth">
              <button className="h-14 px-8 rounded bg-[#64FFDA] text-[#0A192F] text-lg font-bold hover:bg-[#64FFDA]/90 transition-all shadow-[0_0_20px_rgba(100,255,218,0.3)]">
                Start Building Free
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center items-center">
          {/* Mascot Container - No Background Color */}
          <div className="relative w-[500px] h-[500px] animate-float">
             {/* Glow Effect behind mascot */}
            <div className="absolute inset-0 bg-[#64FFDA]/20 blur-[100px] rounded-full -z-10"></div>
            
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
