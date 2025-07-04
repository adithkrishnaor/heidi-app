"use client";
import React, { useState } from "react";
import Navbar from "../../navbar/page";
import { useRouter } from "next/navigation";

const BillingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("billing");
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

  const plans = [
    {
      name: "Starter",
      price: 29,
      period: "per user / month",
      features: [
        "Basic AI assistance",
        "5 virtual assistants",
        "Email support",
        "Basic analytics",
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-blue-200 text-blue-800 hover:bg-blue-300",
      popular: false,
    },
    {
      name: "Professional",
      price: 79,
      period: "per user / month",
      features: [
        "Advanced AI capabilities",
        "Unlimited virtual assistants",
        "Priority support",
        "Advanced analytics dashboard",
        "API access",
      ],
      buttonText: "Choose Plan",
      buttonStyle: "bg-blue-600 text-white hover:bg-blue-700",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored solutions",
      features: [
        "Customized AI solutions",
        "Dedicated account manager",
        "Premium support 24/7",
        "Custom integrations",
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-yellow-400 text-black hover:bg-yellow-500",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={handleNavigation} />

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
                  { name: "Billing", key: "billing", active: true },
                  { name: "Preferences", key: "preferences", active: false },
                  { name: "Integrations", key: "integrations", active: false },
                  { name: "Team & Roles", key: "team & roles", active: false },
                  { name: "FAQs", key: "faqs", active: false },
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
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Our Plans
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl border-2 p-6 ${
                    plan.popular
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200"
                  }`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {typeof plan.price === "number"
                          ? `$${plan.price}`
                          : plan.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{plan.period}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            plan.popular ? "bg-blue-500" : "bg-gray-400"
                          }`}
                        />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingPage;
