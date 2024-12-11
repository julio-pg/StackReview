import { InfoSection } from "~/components/InfoSection";

export function TermsContent() {
  return (
    <main className="max-w-3xl space-y-12">
      {termsSections.map((section) => (
        <InfoSection key={section.id} {...section} />
      ))}
    </main>
  );
}

export const termsSections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      "By accessing or using StackReview, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
      "If you do not agree with any of these terms, you are prohibited from using or accessing this site.",
    ],
  },
  {
    id: "account-responsibilities",
    title: "Account Responsibilities",
    content: [
      "You are responsible for maintaining the confidentiality of your account and password.",
      "You agree to accept responsibility for all activities that occur under your account.",
    ],
    subsections: [
      {
        title: "Account Security",
        content: [
          "You must immediately notify us of any unauthorized use of your account or any other breach of security.",
          "We reserve the right to refuse service, terminate accounts, or remove content at our discretion.",
        ],
      },
    ],
  },
  {
    id: "user-content",
    title: "User Content",
    content: [
      "Users may post reviews, comments, and other content as long as the content is not illegal, obscene, threatening, defamatory, invasive of privacy, infringing on intellectual property rights, or otherwise injurious to third parties.",
    ],
    subsections: [
      {
        title: "Content License",
        content: [
          "By posting content on StackReview, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      "The service and its original content, features, and functionality are owned by StackReview and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    content: [
      "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.",
      "All provisions of the Terms which by their nature should survive termination shall survive termination.",
    ],
  },
  {
    id: "limitation-liability",
    title: "Limitation of Liability",
    content: [
      "In no event shall StackReview, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.",
      "This includes, without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your access to or use of or inability to access or use the service.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: [
      "These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions.",
      "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.",
    ],
  },
  {
    id: "changes-to-terms",
    title: "Changes to Terms",
    content: [
      "We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.",
      "By continuing to access or use our service after any revisions become effective, you agree to be bound by the revised terms.",
    ],
  },
];
