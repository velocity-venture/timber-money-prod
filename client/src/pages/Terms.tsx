import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto space-y-6" data-testid="page-terms">
      <div>
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: January 2025</p>
      </div>

      <Card>
        <CardContent className="prose prose-sm max-w-none p-8 dark:prose-invert">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using Debt Freedom, you agree to be bound by these
            Terms of Service. If you disagree with any part of these terms,
            you may not access the service.
          </p>

          <h3>Service Description</h3>
          <p>
            Debt Freedom provides AI-powered financial analysis and debt
            management tools. Our service analyzes your uploaded financial
            documents to provide personalized insights, debt payoff strategies,
            and financial advice.
          </p>

          <h3>Important Disclaimers</h3>
          <p>
            <strong>Not Financial Advice:</strong> The information and
            recommendations provided by Debt Freedom are for informational
            purposes only and do not constitute professional financial,
            investment, or legal advice. You should consult with a qualified
            financial advisor for personalized advice.
          </p>
          <p>
            <strong>AI Limitations:</strong> While our AI is highly
            sophisticated, it may occasionally make errors in document analysis
            or recommendations. Always verify important financial information.
          </p>
          <p>
            <strong>No Guarantees:</strong> We do not guarantee specific
            financial outcomes. Results depend on many factors including your
            individual circumstances and actions.
          </p>

          <h3>User Responsibilities</h3>
          <p>You agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Keep your account credentials secure</li>
            <li>Use the service in compliance with all applicable laws</li>
            <li>Not attempt to hack, reverse engineer, or abuse the service</li>
            <li>Not upload malicious files or spam the service</li>
          </ul>

          <h3>Acceptable Use</h3>
          <p>You may not use Debt Freedom to:</p>
          <ul>
            <li>Violate any laws or regulations</li>
            <li>Infringe on others' intellectual property rights</li>
            <li>Upload documents that don't belong to you</li>
            <li>Attempt to bypass payment or subscription requirements</li>
            <li>Resell or redistribute our service</li>
          </ul>

          <h3>Subscription and Payments</h3>
          <ul>
            <li>
              <strong>Billing:</strong> Subscriptions are billed monthly in
              advance
            </li>
            <li>
              <strong>Cancellation:</strong> You may cancel anytime. Your
              access continues until the end of the billing period
            </li>
            <li>
              <strong>Refunds:</strong> We offer refunds within 14 days of
              initial purchase if you're not satisfied
            </li>
            <li>
              <strong>Price Changes:</strong> We may change pricing with 30
              days notice
            </li>
          </ul>

          <h3>Intellectual Property</h3>
          <p>
            All content, features, and functionality of Debt Freedom are owned
            by us and protected by copyright, trademark, and other laws. You
            retain ownership of your financial data.
          </p>

          <h3>Termination</h3>
          <p>
            We reserve the right to terminate or suspend your account for
            violations of these terms, fraudulent activity, or for any reason
            with notice. Upon termination, your right to use the service ceases
            immediately.
          </p>

          <h3>Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, Debt Freedom shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, or any loss of profits or revenues, whether
            incurred directly or indirectly, or any loss of data, use, goodwill,
            or other intangible losses resulting from your use of the service.
          </p>

          <h3>Changes to Terms</h3>
          <p>
            We may revise these terms from time to time. The most current
            version will always be posted on our website. By continuing to use
            the service after changes become effective, you agree to be bound
            by the revised terms.
          </p>

          <h3>Contact</h3>
          <p>
            Questions about these Terms should be sent to{" "}
            <a href="mailto:legal@debtfreedom.app">legal@debtfreedom.app</a>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
