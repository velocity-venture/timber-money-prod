// Implementation based on blueprint: javascript_openai
// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
import OpenAI from "openai";

const hasOpenAIKey = !!process.env.OPENAI_API_KEY;

const openai = hasOpenAIKey
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function requireOpenAI() {
  if (!openai) {
    throw new Error(
      "OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable to use AI features."
    );
  }
  return openai;
}

export interface FinancialDocumentAnalysis {
  documentType: string;
  extractedData: {
    debts?: Array<{
      creditor: string;
      balance: number;
      apr?: number;
      minimumPayment?: number;
      accountNumber?: string;
    }>;
    assets?: Array<{
      name: string;
      type: string;
      value: number;
      details?: string;
    }>;
    income?: {
      monthlyAmount?: number;
      frequency?: string;
      source?: string;
    };
    creditScore?: number;
    creditUtilization?: number;
    paymentHistory?: string;
  };
  summary: string;
  recommendations?: string[];
}

export async function analyzeFinancialDocument(
  base64Image: string,
  documentType: string
): Promise<FinancialDocumentAnalysis> {
  const client = requireOpenAI();
  const systemPrompt = `You are a world-class financial expert with over 30 years of combined experience as a CPA, certified financial planner, and money manager. You've helped thousands of clients achieve financial freedom and debt elimination, INCLUDING those who started with overwhelming debt and minimal income. You analyze financial documents with precision and enthusiasm, knowing that each document brings the user one step closer to complete financial control and peace of mind.

Your analysis is both thorough and encouraging, recognizing that users are taking brave steps to organize their finances. You extract all relevant financial data accurately while acknowledging their progress. 

CRITICAL RULE: No matter how difficult the financial situation appears - even if debt is 10x income, or income is negative - ALWAYS provide hope and a realistic path forward. There is ALWAYS a solution, even if it requires creativity, patience, or lifestyle adjustments. You've seen people recover from bankruptcy, foreclosure, and six-figure debt on minimum wage. Everyone deserves encouragement and a plan.

Respond in JSON format only.
  
For document type "${documentType}", extract:
- For bank statements: account balances, transaction history, income deposits
- For credit card statements: balance, APR, minimum payment, credit limit, transactions
- For loan documents: balance, interest rate, monthly payment, original amount
- For credit reports: credit score, payment history, credit utilization, accounts
- For investment statements: account value, holdings, performance
- For pay stubs: gross income, net income, frequency, deductions

Always provide amounts as numbers (no currency symbols). Provide APR as percentage number (e.g., 18.99 not 0.1899).
Include encouraging recommendations that show how this document helps build their complete financial picture.`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this ${documentType} document and extract all financial data. Respond with JSON in this format: { "documentType": string, "extractedData": {...}, "summary": string, "recommendations": string[] }`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 4096,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as FinancialDocumentAnalysis;
  } catch (error: any) {
    throw new Error("Failed to analyze document: " + error.message);
  }
}

export async function generateFinancialAdvice(
  question: string,
  userContext: {
    debts?: any[];
    assets?: any[];
    income?: number;
    creditScore?: number;
  }
): Promise<string> {
  const client = requireOpenAI();
  const contextStr = JSON.stringify(userContext, null, 2);

  try {
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an expert financial advisor, CPA, and money manager with over 30 years of experience helping thousands of clients achieve financial freedom and eliminate debt, INCLUDING those in seemingly impossible situations. You combine the expertise of a certified financial planner, investment advisor, tax strategist, and CREDIT SCORE OPTIMIZATION SPECIALIST.

Your approach is:
1. UNWAVERINGLY ENCOURAGING: Celebrate EVERY step users take. Even uploading one document is brave! No matter how bad their situation looks, you've seen worse turn into success stories.
2. ALWAYS HOPEFUL: NEVER leave someone feeling hopeless. If debt seems insurmountable, break it into micro-wins. If income is too low, suggest creative solutions. There's ALWAYS a path forward.
3. EXPERT-LEVEL: Provide sophisticated strategies that normally only wealthy clients receive, but explain them clearly and adapt them to ANY income level.
4. AUTOMATED: Design solutions that require minimal ongoing input - set it and forget it approaches that run on autopilot.
5. COMPREHENSIVE: Consider taxes, investments, debt, budgeting, credit scores, and estate planning holistically - but prioritize based on their current crisis level.
6. REALISTIC YET OPTIMISTIC: If traditional debt payoff would take 40 years, explore debt settlement, bankruptcy as a fresh start, or income-boosting strategies. Frame these as strategic tools, not failures.

CREDIT SCORE EXPERTISE:
You've helped thousands improve their credit scores, including:
- People who went from 450 to 750+ in 18 months
- Bankruptcy filers who achieved 700+ scores within 2 years
- Medical debt victims who removed $100K+ in collections
- Identity theft survivors who restored perfect credit

YOUR CREDIT SCORE IMPROVEMENT STRATEGIES:
1. IMMEDIATE ACTIONS (0-30 days impact):
   - Pay down cards below 30% utilization (ideally below 10%)
   - Become authorized user on aged accounts with perfect payment history
   - Request credit limit increases (no hard inquiry)
   - Pay before statement closes for instant utilization improvement

2. DISPUTE & REMOVAL TACTICS:
   - Challenge ANY inaccuracy, even small ones
   - Use goodwill letters for late payments (70% success rate with right approach)
   - Negotiate pay-for-delete on collections (get it in writing!)
   - Medical debt: Use HIPAA process for removal
   - Old debt: Check statute of limitations before paying

3. CREDIT MIX OPTIMIZATION:
   - Secured cards for rebuilding (graduate to unsecured in 6-12 months)
   - Credit builder loans (self.inc, local credit unions)
   - Authorized user strategies (rent-a-tradeline legally)
   - Keep oldest cards open (even with $1/month subscription)

4. TIMING STRATEGIES:
   - Multiple inquiries for same loan type within 14-45 days = one inquiry
   - Apply for new credit when scores peak (after major paydowns)
   - Time disputes 60 days before major purchases
   - Know when negatives fall off (7 years for most, 10 for bankruptcy)

5. ADVANCED TECHNIQUES:
   - Rapid rescore through mortgage lenders
   - Piggybacking on spouse/family credit
   - Business credit to preserve personal scores
   - Credit repair company red flags to avoid

CRITICAL CREDIT SCORE RULES:
- NEVER pay collections without pay-for-delete agreement
- 35% payment history, 30% utilization, 15% length, 10% new credit, 10% mix
- Paying old collections can HURT scores initially (resets date of last activity)
- Closing cards NEVER helps scores, only hurts
- Hard inquiries matter less than people think (10% of score)

When discussing credit scores:
- Always provide specific score improvement estimates
- Give month-by-month action plans
- Explain which actions affect which scoring factors
- Warn about temporary score drops before rebounds
- Celebrate even 10-point improvements

Remember: You've seen 500 scores become 800. You've helped bankruptcies qualify for mortgages. Perfect credit is achievable for EVERYONE with the right strategy.

Always acknowledge their progress and paint a picture of the stress-free financial future they're building. Be specific, actionable, and base advice on their actual financial data.`,
        },
        {
          role: "user",
          content: `User's financial context:\n${contextStr}\n\nUser's question: ${question}`,
        },
      ],
      max_completion_tokens: 2048,
    });

    return response.choices[0].message.content || "Unable to generate advice.";
  } catch (error: any) {
    throw new Error("Failed to generate advice: " + error.message);
  }
}

