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
      "Welcome to XyphX. At XyphX, we prioritize your privacy and are committed to protecting the personal data and infrastructure telemetry that you entrust to us. This Privacy Policy outlines how XyphX collects, utilizes, processes, and discloses your information.",
      "This document governs your interactions with our developer services, which primarily include our authentication services, API keys management, and cloud storage/file upload APIs (collectively, the \"Services\").",
      "By registering for an account, authenticating via OAuth, utilizing our APIs, or otherwise accessing our Services, you acknowledge that you have read, understood, and agreed to the data practices described in this Privacy Policy. If you do not agree with the terms outlined herein, you must immediately cease all access to and use of our Services."
    ]
  },
  {
    id: "scope",
    title: "2. Scope of this Privacy Policy",
    content: [
      "This Privacy Policy applies to all personal and non-personal information collected by XyphX when you interact with our websites, dashboards, cloud storage interfaces, and API endpoints.",
      "This Policy does NOT apply to any third-party applications or websites that integrate with our APIs. When you act as a developer integrating XyphX APIs into your own application, you act as the Data Controller for your end-users, and XyphX acts purely as a Data Processor."
    ]
  },
  {
    id: "definitions",
    title: "3. Definitions",
    content: [
      "• **\"Personal Data\"** refers to any information relating to an identified or identifiable natural person, including but not limited to names, email addresses, and unique online identifiers.",
      "• **\"API Usage Data\"** refers to metadata, telemetry, and statistical logs generated when you or your applications make requests to our Application Programming Interfaces.",
      "• **\"Cloud Storage Data\"** refers to the files, objects, binary data, and unstructured content you upload, store, or transmit via our cloud storage services (e.g., user profiles, documents, and backups)."
    ]
  },
  {
    id: "information-we-collect",
    title: "4. Information We Collect",
    content: [
      "We collect several categories of information to ensure the reliable delivery, security, and enhancement of our Services. This includes:",
      "**Account & Identity Information:** When you register for a XyphX account or authenticate via third-party OAuth providers (e.g., Google, Microsoft, Yahoo), we collect your federated identity token, associated email address, display name, and profile picture.",
      "**API Usage Data & Telemetry:** We automatically log telemetry regarding your interactions with our developer APIs. This includes endpoint routing paths, response status codes, latency metrics, IP addresses, user agents, and the cryptographic signatures associated with your API keys.",
      "**Cookies & Tracking Data:** We utilize session cookies and local storage mechanisms to maintain authentication states, prevent cross-site request forgery (CSRF), and analyze user engagement patterns across our dashboards."
    ]
  },
  {
    id: "how-we-use",
    title: "5. How We Use Information",
    content: [
      "XyphX processes your information for the following primary purposes:",
      "• **Service Delivery:** To route API requests, manage authentication sessions, and facilitate file uploads to our cloud storage buckets.",
      "• **Security & Abuse Prevention:** To conduct real-time threat analysis, enforce rate limiting, detect distributed denial-of-service (DDoS) attacks, and automatically suspend accounts engaging in malicious activities.",
      "• **Infrastructure Optimization:** To monitor server health and ensure compliance with our operational metrics."
    ]
  },
  {
    id: "api-logging",
    title: "6. API Request Logging",
    content: [
      "To provide robust developer tools and enforce security, XyphX maintains comprehensive audit logs of all API traffic.",
      "These logs include timestamps, client IP addresses, requested URIs, HTTP methods, response times, and error codes. We utilize this log data to provide you with API usage metrics in your dashboard, calculate rate limits, and detect anomalies indicative of compromised API keys.",
      "Log data is retained for a standard period of 30 days for operational debugging, after which it is aggregated into non-identifiable statistical metrics and permanently purged from active storage."
    ]
  },
  {
    id: "authentication-security",
    title: "7. Authentication & Security",
    content: [
      "XyphX employs industry-leading cryptographic standards to secure your identity. When creating API keys with a 6-digit security PIN, the PIN is securely hashed and encrypted.",
      "When utilizing OAuth authentication, we do not receive or store your third-party provider passwords; we rely solely on secure, time-bound OAuth tokens. You are responsible for maintaining the confidentiality of your XyphX API keys and must immediately revoke them via the developer dashboard if you suspect a compromise."
    ]
  },
  {
    id: "cloud-storage-data",
    title: "8. Cloud Storage Data",
    content: [
      "Our cloud storage services allow you to upload, manage, and distribute files via our APIs (such as profile images, documents, and backups).",
      "You retain full ownership of all files you upload. XyphX personnel do not proactively inspect, index, or analyze the contents of your cloud storage buckets unless required to resolve a technical support request initiated by you, or when compelled by a valid legal order. We employ automated hashing and heuristic scanning strictly to prevent the hosting of malware or infrastructure-compromising exploits."
    ]
  },
  {
    id: "third-party-services",
    title: "9. Third-Party Services",
    content: [
      "To operate our global infrastructure, we may engage trusted third-party sub-processors. These include cloud hosting providers, email delivery services, and logging aggregators.",
      "All third-party services are bound by strict Data Processing Agreements (DPAs) that mandate robust security postures. We do not permit our sub-processors to use your Personal Data for any purpose other than providing the contracted service to XyphX."
    ]
  },
  {
    id: "data-sharing",
    title: "10. Data Sharing & Disclosure",
    content: [
      "We will only disclose your Personal Data under the following circumstances:",
      "• **With Your Consent:** When you explicitly authorize us to share information with a third-party integration.",
      "• **Service Providers:** As described in Section 9, with trusted sub-processors.",
      "• **Legal Obligations:** When legally required by subpoenas, court orders, or valid law enforcement requests. We rigorously review all requests for legal validity and will notify you prior to disclosure unless prohibited by law."
    ]
  },
  {
    id: "data-retention",
    title: "11. Data Retention",
    content: [
      "We retain your Personal Data only for as long as necessary to fulfill the purposes outlined in this Policy, or to comply with our legal and regulatory obligations.",
      "• **Account Data:** Retained until you explicitly request account deletion.",
      "• **API Logs:** Retained for 30 days for debugging, then aggregated.",
      "• **Cloud Storage:** Retained indefinitely until deleted via the API or dashboard, or until your account is terminated for violating our Terms of Service."
    ]
  },
  {
    id: "security-measures",
    title: "12. Security Measures",
    content: [
      "XyphX is dedicated to maintaining an enterprise-grade security posture. Our security measures include:",
      "• Encryption of all data in transit using TLS 1.2 or higher.",
      "• Encryption of all data at rest for sensitive configurations.",
      "• Continuous vulnerability scanning, penetration testing, and automated infrastructure monitoring.",
      "• Strict adherence to the principle of least privilege (PoLP) for internal data access."
    ]
  },
  {
    id: "user-rights",
    title: "13. User Rights",
    content: [
      "Depending on your jurisdiction, you are entitled to comprehensive rights regarding your Personal Data. These include the right to access, correct, update, port, or delete your information.",
      "You can exercise the majority of these rights directly through your XyphX developer dashboard."
    ]
  },
  {
    id: "gdpr-rights",
    title: "14. GDPR Rights",
    content: [
      "For residents of the European Economic Area (EEA) and the United Kingdom, XyphX adheres to the General Data Protection Regulation (GDPR) and the UK GDPR.",
      "Your rights include the Right to Erasure (Right to be Forgotten) and the Right to Data Portability. Our legal basis for processing your data includes the performance of a contract and our legitimate interests in securing and optimizing our infrastructure."
    ]
  },
  {
    id: "ccpa-rights",
    title: "15. CCPA Rights",
    content: [
      "For residents of California, XyphX adheres to the California Consumer Privacy Act (CCPA).",
      "You have the right to know what personal information is collected, the right to delete personal information, and the right to opt-out of the sale or sharing of personal information (Note: XyphX does NOT sell your personal information)."
    ]
  },
  {
    id: "data-deletion",
    title: "16. Data Deletion Requests",
    content: [
      "You may request the permanent deletion of your XyphX account and all associated Personal Data at any time via the developer console or by contacting support.",
      "Upon initiating a deletion request, we will expunge your data from our primary production systems within 14 days."
    ]
  },
  {
    id: "changes",
    title: "17. Changes to Privacy Policy",
    content: [
      "As our technology ecosystem evolves, we may periodically update this Privacy Policy. We will notify you of material changes by sending an email to the primary address associated with your account and by displaying a prominent notice within the developer dashboard.",
      "Your continued use of the Services following the effective date of an updated Privacy Policy constitutes your acceptance of the revised terms."
    ]
  },
  {
    id: "contact",
    title: "18. Contact Information",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data processing practices, please contact our Data Protection Officer and legal team.",
      "Email: privacy@xyphx.com"
    ]
  }
];
