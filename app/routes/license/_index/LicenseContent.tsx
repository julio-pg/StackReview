import { InfoSection } from "~/components/InfoSection";

export function LicenseContent() {
  return (
    <main className="max-w-3xl space-y-12">
      {licenseSections.map((section) => (
        <InfoSection key={section.id} {...section} />
      ))}
    </main>
  );
}

export const licenseSections = [
  {
    id: "grant",
    title: "License Grant",
    content: [
      "Subject to the terms of this agreement, StackReview grants you a limited, non-exclusive, non-transferable license to use our platform and services for your personal or business purposes.",
      "This license is conditional on your compliance with all terms and restrictions in this agreement.",
    ],
  },
  {
    id: "restrictions",
    title: "License Restrictions",
    content: [
      "You may not:",
      "- Modify, reverse engineer, decompile, or create derivative works of the software",
      "- Remove or alter any proprietary notices or labels",
      "- Use the service to violate any applicable laws or regulations",
      "- Share your account credentials with third parties",
    ],
  },
  {
    id: "proprietary-rights",
    title: "Proprietary Rights",
    content: [
      "All rights, title, and interest in and to the service, including all intellectual property rights, are and will remain exclusively with StackReview and its licensors.",
      "You acknowledge that the service contains proprietary and confidential information protected by applicable intellectual property and other laws.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Components",
    content: [
      "The service may include components licensed under various open source licenses.",
      "Nothing in this agreement limits your rights under, or grants you rights that supersede, the terms of any applicable open source license.",
    ],
    subsections: [
      {
        title: "Open Source Acknowledgments",
        content: [
          "We use various open source components in our platform. You can find a list of these components and their respective licenses in our documentation.",
        ],
      },
    ],
  },
  {
    id: "updates",
    title: "Updates and Maintenance",
    content: [
      "StackReview may provide updates, patches, and bug fixes as part of the service.",
      "These updates may modify or delete certain features or functionality of the service. You agree that StackReview has no obligation to provide any updates or continue to provide particular features or functionality.",
    ],
  },
  {
    id: "term-termination",
    title: "Term and Termination",
    content: [
      "This license continues until terminated by either party.",
      "StackReview may terminate this license at any time if you fail to comply with any term of this agreement.",
      "Upon termination, you must cease all use of the service and destroy all copies of software components in your possession.",
    ],
  },
  {
    id: "warranty-disclaimer",
    title: "Warranty Disclaimer",
    content: [
      'THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.',
      "STACKREVIEW DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.",
    ],
  },
  {
    id: "export-compliance",
    title: "Export Compliance",
    content: [
      "You must comply with all applicable export and import laws and regulations.",
      'You represent that you are not located in a country that is subject to U.S. Government embargo or designated as a "terrorist supporting" country.',
    ],
  },
];
