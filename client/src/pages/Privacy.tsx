import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto space-y-6" data-testid="page-privacy">
      <div>
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: January 2025</p>
      </div>

      <Card>
        <CardContent className="prose prose-sm max-w-none p-8 dark:prose-invert">
          <h2>Your Privacy Matters</h2>
          <p>
            At Shoebox to Autopilot, we take your privacy and the security of your
            financial information extremely seriously. This policy explains how
            we handle your data.
          </p>

          <h3>Information We Collect</h3>
          <p>We collect the following types of information:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> Email, name, and profile
              information when you sign up
            </li>
            <li>
              <strong>Financial Data:</strong> Information you provide through
              uploaded documents, including debts, assets, income, and credit
              information
            </li>
            <li>
              <strong>Usage Data:</strong> How you interact with our service to
              improve your experience
            </li>
          </ul>

          <h3>How We Use Your Information</h3>
          <p>Your information is used solely to:</p>
          <ul>
            <li>Provide you with personalized financial analysis and advice</li>
            <li>Generate debt payoff strategies and financial plans</li>
            <li>Improve our AI models and service quality</li>
            <li>Communicate with you about your account and updates</li>
          </ul>

          <h3>Data Security</h3>
          <p>We implement industry-leading security measures:</p>
          <ul>
            <li>
              <strong>Encryption:</strong> All data is encrypted in transit and
              at rest using bank-level encryption (AES-256)
            </li>
            <li>
              <strong>Document Processing:</strong> Uploaded documents are
              processed in real-time and are not permanently stored on our
              servers
            </li>
            <li>
              <strong>Access Controls:</strong> Strict access controls ensure
              only you can access your financial data
            </li>
            <li>
              <strong>Regular Audits:</strong> We conduct regular security
              audits and penetration testing
            </li>
          </ul>

          <h3>Data Sharing</h3>
          <p>We never sell your data. We only share information with:</p>
          <ul>
            <li>
              <strong>Service Providers:</strong> Trusted partners who help us
              operate our service (like OpenAI for AI analysis), under strict
              confidentiality agreements
            </li>
            <li>
              <strong>Legal Requirements:</strong> When required by law or to
              protect our rights
            </li>
          </ul>

          <h3>Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access all data we have about you</li>
            <li>Request deletion of your account and all associated data</li>
            <li>Export your financial data</li>
            <li>Opt out of certain data processing activities</li>
            <li>Update or correct your information</li>
          </ul>

          <h3>Data Retention</h3>
          <p>
            We retain your data only as long as necessary to provide our
            services. When you delete your account, all your data is
            permanently removed from our systems within 30 days.
          </p>

          <h3>AI and Machine Learning</h3>
          <p>
            We use AI to analyze your financial documents. Your data is
            processed securely and is not used to train public AI models. All
            AI processing occurs in isolated, encrypted environments.
          </p>

          <h3>Contact Us</h3>
          <p>
            If you have questions about this privacy policy or how we handle
            your data, please contact us at{" "}
            <a href="mailto:privacy@debtfreedom.app">
              privacy@debtfreedom.app
            </a>
            .
          </p>

          <h3>Changes to This Policy</h3>
          <p>
            We may update this policy from time to time. We'll notify you of
            significant changes via email or through our service.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
