function TermsOfService() {
  return (
    <div className="container py-28 px-8 mx-auto space-y-8 max-w-4xl">
      <h2 className="text-4xl font-bold">Terms of Service</h2>
      <div className="flex flex-col gap-8 list-decimal">
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">1. Acceptance of Terms</h3>
          <p>
            By accessing and using NovaChat, you agree to be bound by these
            Terms of Service and all applicable laws and regulations. If you do
            not agree with any of these terms, you are prohibited from using or
            accessing this service.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">2. Use License</h3>
          <p>
            Permission is granted to temporarily access NovaChat for personal,
            non-commercial use. This is the grant of a license, not a transfer
            of title, and under this license you may not:
          </p>
          <ul className="pl-6 list-disc">
            <li>Modify or copy the materials </li>
            <li>Use the materials for any commercial purpose </li>
            <li>
              Attempt to decompile or reverse engineer any software contained in
              ChatSync
            </li>
            <li>
              Remove any copyright or other proprietary notations from the
              materials
            </li>
            <li>
              Transfer the materials to another person or mirror the materials
              on any other server
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">3. User Conduct</h3>
          <p>
            You agree to use NovaChat only for lawful purposes and in a way that
            does not infringe the rights of, restrict or inhibit anyone
            else&apos;s use and enjoyment of the service. Prohibited behavior
            includes:
          </p>
          <ul className="pl-6 list-disc">
            <li>Harassment or abuse of other users</li>
            <li>Distribution of malicious software</li>
            <li>Unauthorized access to other users accounts</li>
            <li>Sharing illegal or inappropriate content</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">4. Account Terms</h3>
          <p>
            You are responsible for maintaining the security of your account and
            password. NovaChat cannot and will not be liable for any loss or
            damage from your failure to comply with this security obligation.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">5. Modifications</h3>
          <p>
            NovaChat reserves the right to modify or discontinue, temporarily or
            permanently, the service with or without notice. We shall not be
            liable to you or any third party for any modification, suspension,
            or discontinuance of the service.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">6. Governing Law</h3>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws, and you irrevocably submit to the
            exclusive jurisdiction of the courts in that location.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">7. Contact Information</h3>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at support@chatsync.com.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
