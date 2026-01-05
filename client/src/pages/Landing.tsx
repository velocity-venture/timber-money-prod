import { Link } from "wouter";
import { FileStack, Zap, CheckCircle2, CreditCard, TrendingUp, PiggyBank, Shield, BarChart3, X, Check } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B1F3B] text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Timber<span className="text-[#00D084]">Money</span>
        </h1>
        <div className="flex gap-6">
          <Link href="/auth"><button className="px-5 py-2 border border-[#00D084] text-[#00D084] rounded hover:bg-[#00D084]/10">Log In</button></Link>
          <Link href="/auth"><button className="px-5 py-2 bg-[#00D084] text-[#0B1F3B] font-bold rounded hover:bg-[#00D084]/90">Get Started Free</button></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
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
            <button className="px-8 py-4 bg-[#00D084] text-[#0B1F3B] text-lg font-bold rounded shadow-lg shadow-[#00D084]/30 hover:bg-[#00D084]/90 transition-all">
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

      {/* How Timber Works */}
      <section className="py-20 bg-[#0B1F3B]/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">How Timber Works</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Three simple steps to financial freedom</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-8 hover:border-[#00D084]/40 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#00D084]/20 flex items-center justify-center mb-6">
                <FileStack className="w-8 h-8 text-[#00D084]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Dump Your Shoebox</h3>
              <p className="text-gray-300">Upload all your bills, receipts, and statements. Timber sorts everything automatically — no categories, no tags, no manual entry.</p>
            </div>

            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-8 hover:border-[#00D084]/40 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#00D084]/20 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-[#00D084]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2. Deploy Autopilot</h3>
              <p className="text-gray-300">Timber creates your payoff plan and sets up automated rules. Once configured, it runs in the background — no daily check-ins needed.</p>
            </div>

            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-8 hover:border-[#00D084]/40 transition-all">
              <div className="w-16 h-16 rounded-full bg-[#00D084]/20 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#00D084]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Breathe Easy</h3>
              <p className="text-gray-300">Watch debt disappear and assets grow. Timber handles everything — you just live your life while your money works for you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Other Apps Feel Like Work */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Why Other Apps Feel Like Work</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Timber wins on autopilot — set it once, forget it forever</p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#00D084]/30">
                  <th className="text-left py-4 px-6 text-gray-300 font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 text-gray-300 font-semibold">Monarch</th>
                  <th className="text-center py-4 px-6 text-gray-300 font-semibold">YNAB</th>
                  <th className="text-center py-4 px-6 text-[#00D084] font-bold">Timber</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-6">Autopilot Mode</td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-[#00D084] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-6">No Daily Check-ins</td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-[#00D084] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-6">Shoebox Mode</td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-[#00D084] mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-4 px-6">AI Debt Strategy</td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-[#00D084] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6">Set & Forget</td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  <td className="text-center py-4 px-6"><Check className="w-5 h-5 text-[#00D084] mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Your Complete AI Money Suite */}
      <section className="py-20 bg-[#0B1F3B]/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Your Complete AI Money Suite</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Everything you need to build wealth, all in one place</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-6">
              <CreditCard className="w-10 h-10 text-[#00D084] mb-4" />
              <h3 className="text-xl font-bold mb-2">Bill Monitoring</h3>
              <p className="text-gray-400 text-sm">Never miss a payment. Timber tracks all bills and alerts you before due dates.</p>
            </div>

            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-6">
              <TrendingDown className="w-10 h-10 text-[#00D084] mb-4" />
              <h3 className="text-xl font-bold mb-2">Debt Planning</h3>
              <p className="text-gray-400 text-sm">AI-powered avalanche strategy to clear debt faster with optimal payoff plans.</p>
            </div>

            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-6">
              <PiggyBank className="w-10 h-10 text-[#00D084] mb-4" />
              <h3 className="text-xl font-bold mb-2">Savings Optimization</h3>
              <p className="text-gray-400 text-sm">Calculate safe monthly extra and automate savings goals with smart allocation.</p>
            </div>

            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-6">
              <BarChart3 className="w-10 h-10 text-[#00D084] mb-4" />
              <h3 className="text-xl font-bold mb-2">Wealth Tracking</h3>
              <p className="text-gray-400 text-sm">Monitor assets, investments, and net worth growth over time with visual dashboards.</p>
            </div>

            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-6">
              <Shield className="w-10 h-10 text-[#00D084] mb-4" />
              <h3 className="text-xl font-bold mb-2">Security First</h3>
              <p className="text-gray-400 text-sm">Bank-level encryption, no password storage, and privacy-first architecture.</p>
            </div>

            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-6">
              <Zap className="w-10 h-10 text-[#00D084] mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Advisor</h3>
              <p className="text-gray-400 text-sm">Get instant answers to financial questions with Timber's AI assistant.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">What People Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#00D084]/20 flex items-center justify-center mr-4">
                  <span className="text-xl">🦫</span>
                </div>
                <div>
                  <div className="font-bold">Sarah M.</div>
                  <div className="text-sm text-gray-400">Small Business Owner</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"Finally, an app that works while I sleep. Timber cleared $12K of debt in 8 months without me touching it once."</p>
            </div>

            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#00D084]/20 flex items-center justify-center mr-4">
                  <span className="text-xl">🦫</span>
                </div>
                <div>
                  <div className="font-bold">James K.</div>
                  <div className="text-sm text-gray-400">Software Engineer</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"I dumped my entire shoebox of receipts and Timber organized everything in minutes. This is the future of personal finance."</p>
            </div>

            <div className="bg-[#0B1F3B] border border-[#00D084]/20 rounded-lg p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#00D084]/20 flex items-center justify-center mr-4">
                  <span className="text-xl">🦫</span>
                </div>
                <div>
                  <div className="font-bold">Maria R.</div>
                  <div className="text-sm text-gray-400">Teacher</div>
                </div>
              </div>
              <p className="text-gray-300 italic">"Set it once, let it work. Timber runs in the background and I just watch my savings grow. No daily hassle."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-[#0B1F3B] to-[#0B1F3B]/80">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Stop Managing Money.<br />Start Living Life.
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands who've automated their finances with Timber. Set it once, forget it forever.
          </p>
          <Link href="/auth">
            <button className="px-12 py-6 bg-[#00D084] text-[#0B1F3B] text-xl font-bold rounded-lg shadow-xl shadow-[#00D084]/40 hover:bg-[#00D084]/90 transition-all transform hover:scale-105">
              Get Started Free
            </button>
          </Link>
          <p className="text-gray-400 text-sm mt-6">No credit card required • Setup in 2 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">
                Timber<span className="text-[#00D084]">Money</span>
              </h3>
              <p className="text-gray-400 text-sm mt-2">Build your financial dam</p>
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-[#00D084] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#00D084] transition-colors">Terms</Link>
              <Link href="/security" className="hover:text-[#00D084] transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
