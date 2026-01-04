import { Link } from "wouter";

export default function Auth() {
  // Redirect to backend login endpoint
  const handleLogin = () => {
    const returnUrl = window.location.pathname;
    window.location.href = `/api/login?returnUrl=${encodeURIComponent(returnUrl)}`;
  };

  return (
    <div className="min-h-screen bg-[#0B1F3B] text-white">
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold cursor-pointer">
            Timber<span className="text-[#00D084]">Money</span>
          </h1>
        </Link>
      </nav>

      <main className="container mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 max-w-xl">
          <div className="inline-block px-4 py-2 bg-[#00D084]/10 text-[#00D084] rounded-full border border-[#00D084]/20">
            🦫 Welcome to Timber
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold">
            Start Building Your<br />
            <span className="bg-gradient-to-r from-[#00D084] to-emerald-400 bg-clip-text text-transparent">
              Financial Dam
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg leading-relaxed">
            Sign in to access your automated financial dashboard. Timber helps you clear debt, stack assets, and build wealth — all on autopilot.
          </p>

          <div className="space-y-4 pt-4">
            <button
              onClick={handleLogin}
              className="w-full px-8 py-4 bg-[#00D084] text-[#0B1F3B] text-lg font-bold rounded shadow-lg shadow-[#00D084]/30 hover:bg-[#00D084]/90 transition-all"
            >
              Get Started Free
            </button>
            
            <p className="text-sm text-gray-400 text-center">
              By signing in, you agree to our{" "}
              <Link href="/terms" className="text-[#00D084] hover:underline">Terms</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-[#00D084] hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="relative w-96 h-96">
            <div className="absolute inset-0 bg-[#00D084]/20 blur-3xl rounded-full"></div>
            <img 
              src="/mascot/timber_v1.png" 
              alt="Timber the Beaver" 
              className="relative drop-shadow-2xl animate-bounce" 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

