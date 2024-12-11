import { PrivacySection } from "./PrivacySection";

export function PrivacyContent() {
  return (
    <main className="max-w-3xl space-y-12">
      {privacySections.map((section) => (
        <PrivacySection key={section.id} {...section} />
      ))}
    </main>
  );
}

export const privacySections = [
  {
    id: "information-collection",
    title: "Information Collection",
    content: [
      "We collect information that you provide directly to us, including when you create an account, update your profile, or interact with features on our platform.",
      "This may include your name, email address, profile picture, and any other information you choose to provide.",
    ],
  },
  {
    id: "information-use",
    title: "How We Use Your Information",
    content: [
      "We use the information we collect to provide, maintain, and improve our services, including to personalize your experience and deliver the type of content and product suggestions in which you are most interested.",
      "We also use this information to communicate with you, such as sending you updates about your account, providing customer support, and sending you marketing messages (which you can opt out of at any time).",
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    content: [
      "We do not sell your personal information to third parties. We may share your information in limited circumstances, such as:",
      "With service providers who assist in our operations (subject to strict confidentiality obligations)",
      "When required by law or to protect our rights and safety",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    content: [
      "We implement appropriate technical and organizational measures to protect the security of your personal information.",
      "While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "user-rights",
    title: "Your Rights",
    content: [
      "You have the right to access, correct, or delete your personal information.",
      "You can also object to processing of your information, request restriction of processing, or request data portability.",
      "To exercise any of these rights, please contact us through our support channels.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    content: [
      "We use cookies and similar tracking technologies to collect information about how you use our services.",
      "You can control cookies through your browser settings, although disabling cookies may limit your ability to use certain features of our platform.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: [
      "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.",
      "Your continued use of our services after any changes indicates your acceptance of the updated policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    content: [
      "If you have any questions about this privacy policy or our practices, please contact us at privacy@stackreview.com.",
      "We will respond to your inquiry as soon as possible.",
    ],
  },
];
