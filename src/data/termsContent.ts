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
      "XyphX develops and provides AI infrastructure, cloud computing services, developer APIs, authentication services, cloud storage, SDKs, SaaS products, and enterprise AI solutions.",
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
      "• **\"AI Services\"** refers to any machine learning, generative AI, or inference capabilities provided by XyphX.",
      "• **\"Enterprise Customer\"** refers to users subscribed to customized billing and SLA tiers via an Enterprise Agreement."
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
      "To access most features of the Services, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.",
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
      "• Bypassing or circumventing any security features, rate limits, or billing systems.",
      "• Using our AI APIs to generate CSAM, non-consensual deepfakes, or material that promotes terrorism or violence.",
      "• Violating the intellectual property rights of others."
    ]
  },
  {
    id: "ai-services",
    title: "9. AI Services",
    content: [
      "When using XyphX AI Services, you understand that outputs are generated probabilistically. XyphX makes no representations or warranties regarding the accuracy, reliability, or intellectual property clearance of AI-generated content.",
      "You are solely responsible for reviewing and verifying AI outputs before deploying them in production environments."
    ]
  },
  {
    id: "api-usage",
    title: "10. API Usage",
    content: [
      "XyphX grants you a limited, non-exclusive, non-transferable, revocable license to access and use our APIs solely to develop and operate your applications.",
      "We reserve the right to modify, deprecate, or enforce breaking changes to our APIs at any time. We will make commercially reasonable efforts to provide advance notice of breaking changes."
    ]
  },
  {
    id: "rate-limits",
    title: "11. Rate Limits",
    content: [
      "API usage is subject to rate limits to ensure platform stability. These limits are documented in your developer dashboard and vary by subscription tier.",
      "Attempting to circumvent rate limits via IP rotation, multiple accounts, or distributed botnets constitutes a material breach of these Terms and will result in immediate account termination."
    ]
  },
  {
    id: "authentication",
    title: "12. Authentication Services",
    content: [
      "If you utilize XyphX authentication services or OAuth providers for your end-users, you are responsible for maintaining a legally compliant Privacy Policy for your application.",
      "XyphX acts purely as an identity processor and is not responsible for the authorization logic or data handling practices within your proprietary applications."
    ]
  },
  {
    id: "cloud-storage",
    title: "13. Cloud Storage",
    content: [
      "XyphX provides cloud storage buckets for hosting unstructured data. You are strictly prohibited from using our cloud storage to host illegal content, copyrighted material without permission, or CSAM.",
      "XyphX reserves the right to scan file metadata and automated hashes to detect abusive content. We may immediately delete any non-compliant files and suspend the offending account."
    ]
  },
  {
    id: "file-uploads",
    title: "14. File Uploads",
    content: [
      "By utilizing our file upload APIs, you guarantee that you hold the necessary rights and permissions to distribute the uploaded files.",
      "You agree to implement reasonable client-side validation in your applications to prevent the upload of malicious executables to our infrastructure."
    ]
  },
  {
    id: "intellectual-property",
    title: "15. Intellectual Property",
    content: [
      "Unless otherwise indicated, the Services are our proprietary property. All source code, databases, functionality, software, website designs, audio, video, text, photographs, graphics, APIs, and documentation (collectively, the \"Content\") and the trademarks, service marks, and logos contained therein (the \"Marks\") are owned or controlled by XyphX.",
      "You are granted no right or license with respect to any of the aforesaid Marks or Content, other than the limited right to use the APIs as expressly permitted by these Terms."
    ]
  },
  {
    id: "user-content",
    title: "16. User Content",
    content: [
      "You retain full ownership of all User Content you upload or transmit through the Services.",
      "By uploading User Content, you grant XyphX a worldwide, non-exclusive, royalty-free license to host, store, transfer, and execute such content solely for the purpose of providing the Services to you."
    ]
  },
  {
    id: "ai-generated-content",
    title: "17. AI Generated Content",
    content: [
      "To the extent permitted by law, you own the outputs generated by our AI models based on your prompts.",
      "However, due to the nature of generative AI, you acknowledge that outputs may not be uniquely yours, and the same or similar outputs may be generated for other users."
    ]
  },
  {
    id: "api-keys",
    title: "18. API Keys",
    content: [
      "API keys serve as your authentication credential. You must keep your API keys confidential and secure.",
      "You are fully responsible for any charges incurred through the use of your API keys, regardless of whether you authorized such usage."
    ]
  },
  {
    id: "security",
    title: "19. Security Responsibilities",
    content: [
      "While XyphX maintains strict enterprise security protocols, you are responsible for securing your local environment, implementing HTTPS in your applications, and ensuring that your code does not expose XyphX API keys to the public web (e.g., in client-side repositories)."
    ]
  },
  {
    id: "confidentiality",
    title: "20. Confidentiality",
    content: [
      "During the course of your use of the Services, you may gain access to non-public information about XyphX, our roadmaps, or unreleased features. You agree to hold all such confidential information in strict confidence and not to disclose it to any third party."
    ]
  },
  {
    id: "subscriptions",
    title: "21. Subscription Plans",
    content: [
      "XyphX offers various subscription tiers, including free, pro, and enterprise plans. The features, rate limits, and pricing for each tier are detailed on our pricing page.",
      "We reserve the right to modify the features or pricing of any subscription plan with 30 days prior notice."
    ]
  },
  {
    id: "billing",
    title: "22. Billing",
    content: [
      "You agree to pay all charges or fees at the prices then in effect for your account. If your account exceeds the usage limits of your current tier, you may be automatically billed for overages or upgraded to the next applicable tier.",
      "All payments shall be in U.S. dollars unless otherwise specified."
    ]
  },
  {
    id: "taxes",
    title: "23. Taxes",
    content: [
      "You are responsible for all applicable taxes, levies, or duties imposed by taxing authorities based on your usage of the Services. XyphX will collect and remit taxes where legally required."
    ]
  },
  {
    id: "refund-policy",
    title: "24. Refund Policy",
    content: [
      "All purchases are non-refundable. You may cancel your subscription at any time; however, there are no refunds for partially used billing periods."
    ]
  },
  {
    id: "availability",
    title: "25. Service Availability",
    content: [
      "We strive for 99.9% uptime, but we cannot guarantee that the Services will be available at all times. We may experience hardware, software, or network issues resulting in interruptions, delays, or errors.",
      "Except for Enterprise Customers with custom Service Level Agreements (SLAs), XyphX is not liable for any loss or damage incurred as a result of downtime."
    ]
  },
  {
    id: "beta-services",
    title: "26. Beta Services",
    content: [
      "From time to time, we may offer access to beta features. These features are provided \"AS IS\" without warranty of any kind and may be modified or discontinued at any time without notice."
    ]
  },
  {
    id: "third-party",
    title: "27. Third-Party Services",
    content: [
      "The Services may contain links to or integrate with third-party websites or applications. XyphX does not endorse and is not responsible for the content, security, or practices of any third-party services."
    ]
  },
  {
    id: "modifications",
    title: "28. Service Modifications",
    content: [
      "We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice."
    ]
  },
  {
    id: "suspension",
    title: "29. Suspension",
    content: [
      "We may suspend your access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms, engage in prohibited activities, or fail to pay outstanding invoices."
    ]
  },
  {
    id: "termination",
    title: "30. Termination",
    content: [
      "You may terminate your account at any time via the developer console. Upon termination, your right to use the Services will immediately cease, and all associated data may be permanently deleted in accordance with our Privacy Policy."
    ]
  },
  {
    id: "disclaimer",
    title: "31. Disclaimer of Warranties",
    content: [
      "THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF."
    ]
  },
  {
    id: "liability",
    title: "32. Limitation of Liability",
    content: [
      "IN NO EVENT WILL XYPHX, OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES."
    ]
  },
  {
    id: "indemnification",
    title: "33. Indemnification",
    content: [
      "You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys' fees and expenses, made by any third party due to or arising out of your use of the Services or breach of these Terms."
    ]
  },
  {
    id: "export",
    title: "34. Export Compliance",
    content: [
      "The Services and derivatives thereof may be subject to export laws and regulations of the United States and other jurisdictions. You agree to comply strictly with all such laws."
    ]
  },
  {
    id: "sanctions",
    title: "35. Sanctions Compliance",
    content: [
      "You represent and warrant that you are not located in a country that is subject to a U.S. Government embargo or that has been designated by the U.S. Government as a \"terrorist supporting\" country, and you are not listed on any U.S. Government list of prohibited or restricted parties."
    ]
  },
  {
    id: "governing-law",
    title: "36. Governing Law",
    content: [
      "These Terms shall be governed by and defined following the laws of the State of California, United States, without regard to its conflict of law principles."
    ]
  },
  {
    id: "arbitration",
    title: "37. Arbitration",
    content: [
      "Any dispute arising out of or in connection with these Terms shall be resolved by binding arbitration in San Francisco, California, administered by the American Arbitration Association."
    ]
  },
  {
    id: "force-majeure",
    title: "38. Force Majeure",
    content: [
      "XyphX shall not be liable for any failure or delay in performance resulting from causes beyond our reasonable control, including acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials."
    ]
  },
  {
    id: "entire-agreement",
    title: "39. Entire Agreement",
    content: [
      "These Terms, along with our Privacy Policy and any applicable Enterprise Agreement, constitute the entire agreement between you and XyphX relating to the Services."
    ]
  },
  {
    id: "severability",
    title: "40. Severability",
    content: [
      "If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced to the fullest extent under law."
    ]
  },
  {
    id: "assignment",
    title: "41. Assignment",
    content: [
      "You may not assign these Terms without our prior written consent. XyphX may assign these Terms freely in connection with a merger, acquisition, or sale of assets."
    ]
  },
  {
    id: "waiver",
    title: "42. Waiver",
    content: [
      "Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights."
    ]
  },
  {
    id: "changes-to-terms",
    title: "43. Changes to Terms",
    content: [
      "We reserve the right, in our sole discretion, to make changes or modifications to these Terms at any time. We will alert you about any changes by updating the \"Last updated\" date of these Terms, and you waive any right to receive specific notice of each such change."
    ]
  },
  {
    id: "contact-info",
    title: "44. Contact Information",
    content: [
      "In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:",
      "Email: legal@xyphx.com",
      "Mailing Address: XyphX Legal Department, 123 Innovation Drive, San Francisco, CA 94105, USA."
    ]
  }
];
