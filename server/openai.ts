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
  const systemPrompt = `You are a world-class financial accountant analyzing financial documents. Extract all relevant financial data accurately. Respond in JSON format only.
  
For document type "${documentType}", extract:
- For bank statements: account balances, transaction history, income deposits
- For credit card statements: balance, APR, minimum payment, credit limit, transactions
- For loan documents: balance, interest rate, monthly payment, original amount
- For credit reports: credit score, payment history, credit utilization, accounts
- For investment statements: account value, holdings, performance
- For pay stubs: gross income, net income, frequency, deductions

Always provide amounts as numbers (no currency symbols). Provide APR as percentage number (e.g., 18.99 not 0.1899).`;

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
          content: `You are a professional financial advisor helping users manage their finances. Be specific, actionable, and empathetic. Base your advice on the user's actual financial data.`,
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
          content: `You are a debt management expert. Create detailed debt payoff strategies including avalanche, snowball, and hybrid methods. Calculate timelines and savings. Respond in JSON format.`,
        },
        {
          role: "user",
          content: `Create a debt payoff plan for:\nDebts: ${JSON.stringify(data.debts)}\nMonthly Budget: $${data.monthlyBudget}\n\nProvide: { "strategies": [{ "name": string, "method": string, "debtFreeMonths": number, "totalInterest": number, "monthlyPayment": number, "description": string }], "timeline": [{ "month": number, "remainingBalance": number, "totalPaid": number }], "recommendations": string[] }`,
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
