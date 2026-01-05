import { Link, useLocation } from "wouter";
import { useState } from "react";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Placeholder: For now, just redirect to dashboard
    // In production, this would call the auth API
    setTimeout(() => {
      setLocation("/dashboard");
    }, 500);
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

      <main className="container mx-auto px-6 pt-20 pb-32 max-w-md">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-block px-4 py-2 bg-[#00D084]/10 text-[#00D084] rounded-full border border-[#00D084]/20">
              🦫 Welcome to Timber
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold">
              Sign In to Your<br />
              <span className="bg-gradient-to-r from-[#00D084] to-emerald-400 bg-clip-text text-transparent">
                Financial Dam
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg">
              Access your automated financial dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-[#0B1F3B]/50 border border-[#00D084]/20 rounded-lg p-8">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-[#0B1F3B] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-[#0B1F3B] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-[#00D084] text-[#0B1F3B] text-lg font-bold rounded shadow-lg shadow-[#00D084]/30 hover:bg-[#00D084]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/auth" className="text-[#00D084] hover:underline font-medium">
                  Create Account
                </Link>
              </p>
              
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <Link href="/terms" className="text-[#00D084] hover:underline">Terms</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#00D084] hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

