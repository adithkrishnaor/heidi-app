"use client";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { useRouter } from "next/navigation";

const BillingPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("more/billing");
  const router = useRouter();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);

    // Handle navigation similar to AccountPage
    if (page === "logout") {
      // Clear any stored user data/tokens
      if (typeof window !== "undefined") {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");
        sessionStorage.clear();
      }
      router.push("/login");
      return;
    }

    // Navigate to the appropriate route
    router.push(`/${page}`);
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
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="ml-64 px-6 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Plans</h1>
            <p className="text-gray-600">
              Choose the perfect plan for your needs
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-gray-50 rounded-2xl border-2 p-6 hover:shadow-lg transition-shadow ${
                  plan.popular
                    ? "border-blue-500 shadow-lg bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
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

                {/* Features List */}
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

                {/* Action Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Additional Billing Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current Plan */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Current Plan
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium text-gray-900">
                    Professional
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Billing Cycle:</span>
                  <span className="font-medium text-gray-900">Monthly</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Next Payment:</span>
                  <span className="font-medium text-gray-900">
                    Jan 15, 2025
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-900">$79.00</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Method
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <span className="text-gray-900">•••• •••• •••• 4242</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expires:</span>
                  <span className="font-medium text-gray-900">12/26</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Update Payment Method
                </button>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Billing History
            </h3>
            <div className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        date: "Dec 15, 2024",
                        description: "Professional Plan",
                        amount: "$79.00",
                        status: "Paid",
                      },
                      {
                        date: "Nov 15, 2024",
                        description: "Professional Plan",
                        amount: "$79.00",
                        status: "Paid",
                      },
                      {
                        date: "Oct 15, 2024",
                        description: "Professional Plan",
                        amount: "$79.00",
                        status: "Paid",
                      },
                    ].map((invoice, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invoice.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invoice.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {invoice.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillingPage;
