"use client";
import React, { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import Navbar from "../../navbar/page";
import { useRouter } from "next/navigation";

const SupportChatPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("support chat");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const handleNavigation = (page: string) => {
    switch (page) {
      case "home":
        setCurrentPage("home");
        router.push("/home");
        break;
      case "account":
        setCurrentPage("account");
        router.push("/more/account");
        break;
      case "contacts":
        setCurrentPage("contacts");
        router.push("/more/contacts");
        break;
      case "billing":
        setCurrentPage("billing");
        router.push("/more/billing");
        break;
      case "preferences":
        setCurrentPage("preferences");
        router.push("/more/preferences");
        break;
      case "integrations":
        setCurrentPage("integrations");
        router.push("/more/integrations");
        break;
      case "team & roles":
        setCurrentPage("team & roles");
        router.push("/more/team-roles");
        break;
      case "faqs":
        setCurrentPage("faqs");
        router.push("/more/faqs");
        break;
      case "support chat":
        setCurrentPage("support chat");
        router.push("/more/support");
        break;
      case "logout":
        // Clear any stored user data/tokens
        if (typeof window !== "undefined") {
          // Clear localStorage if you're using it for user data
          localStorage.removeItem("userToken");
          localStorage.removeItem("userData");
          // Clear sessionStorage if you're using it
          sessionStorage.clear();
        }
        // Navigate to login page
        router.push("/login");
        break;
      case "meetings":
        setCurrentPage("meetings");
        router.push("/meetings");
        break;
      case "calendar":
        setCurrentPage("calendar");
        router.push("/calendar");
        break;
      case "ai":
        setCurrentPage("ai");
        router.push("/ai");
        break;
      case "more":
        setCurrentPage("account");
        router.push("/more/account");
        break;
      default:
        setCurrentPage(page);
        router.push(`/${page}`);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      console.log("Support request submitted:", formData);

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting support request:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
                  { name: "FAQs", key: "faqs", active: false },
                  { name: "Support Chat", key: "support chat", active: true },
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
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Support Chat
                  </h1>
                  <p className="text-gray-600">
                    We're here to help! Send us a message and we'll get back to
                    you soon.
                  </p>
                </div>
              </div>

              {/* Success Message */}
              {isSubmitted && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-green-700 text-sm">
                        We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Support Form */}
              <div className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Here"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Here"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Enter Here"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  />
                </div>

                {/* Send Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Additional Support Options */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Other ways to get help
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-xl text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-blue-900 mb-1">FAQs</h4>
                    <p className="text-sm text-blue-700">
                      Check our frequently asked questions
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Email Support
                    </h4>
                    <p className="text-sm text-green-700">
                      support@heidiai.com
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl text-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-purple-900 mb-1">
                      Documentation
                    </h4>
                    <p className="text-sm text-purple-700">
                      Comprehensive guides and tutorials
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportChatPage;