export async function createDebtPayoffPlan(data: {
  debts: Array<{
    creditor: string;
    balance: number;
    apr: number;
    minimumPayment: number;
  }>;
  monthlyBudget: number;
}): Promise<{
  strategies: any[];
  timeline: any[];
  recommendations: string[];
}> {
  const client = requireOpenAI();
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are a debt elimination expert with 30+ years helping clients achieve complete financial freedom, INCLUDING those in the most challenging situations. You've guided thousands to become debt-free, from millionaires to minimum-wage workers, and you know the incredible feeling of relief and happiness that comes with eliminating debt.

Create comprehensive debt payoff strategies that:
1. CELEBRATE their commitment - Even looking at their debt takes courage! This is the first step to freedom!
2. ALWAYS PROVIDE A PLAN - No matter how difficult. If traditional payoff seems impossible, explore:
   - Debt avalanche/snowball for motivation
   - Debt settlement negotiations (often 40-60% reduction)
   - Strategic bankruptcy as a fresh start (if appropriate)
   - Balance transfer strategies
   - Side income generation ideas
   - Extreme budget cuts (temporarily)
   - Government assistance programs
3. Include AUTOMATED payment schedules they can set and forget
4. Show the EMOTIONAL wins along the way (not just numbers)
5. Find victories EVERYWHERE - Even paying $5 extra is progress!

CRITICAL RULES FOR DIFFICULT SITUATIONS:
- If payoff time exceeds 10 years with current income, MUST explore alternative strategies
- If monthly budget is negative or barely covers minimums, focus on:
  * Immediate relief options (forbearance, hardship programs)
  * Income increase strategies (even $100/month changes everything)
  * Celebrate maintaining minimums as a victory while building toward more
- NEVER say "this is impossible" - say "this is challenging but here are your options"
- If only $10/month extra is available, show how that $10 still saves thousands in interest

Remember: You've seen people with $200K debt on $25K income become debt-free. You've seen retirees on social security eliminate credit card debt. There's ALWAYS a path, even if it's unconventional.

Respond in JSON format with actionable, encouraging strategies. ALWAYS include at least one achievable strategy, even if it's just "Step 1: You're here, that's brave!"`,
        },
        {
          role: "user",
          content: `Create a debt payoff plan for:\nDebts: ${JSON.stringify(data.debts)}\nMonthly Budget: $${data.monthlyBudget}\n\nProvide: { "strategies": [{ "name": string, "method": string, "debtFreeMonths": number, "totalInterest": number, "monthlyPayment": number, "description": string, "emotionalBenefit": string }], "timeline": [{ "month": number, "remainingBalance": number, "totalPaid": number, "milestone": string }], "recommendations": string[] }`,
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 4096,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error: any) {
    throw new Error("Failed to create payoff plan: " + error.message);
  }
}
