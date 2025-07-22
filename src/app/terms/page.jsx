
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function TermsPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 mt-32">
        <h1 className="text-3xl font-bold mb-6">ReplicAIDE Terms of Service</h1>
        <p className="mb-4">Effective Date: July 22, 2025</p>

        <p className="mb-4">
          Welcome to ReplicAIDE. These Terms of Service (“Terms”) govern your access to
          and use of the ReplicAIDE platform, services, and products. By accessing or using
          any part of our services, you agree to be bound by these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Description of Service</h2>
        <p className="mb-4">
          ReplicAIDE is an AI infrastructure platform enabling organizations to deploy
          intelligent agents, schedule automation, and make data-driven decisions. The
          service includes access to AI models, calendar integrations, voice agents, and
          associated tools.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. User Eligibility</h2>
        <p className="mb-4">
          You must be at least 18 years old to use our services. By using ReplicAIDE, you
          represent that you meet this requirement.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Account Responsibility</h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account credentials
          and for all activities under your account. Notify us immediately if you suspect
          unauthorized access.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Acceptable Use</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Use the platform for unlawful or harmful purposes</li>
          <li>Reverse-engineer or disrupt our systems</li>
          <li>Misuse calendar or user data</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Data Use and Privacy</h2>
        <p className="mb-4">
          Your data is handled according to our Privacy Policy. By using ReplicAIDE, you
          consent to the collection and use of data as described therein.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Third-Party Services</h2>
        <p className="mb-4">
          ReplicAIDE may integrate with third-party services (e.g., calendar platforms). We
          are not responsible for the content or behavior of third-party services, even if
          accessed through our platform.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Service Availability</h2>
        <p className="mb-4">
          We aim for high uptime but do not guarantee uninterrupted availability. We may
          suspend or limit access for maintenance, upgrades, or unforeseen issues.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Intellectual Property</h2>
        <p className="mb-4">
          All software, designs, content, and technology within ReplicAIDE are the intellectual
          property of ReplicAIDE or its licensors. You may not copy, modify, or distribute any
          part of the platform without permission.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Termination</h2>
        <p className="mb-4">
          We may suspend or terminate access to the service at our discretion, especially for
          violations of these Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Disclaimers and Limitation of Liability</h2>
        <p className="mb-4">
          ReplicAIDE is provided "as is" without warranties of any kind. We are not liable for
          any indirect or consequential damages resulting from your use of the service.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">11. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Continued use of ReplicAIDE after
          changes constitutes your acceptance of the revised Terms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
        <p>
          ReplicAIDE<br />
          30 N Gould St, Suite #3641<br />
          Sheridan, WY 82801<br />
          <a href="mailto:support@replicaide.com" className="text-blue-600 underline">support@replicaide.com</a> | (702) 825-0022
        </p>
      </main>
      <Footer/>
    </>
  );
}