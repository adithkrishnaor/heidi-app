"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "../../navbar/page";
import { useRouter } from "next/navigation";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("faqs");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const router = useRouter();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);

    switch (page) {
      case "home":
        router.push("/home");
        break;
      case "account":
        router.push("/more/account");
        break;
      case "contacts":
        router.push("/more/contacts");
        break;
      case "billing":
        router.push("/more/billing");
        break;
      case "preferences":
        router.push("/more/preferences");
        break;
      case "integrations":
        router.push("/more/integrations");
        break;
      case "team & roles":
        router.push("/more/team-roles");
        break;
      case "faqs":
        router.push("/more/faqs");
        break;
      case "support chat":
        router.push("/more/support");
        break;
      case "logout":
        console.log("Logging out...");
        break;
      case "meetings":
        router.push("/meetings");
        break;
      case "calendar":
        router.push("/calendar");
        break;
      case "more":
        router.push("/more");
        break;
      default:
        router.push(`/${page}`);
    }
  };

  const faqData: FAQItem[] = [
    {
      question: "How does billing work for the Heidi AI platform?",
      answer:
        "Heidi AI offers flexible billing options including monthly and annual subscriptions. You can choose from different plans based on your usage needs. All plans include core features with varying limits on AI interactions, storage, and advanced features. Payment is processed securely through our payment gateway, and you'll receive detailed invoices for your records.",
    },
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time through your account settings. When you upgrade, you'll have immediate access to new features and increased limits. When you downgrade, changes will take effect at the start of your next billing cycle. Any unused credits or features will be adjusted accordingly.",
    },
    {
      question: "Do you offer discounts for educational institutions?",
      answer:
        "Yes, we offer special educational discounts for qualified educational institutions, students, and teachers. Educational discounts can range from 20-50% off regular pricing depending on the plan and institution size. Please contact our sales team with your educational credentials to learn more about available discounts and verify eligibility.",
    },
    {
      question: "What AI models does Heidi AI use?",
      answer:
        "Heidi AI utilizes state-of-the-art large language models including GPT-4, Claude, and other advanced AI systems. We continuously update our models to provide the best performance and accuracy. Different features may use different specialized models optimized for specific tasks like document analysis, conversation, or data processing.",
    },
    {
      question: "How secure is my data with Heidi AI?",
      answer:
        "Data security is our top priority. We use enterprise-grade encryption for data in transit and at rest, comply with GDPR and other privacy regulations, and follow SOC 2 Type II security standards. Your data is never used to train AI models, and we provide detailed privacy controls so you can manage your information according to your preferences.",
    },
    {
      question: "Can I integrate Heidi AI with other tools?",
      answer:
        "Yes, Heidi AI offers extensive integration capabilities with popular tools and platforms including Slack, Microsoft Teams, Google Workspace, Notion, and many others. We provide APIs and webhooks for custom integrations. Check our integrations page for a complete list of supported platforms and setup instructions.",
    },
    {
      question: "What support options are available?",
      answer:
        "We offer multiple support channels including 24/7 live chat, email support, comprehensive documentation, video tutorials, and community forums. Premium plan users get priority support with faster response times. We also offer onboarding sessions and training for teams to help you get the most out of Heidi AI.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial that includes access to core features with some usage limitations. No credit card is required to start your trial. This gives you time to explore the platform and see how it fits your workflow before committing to a paid plan.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="bg-blue-600 rounded-2xl overflow-hidden">
              <div className="space-y-0">
                {[
                  { name: "Home", key: "home", active: false },
                  { name: "Account", key: "account", active: false },
                  { name: "Contacts", key: "contacts", active: false },
                  { name: "Billing", key: "billing", active: false },
                  { name: "Preferences", key: "preferences", active: false },
                  { name: "Integrations", key: "integrations", active: false },
                  { name: "Team & Roles", key: "team & roles", active: false },
                  { name: "FAQs", key: "faqs", active: true },
                  { name: "Support Chat", key: "support chat", active: false },
                  { name: "Logout", key: "logout", active: false },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`px-6 py-4 ${
                      item.active
                        ? "bg-blue-500 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-500"
                    } cursor-pointer transition-colors`}
                    onClick={() => handleNavigation(item.key)}
                  >
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Frequently Asked Questions
                </h1>
                <p className="text-gray-600">
                  Find answers to common questions about Heidi AI
                </p>
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-900 pr-4">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0 text-blue-600">
                        {openFAQ === index ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Support Section */}
              <div className="mt-12 text-center">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Our support team is here to help you get the most out of
                    Heidi AI
                  </p>
                  <button
                    onClick={() => handleNavigation("support chat")}
                    className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FAQsPage;
