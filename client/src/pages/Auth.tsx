import { Link } from "wouter";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
      
      setEmailSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send magic link");
    } finally {
      setIsSubmitting(false);
    }
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

          {emailSent ? (
            <div className="bg-[#0B1F3B]/50 border border-[#00D084]/20 rounded-lg p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00D084]/20 flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-[#00D084]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Check your email</h2>
              <p className="text-gray-300">
                We've sent a magic link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-400">
                Click the link in the email to sign in. The link will expire in 1 hour.
              </p>
              <button
                onClick={() => {
                  setEmailSent(false);
                  setEmail("");
                }}
                className="text-[#00D084] hover:underline text-sm"
              >
                Use a different email
              </button>
            </div>
          ) : (
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

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#00D084] text-[#0B1F3B] text-lg font-bold rounded shadow-lg shadow-[#00D084]/30 hover:bg-[#00D084]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending magic link..." : "Send Magic Link"}
              </button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-400">
                  No password needed! We'll send you a secure link to sign in.
                </p>
                
                <p className="text-xs text-gray-500">
                  By signing in, you agree to our{" "}
                  <Link href="/terms" className="text-[#00D084] hover:underline">Terms</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-[#00D084] hover:underline">Privacy Policy</Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

