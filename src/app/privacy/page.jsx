'use client'
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const NavBar = dynamic(() => import("@/components/NavBar"), { ssr: false });

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 mt-32">
        <h1 className="text-3xl font-bold mb-6">ReplicAIDE Privacy Policy</h1>
        <p className="mb-4">Effective Date: July 22, 2025</p>

        <p className="mb-4">
          At ReplicAIDE, we value your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, share, and protect
          data obtained through our services, including calendar integrations. By using
          ReplicAIDE, you consent to the practices described in this policy.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
        <p className="mb-2 font-semibold">A. Personal Information</p>
        <ul className="list-disc list-inside mb-4">
          <li>Name, email address, phone number</li>
          <li>Company name and role</li>
        </ul>

        <p className="mb-2 font-semibold">B. Usage Data</p>
        <ul className="list-disc list-inside mb-4">
          <li>Log data such as IP address, browser type, and access times</li>
          <li>Interactions with our platform features</li>
        </ul>

        <p className="mb-2 font-semibold">C. Calendar Data</p>
        <ul className="list-disc list-inside mb-4">
          <li>Event titles, descriptions, start/end times, time zones</li>
          <li>Locations and links associated with events</li>
          <li>Attendee names and contact details</li>
          <li>Your availability, preferences, and calendar settings</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-4">
          <li>To provide, operate, and improve our AI-powered services</li>
          <li>To schedule meetings, calls, and events on your behalf</li>
          <li>To recommend optimal time slots and reduce scheduling conflicts</li>
          <li>To support contextual automation for reminders and follow-ups</li>
          <li>To personalize your experience and provide customer support</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Calendar Data Usage</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Display your availability and suggest meeting times</li>
          <li>Automate meeting scheduling with AI agents</li>
          <li>Avoid overlapping or double-booked events</li>
          <li>Contextualize conversations with timely reminders and follow-through</li>
          <li>Maintain synchronization with third-party calendar providers</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Data Sharing and Disclosure</h2>
        <p className="mb-4">
          We do not sell your personal or calendar data. We only share information:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>With your explicit consent</li>
          <li>
            With trusted service providers bound by confidentiality agreements, for
            functionality such as calendar sync, natural language processing, and analytics
          </li>
          <li>When required to comply with legal obligations or protect our rights and users</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Data Security</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Encryption in transit and at rest</li>
          <li>Role-based access control</li>
          <li>Regular audits and monitoring for suspicious activity</li>
          <li>Secure integration protocols with third-party calendars</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Data Retention</h2>
        <p className="mb-4">
          We retain your data only as long as necessary for the purposes outlined above or
          as required by applicable law. If you disconnect your calendar or delete your
          account, we promptly delete associated calendar data.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">7. Your Rights and Choices</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Access or update your personal information</li>
          <li>Disconnect calendar integrations</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent to data processing at any time</li>
        </ul>
        <p className="mb-4">To exercise these rights, contact us at: <a href="mailto:support@replicaide.com" className="text-blue-600 underline">support@replicaide.com</a></p>

        <h2 className="text-xl font-semibold mt-8 mb-2">8. Third-Party Services</h2>
        <p className="mb-4">
          Our platform may integrate with third-party services (e.g., Google Calendar,
          Outlook). Your use of those services is subject to their privacy policies. We are not
          responsible for the practices of third parties.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">9. Children’s Privacy</h2>
        <p className="mb-4">
          ReplicAIDE is not intended for use by individuals under the age of 18. We do not
          knowingly collect personal information from children.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">10. Updates to This Privacy Policy</h2>
        <p className="mb-4">
          We may revise this Privacy Policy periodically. If we make material changes, we
          will notify you via email or in-app notification. Your continued use of ReplicAIDE
          indicates your acceptance of the revised policy.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
        <p className="mb-4">
          ReplicAIDE<br />
          30 N Gould St, Suite #3641<br />
          Sheridan, WY 82801<br />
          <a href="mailto:support@replicaide.com" className="text-blue-600 underline">support@replicaide.com</a> | (702) 825-0022
        </p>
      </main>
      <Footer />
    </>
  );
}