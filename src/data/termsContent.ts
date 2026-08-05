export interface LegalSection {
  id: string;
  title: string;
  content: string[];
}

export const termsSections: LegalSection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: [
      "These Terms of Service (\"Terms\") constitute a legally binding agreement between you (whether personally or on behalf of an entity) and XyphX (\"Company,\" \"we,\" \"us,\" or \"our\"), concerning your access to and use of the XyphX platform, APIs, cloud services, and any related applications (collectively, the \"Services\").",
      "XyphX develops and provides developer APIs, authentication services, API key management, and cloud storage solutions.",
      "Please read these Terms carefully. By creating an account or accessing the Services, you acknowledge that you have read, understood, and agreed to be bound by these Terms."
    ]
  },
  {
    id: "acceptance",
    title: "2. Acceptance of Terms",
    content: [
      "By accessing the Services, you agree to these Terms. If you are accessing or using the Services on behalf of an enterprise, company, or other legal entity, you represent and warrant that you have the authority to bind that entity to these Terms.",
      "If you do not agree with all of these Terms, you are expressly prohibited from using the Services and must discontinue use immediately."
    ]
  },
  {
    id: "definitions",
    title: "3. Definitions",
    content: [
      "• **\"API\"** means Application Programming Interface provided by XyphX.",
      "• **\"User Content\"** means any data, code, files, or information you upload, post, or transmit through our Services.",
      "• **\"Cloud Storage Data\"** refers to files, objects, and binary data uploaded to XyphX storage endpoints."
    ]
  },
  {
    id: "eligibility",
    title: "4. Eligibility",
    content: [
      "You must be at least 18 years of age to create an account and use the Services. By using the Services, you represent and warrant that you have the legal capacity to enter into a binding contract and are not prohibited from receiving the Services under the laws of the United States or your applicable jurisdiction."
    ]
  },
  {
    id: "account-registration",
    title: "5. Account Registration",
    content: [
      "To access most features of the Services, you must register for an account or authenticate via supported OAuth providers. You agree to provide accurate, current, and complete information during registration.",
      "You are solely responsible for safeguarding your password and API keys. You agree not to disclose your credentials to any third party and to notify us immediately of any unauthorized use."
    ]
  },
  {
    id: "user-responsibilities",
    title: "6. User Responsibilities",
    content: [
      "You are legally responsible for all activities that occur under your account. You agree to use the Services in compliance with all applicable local, state, national, and international laws and regulations."
    ]
  },
  {
    id: "acceptable-use",
    title: "7. Acceptable Use Policy",
    content: [
      "Our Services must be used exclusively for lawful, legitimate development and business purposes. You agree not to use the Services to:",
      "• Distribute malware, viruses, or any other destructive code.",
      "• Engage in phishing, spoofing, or credential harvesting.",
      "• Scrape or aggressively poll our infrastructure in a manner that degrades service for others."
    ]
  },
  {
    id: "prohibited",
    title: "8. Prohibited Activities",
    content: [
      "You may not access or use the Services for any purpose other than that for which we make the Services available. Prohibited activities include, but are not limited to:",
      "• Reverse engineering, decompiling, or disassembling any aspect of the Services.",
      "• Bypassing or circumventing any security features or rate limits.",
      "• Violating the intellectual property rights of others."
    ]
  },
  {
    id: "api-usage",
    title: "9. API Usage",
    content: [
      "XyphX grants you a limited, non-exclusive, non-transferable, revocable license to access and use our APIs solely to develop and operate your applications.",
      "We reserve the right to modify, deprecate, or enforce breaking changes to our APIs at any time. We will make commercially reasonable efforts to provide advance notice of breaking changes."
    ]
  },
  {
    id: "rate-limits",
    title: "10. Rate Limits",
    content: [
      "API usage is subject to rate limits to ensure platform stability. These limits are documented in your developer dashboard.",
      "Attempting to circumvent rate limits via IP rotation, multiple accounts, or distributed botnets constitutes a material breach of these Terms and will result in immediate account termination."
    ]
  },
  {
    id: "authentication",
    title: "11. Authentication Services",
    content: [
      "If you utilize XyphX authentication services or OAuth providers for your end-users, you are responsible for maintaining a legally compliant Privacy Policy for your application.",
      "XyphX acts purely as an identity processor and is not responsible for the authorization logic or data handling practices within your proprietary applications."
    ]
  },
  {
    id: "cloud-storage",
    title: "12. Cloud Storage",
    content: [
      "XyphX provides cloud storage buckets for hosting unstructured data (e.g., profiles, documents, backups). You are strictly prohibited from using our cloud storage to host illegal content, copyrighted material without permission, or CSAM.",
      "XyphX reserves the right to scan file metadata and automated hashes to detect abusive content. We may immediately delete any non-compliant files and suspend the offending account."
    ]
  },
  {
    id: "file-uploads",
    title: "13. File Uploads",
    content: [
      "By utilizing our file upload APIs, you guarantee that you hold the necessary rights and permissions to distribute the uploaded files.",
      "You agree to implement reasonable client-side validation in your applications to prevent the upload of malicious executables to our infrastructure."
    ]
  },
  {
    id: "intellectual-property",
    title: "14. Intellectual Property",
    content: [
      "Unless otherwise indicated, the Services are our proprietary property. All source code, databases, functionality, software, website designs, audio, video, text, photographs, graphics, APIs, and documentation (collectively, the \"Content\") and the trademarks, service marks, and logos contained therein (the \"Marks\") are owned or controlled by XyphX.",
      "You are granted no right or license with respect to any of the aforesaid Marks or Content, other than the limited right to use the APIs as expressly permitted by these Terms."
    ]
  },
  {
    id: "user-content",
    title: "15. User Content",
    content: [
      "You retain full ownership of all User Content you upload or transmit through the Services.",
      "By uploading User Content, you grant XyphX a worldwide, non-exclusive, royalty-free license to host, store, transfer, and execute such content solely for the purpose of providing the Services to you."
    ]
  },
  {
    id: "api-keys",
    title: "16. API Keys",
    content: [
      "API keys serve as your authentication credential. You must keep your API keys confidential and secure.",
      "You are fully responsible for any activity incurred through the use of your API keys, regardless of whether you authorized such usage."
    ]
  },
  {
    id: "security",
    title: "17. Security Responsibilities",
    content: [
      "While XyphX maintains strict enterprise security protocols, you are responsible for securing your local environment, implementing HTTPS in your applications, and ensuring that your code does not expose XyphX API keys to the public web (e.g., in client-side repositories)."
    ]
  },
  {
    id: "availability",
    title: "18. Service Availability",
    content: [
      "We strive for high uptime, but we cannot guarantee that the Services will be available at all times. We may experience hardware, software, or network issues resulting in interruptions, delays, or errors.",
      "XyphX is not liable for any loss or damage incurred as a result of downtime."
    ]
  },
  {
    id: "modifications",
    title: "19. Service Modifications",
    content: [
      "We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice."
    ]
  },
  {
    id: "suspension",
    title: "20. Suspension",
    content: [
      "We may suspend your access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms or engage in prohibited activities."
    ]
  },
  {
    id: "termination",
    title: "21. Termination",
    content: [
      "You may terminate your account at any time via the developer console. Upon termination, your right to use the Services will immediately cease, and all associated data may be permanently deleted in accordance with our Privacy Policy."
    ]
  },
  {
    id: "disclaimer",
    title: "22. Disclaimer of Warranties",
    content: [
      "THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF."
    ]
  },
  {
    id: "liability",
    title: "23. Limitation of Liability",
    content: [
      "IN NO EVENT WILL XYPHX, OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES."
    ]
  },
  {
    id: "indemnification",
    title: "24. Indemnification",
    content: [
      "You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of your use of the Services or breach of these Terms."
    ]
  },
  {
    id: "governing-law",
    title: "25. Governing Law",
    content: [
      "These Terms shall be governed by and defined following the laws of the State of California, United States, without regard to its conflict of law principles."
    ]
  },
  {
    id: "entire-agreement",
    title: "26. Entire Agreement",
    content: [
      "These Terms, along with our Privacy Policy, constitute the entire agreement between you and XyphX relating to the Services."
    ]
  },
  {
    id: "changes-to-terms",
    title: "27. Changes to Terms",
    content: [
      "We reserve the right, in our sole discretion, to make changes or modifications to these Terms at any time. We will alert you about any changes by updating the \"Last updated\" date of these Terms, and you waive any right to receive specific notice of each such change."
    ]
  },
  {
    id: "contact-info",
    title: "28. Contact Information",
    content: [
      "In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:",
      "Email: legal@xyphx.com"
    ]
  }
];
