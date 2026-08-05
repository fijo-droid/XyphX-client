export interface LegalSection {
  id: string;
  title: string;
  content: string[];
}

export const privacySections: LegalSection[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: [
      "Welcome to XyphX. At XyphX, we prioritize your privacy and are committed to protecting the personal data and infrastructure telemetry that you entrust to us. This Privacy Policy outlines how XyphX, its subsidiaries, and affiliated entities (collectively, \"XyphX,\" \"we,\" \"us,\" or \"our\") collect, utilize, process, and disclose your information.",
      "This document governs your interactions with our entire ecosystem of services, which includes our AI infrastructure, cloud computing platforms, authentication services, developer APIs (including our file upload and storage APIs), software development kits (SDKs), software-as-a-service (SaaS) products, and any future enterprise AI solutions we may deploy (collectively, the \"Services\").",
      "By registering for an account, authenticating via OAuth, utilizing our APIs, or otherwise accessing our Services, you acknowledge that you have read, understood, and agreed to the data practices described in this Privacy Policy. If you do not agree with the terms outlined herein, you must immediately cease all access to and use of our Services."
    ]
  },
  {
    id: "scope",
    title: "2. Scope of this Privacy Policy",
    content: [
      "This Privacy Policy applies to all personal and non-personal information collected by XyphX when you interact with our websites (including but not limited to xyphx.com and its subdomains), web applications, cloud storage interfaces, and API endpoints.",
      "This Policy does NOT apply to any third-party applications, websites, or software that integrate with our APIs, nor does it apply to any products or services provided by third parties that you may access through our platform. In scenarios where you act as a developer integrating XyphX APIs into your own application, you act as the Data Controller for your end-users, and XyphX acts purely as a Data Processor."
    ]
  },
  {
    id: "definitions",
    title: "3. Definitions",
    content: [
      "• **\"Personal Data\"** refers to any information relating to an identified or identifiable natural person, including but not limited to names, email addresses, payment information, and unique online identifiers.",
      "• **\"API Usage Data\"** refers to metadata, telemetry, and statistical logs generated when you or your applications make requests to our Application Programming Interfaces.",
      "• **\"Cloud Storage Data\"** refers to the files, objects, binary data, and unstructured content you upload, store, or transmit via our cloud storage services and file upload APIs.",
      "• **\"AI Service Data\"** encompasses the prompts, contextual inputs, and configuration parameters you submit to our AI infrastructure, as well as the generative outputs produced by our models."
    ]
  },
  {
    id: "information-we-collect",
    title: "4. Information We Collect",
    content: [
      "We collect several categories of information to ensure the reliable delivery, security, and enhancement of our Services. This includes:",
      "**Account & Identity Information:** When you register for a XyphX account, we collect your full name, email address, password (which is securely hashed and encrypted), and company information. If you choose to authenticate via third-party OAuth providers (e.g., Google, Microsoft, Yahoo), we collect your federated identity token, associated email address, and profile picture.",
      "**API Usage Data & Telemetry:** We automatically log extensive telemetry regarding your interactions with our developer APIs. This includes API request payloads (excluding sensitive payloads where explicitly encrypted), endpoint routing paths, response status codes, latency metrics, IP addresses, user agents, and cryptographic signatures associated with your API keys.",
      "**Device & Browser Information:** Our web applications and analytics systems collect hardware and software identifiers, including browser type, operating system, device screen resolution, preferred language, and referring URLs.",
      "**Cookies & Tracking Data:** We utilize session cookies, persistent cookies, and similar tracking technologies to maintain authentication states, prevent cross-site request forgery (CSRF), and analyze user engagement patterns across our dashboards.",
      "**Billing Information:** If you subscribe to our paid enterprise tiers, we collect billing details. Please note that XyphX does not store raw credit card numbers; all payment data is tokenized and processed by certified third-party payment processors (e.g., Stripe).",
      "**Communications:** When you contact our support teams, participate in developer forums, or respond to surveys, we retain transcripts and metadata associated with those interactions to improve our customer success workflows."
    ]
  },
  {
    id: "how-we-use",
    title: "5. How We Use Information",
    content: [
      "XyphX processes your information for the following primary purposes:",
      "• **Service Delivery:** To provision infrastructure, route API requests, manage authentication sessions, and facilitate file uploads to our cloud storage buckets.",
      "• **Security & Abuse Prevention:** To conduct real-time threat analysis, enforce rate limiting, detect distributed denial-of-service (DDoS) attacks, and automatically suspend accounts engaging in malicious activities.",
      "• **Infrastructure Optimization:** To monitor server health, balance load across our global data centers, and ensure compliance with our Service Level Agreements (SLAs).",
      "• **Billing & Compliance:** To calculate API consumption metrics for invoicing, process subscription payments, and comply with international tax obligations.",
      "• **Product Development:** To analyze aggregate usage patterns, identify popular API endpoints, and train internal diagnostic models to improve the developer experience. We strictly adhere to our AI Service Data Processing policies when handling user inputs."
    ]
  },
  {
    id: "ai-data-processing",
    title: "6. AI Service Data Processing",
    content: [
      "As an AI infrastructure provider, we recognize the sensitivity of the data processed by our generative models. When you submit prompts or datasets to our AI APIs, we process this data strictly to generate the requested output.",
      "**No Sale of Data:** XyphX never sells your Personal Data or AI Service Data to data brokers, advertisers, or any third parties.",
      "**Training Restrictions:** By default, XyphX does NOT use customer data submitted via our enterprise APIs to train, retrain, or fine-tune our foundational foundational AI models. Your prompts and proprietary data remain your intellectual property. We may only use opt-in telemetry from free-tier web applications for aggregate product improvement, subject to strict anonymization protocols."
    ]
  },
  {
    id: "api-logging",
    title: "7. API Request Logging",
    content: [
      "To provide robust developer tools and enforce security, XyphX maintains comprehensive audit logs of all API traffic.",
      "These logs include timestamps, client IP addresses, requested URIs, HTTP methods, response times, and error codes. We utilize this log data to provide you with API usage metrics in your dashboard, calculate rate limits, and detect anomalies indicative of compromised API keys.",
      "Log data is retained for a standard period of 30 days for operational debugging, after which it is aggregated into non-identifiable statistical metrics and permanently purged from active storage."
    ]
  },
  {
    id: "authentication-security",
    title: "8. Authentication & Security",
    content: [
      "XyphX employs industry-leading cryptographic standards to secure your identity. All passwords stored on our servers are hashed using strong, modern cryptographic algorithms (e.g., Argon2 or bcrypt) and are never stored in plaintext.",
      "When utilizing OAuth authentication, we do not receive or store your third-party provider passwords; we rely solely on secure, time-bound OAuth tokens. You are responsible for maintaining the confidentiality of your XyphX API keys and must immediately rotate them via the developer dashboard if you suspect a compromise."
    ]
  },
  {
    id: "cloud-storage-data",
    title: "9. Cloud Storage Data",
    content: [
      "Our cloud storage services allow you to upload, manage, and distribute files via our APIs. Files uploaded to XyphX storage are encrypted at rest using AES-256 encryption.",
      "You retain full ownership of all files you upload. XyphX personnel do not proactively inspect, index, or analyze the contents of your cloud storage buckets unless required to resolve a technical support request initiated by you, or when compelled by a valid legal order. We employ automated hashing and heuristic scanning strictly to prevent the hosting of malware, child sexual abuse material (CSAM), or infrastructure-compromising exploits."
    ]
  },
  {
    id: "cookies-tracking",
    title: "10. Cookies & Tracking Technologies",
    content: [
      "XyphX utilizes cookies and local storage mechanisms to optimize your experience on our web properties. 'Strictly Necessary' cookies are deployed to maintain your authenticated session and enforce CSRF protections. 'Performance & Analytics' cookies help us understand how developers navigate our documentation and dashboards.",
      "You may configure your browser to reject non-essential cookies; however, disabling strictly necessary cookies will render our authentication services and developer console unusable."
    ]
  },
  {
    id: "third-party-services",
    title: "11. Third-Party Services",
    content: [
      "To operate our global infrastructure, we engage trusted third-party sub-processors. These include cloud hosting providers (e.g., AWS, GCP), email delivery services, and logging aggregators.",
      "All third-party services are bound by strict Data Processing Agreements (DPAs) that mandate security postures equal to or greater than those described in this Privacy Policy. We do not permit our sub-processors to use your Personal Data for any purpose other than providing the contracted service to XyphX."
    ]
  },
  {
    id: "payment-providers",
    title: "12. Payment Providers",
    content: [
      "XyphX integrates with PCI-DSS compliant third-party payment processors (such as Stripe) to manage subscription billing. When you provide your credit card information, it is transmitted directly to our payment processor via a secure, encrypted connection.",
      "XyphX servers do not process, store, or transmit your raw financial data. We only retain tokenized references, billing addresses, and invoice histories required for account management and tax compliance."
    ]
  },
  {
    id: "data-sharing",
    title: "13. Data Sharing & Disclosure",
    content: [
      "We will only disclose your Personal Data under the following circumstances:",
      "• **With Your Consent:** When you explicitly authorize us to share information with a third-party integration.",
      "• **Service Providers:** As described in Section 11, with trusted sub-processors.",
      "• **Legal Obligations:** When legally required by subpoenas, court orders, or valid law enforcement requests. We rigorously review all requests for legal validity and will notify you prior to disclosure unless prohibited by law.",
      "• **Business Transfers:** In the event of a merger, acquisition, reorganization, or sale of assets, your data may be transferred as part of the business transaction, subject to the acquirer upholding the terms of this Privacy Policy."
    ]
  },
  {
    id: "international-transfers",
    title: "14. International Data Transfers",
    content: [
      "XyphX operates a globally distributed infrastructure. Your Personal Data, AI Service Data, and Cloud Storage Data may be transferred to, stored, and processed in data centers located in the United States, the European Union, and other jurisdictions.",
      "By utilizing our Services, you consent to the transfer of your data across international borders. When transferring data originating from the European Economic Area (EEA), the UK, or Switzerland to countries lacking an adequacy decision, we rely on Standard Contractual Clauses (SCCs) and robust technical safeguards."
    ]
  },
  {
    id: "data-retention",
    title: "15. Data Retention",
    content: [
      "We retain your Personal Data only for as long as necessary to fulfill the purposes outlined in this Policy, or to comply with our legal and regulatory obligations.",
      "• **Account Data:** Retained until you explicitly request account deletion.",
      "• **API Logs:** Retained for 30 days for debugging, then aggregated.",
      "• **Cloud Storage:** Retained indefinitely until deleted via the API or dashboard, or until your account is terminated for violating our Terms of Service.",
      "• **Billing Data:** Retained for up to 7 years to comply with international tax and accounting laws."
    ]
  },
  {
    id: "security-measures",
    title: "16. Security Measures",
    content: [
      "XyphX is dedicated to maintaining an enterprise-grade security posture. Our security measures include:",
      "• Encryption of all data in transit using TLS 1.2 or higher.",
      "• Encryption of all data at rest using AES-256.",
      "• Mandatory multi-factor authentication (MFA) for all XyphX engineering staff accessing production environments.",
      "• Continuous vulnerability scanning, penetration testing, and automated infrastructure monitoring.",
      "• Strict adherence to the principle of least privilege (PoLP) for internal data access."
    ]
  },
  {
    id: "childrens-privacy",
    title: "17. Children's Privacy",
    content: [
      "XyphX's enterprise APIs and cloud services are intended strictly for developers, businesses, and adults of legal age in their respective jurisdictions. We do not knowingly collect, solicit, or process Personal Data from individuals under the age of 16.",
      "If we become aware that we have inadvertently collected Personal Data from a child under 16 without verified parental consent, we will take immediate steps to permanently delete that information from our systems."
    ]
  },
  {
    id: "user-rights",
    title: "18. User Rights",
    content: [
      "Depending on your jurisdiction, you are entitled to comprehensive rights regarding your Personal Data. These include the right to access, correct, update, port, or delete your information. You may also object to processing or request restriction of processing.",
      "You can exercise the majority of these rights directly through your XyphX developer dashboard. For complex requests, you may contact our privacy team."
    ]
  },
  {
    id: "gdpr-rights",
    title: "19. GDPR Rights",
    content: [
      "For residents of the European Economic Area (EEA) and the United Kingdom, XyphX adheres to the General Data Protection Regulation (GDPR) and the UK GDPR.",
      "Your rights include the Right to Erasure (Right to be Forgotten), the Right to Data Portability, and the Right to lodge a complaint with your local Data Protection Authority. Our legal basis for processing your data includes the performance of a contract, compliance with legal obligations, and our legitimate interests in securing and optimizing our infrastructure."
    ]
  },
  {
    id: "ccpa-rights",
    title: "20. CCPA Rights",
    content: [
      "For residents of California, XyphX adheres to the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA).",
      "You have the right to know what personal information is collected, the right to delete personal information, the right to opt-out of the sale or sharing of personal information (Note: XyphX does NOT sell your personal information), and the right to non-discrimination for exercising your CCPA rights."
    ]
  },
  {
    id: "data-deletion",
    title: "21. Data Deletion Requests",
    content: [
      "You may request the permanent deletion of your XyphX account and all associated Personal Data at any time via the developer console or by contacting support.",
      "Upon initiating a deletion request, we will expunge your data from our primary production systems within 14 days. Cryptographically secure backups may retain encrypted fragments of your data for up to 90 days before being irretrievably overwritten as part of our disaster recovery lifecycle."
    ]
  },
  {
    id: "ai-training-statement",
    title: "22. AI Training Statement",
    content: [
      "To reiterate our commitment to intellectual property and privacy: XyphX explicitly prohibits the use of enterprise API payloads, cloud storage files, and user-generated content for the purpose of training our foundational AI models.",
      "Your data is your proprietary asset. We process it exclusively to provide you with the computing, storage, and AI inference services you have requested."
    ]
  },
  {
    id: "infrastructure-providers",
    title: "23. Infrastructure Providers",
    content: [
      "We build our Services atop world-class infrastructure providers to ensure high availability and redundancy. While these providers physically host the servers processing your data, they do not possess the cryptographic keys required to access your encrypted Personal Data or Cloud Storage Data.",
      "We continuously audit our infrastructure partners to ensure they maintain compliance with SOC 2, ISO 27001, and other stringent security frameworks."
    ]
  },
  {
    id: "changes",
    title: "24. Changes to Privacy Policy",
    content: [
      "As our technology ecosystem evolves, we may periodically update this Privacy Policy. We will notify you of material changes by sending an email to the primary address associated with your account and by displaying a prominent notice within the developer dashboard.",
      "Your continued use of the Services following the effective date of an updated Privacy Policy constitutes your acceptance of the revised terms."
    ]
  },
  {
    id: "contact",
    title: "25. Contact Information",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data processing practices, please contact our Data Protection Officer and legal team.",
      "Email: privacy@xyphx.com",
      "Mailing Address: XyphX Legal Department, 123 Innovation Drive, San Francisco, CA 94105, USA."
    ]
  }
];
