function PrivacyPolicy() {
  return (
    <div className="container py-28 mx-auto space-y-8 max-w-4xl">
      <h2 className="text-4xl font-bold">Privacy Policy</h2>
      <div className="flex flex-col gap-8 list-decimal">
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">1. Information We Collect</h3>
          <p>
            By accessing and using NovaChat, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any of these terms, you are prohibited from using or
            accessing this service.
          </p>
          <ul className="pl-6 list-disc">
            <li>Account information(name, email, password)</li>
            <li>Profile information(avatar, bio)</li>
            <li>Communication content</li>
            <li>Usage data and analytics</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">
            2. How We Use Your Information
          </h3>
          <p>We use the information we collect to:</p>
          <ul className="pl-6 list-disc">
            <li>Provide, maintain, and improve our services</li>
            <li>Process your transactions</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, investigate, and prevent security incidents</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">3. Data Security</h3>
          <p>
            You agree to use NovaChat only for lawful purposes and in a way that
            does not infringe the rights of, restrict or inhibit anyone else's
            use and enjoyment of the service. Prohibited behavior includes:
          </p>
          <ul className="pl-6 list-disc">
            <li>End-to-end encryption for all messages</li>
            <li>Secure data storage and transmission</li>
            <li>Regular security audits</li>
            <li>Employee training on data protection</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">
            4. Data Sharing and Disclosure
          </h3>
          <p>
            We do not sell your personal information. We may share your
            information only in the following circumstances:
          </p>
          <ul className="pl-6 list-disc">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>
              With service providers under strict confidentiality agreements
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">5. Your Rights and Choices</h3>
          <p>You have the right to:</p>
          <ul className="pl-6 list-disc">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Export your data</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">6. Cookies and Tracking</h3>
          <p>
            We use cookies and similar tracking technologies to track activity
            on our service and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">7. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@novachat.com.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
