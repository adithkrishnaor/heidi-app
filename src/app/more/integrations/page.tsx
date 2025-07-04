"use client";
import React, { useState } from "react";
import {
  Search,
  Plus,
  Settings,
  CheckCircle,
  XCircle,
  ExternalLink,
  Zap,
  Globe,
  Database,
  MessageSquare,
} from "lucide-react";
import Navbar from "../../navbar/page";
import { useRouter } from "next/navigation";

const IntegrationsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("integrations");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // Mock integrations data
  const [integrations] = useState([
    {
      id: 1,
      name: "Slack",
      description: "Connect directly",
      category: "Communication",
      status: "connected",
      icon: "💬",
      color: "bg-purple-500",
      connectedDate: "2024-01-10",
      features: ["Real-time messaging", "File sharing", "Channel management"],
      isPopular: true,
    },
    {
      id: 2,
      name: "MS Teams",
      description: "Connect directly",
      category: "Communication",
      status: "available",
      icon: "🎥",
      color: "bg-blue-500",
      connectedDate: null,
      features: ["Video meetings", "Screen sharing", "Chat integration"],
      isPopular: true,
    },
    {
      id: 3,
      name: "Salesforce",
      description: "Connect directly",
      category: "CRM",
      status: "available",
      icon: "☁️",
      color: "bg-blue-600",
      connectedDate: "2024-01-05",
      features: ["Lead management", "Contact sync", "Pipeline tracking"],
      isPopular: false,
    },
    {
      id: 4,
      name: "Google WS",
      description: "Connect directly",
      category: "Productivity",
      status: "available",
      icon: "🔧",
      color: "bg-green-500",
      connectedDate: "2024-01-01",
      features: ["Gmail integration", "Calendar sync", "Drive storage"],
      isPopular: true,
    },
    {
      id: 5,
      name: "Zapier",
      description: "Connect 3000+ apps",
      category: "Automation",
      status: "available",
      icon: "⚡",
      color: "bg-orange-500",
      connectedDate: null,
      features: [
        "Workflow automation",
        "Multi-app integration",
        "Trigger-based actions",
      ],
      isPopular: false,
    },
    {
      id: 6,
      name: "HubSpot",
      description: "Connect directly",
      category: "CRM",
      status: "available",
      icon: "🎯",
      color: "bg-orange-600",
      connectedDate: null,
      features: ["Contact management", "Email marketing", "Analytics"],
      isPopular: false,
    },
    {
      id: 7,
      name: "Asana",
      description: "Connect directly",
      category: "Productivity",
      status: "available",
      icon: "📋",
      color: "bg-pink-500",
      connectedDate: "2024-01-08",
      features: ["Task management", "Project tracking", "Team collaboration"],
      isPopular: false,
    },
    {
      id: 8,
      name: "API Access",
      description: "Custom integration",
      category: "Developer",
      status: "available",
      icon: "🔌",
      color: "bg-gray-600",
      connectedDate: null,
      features: ["Custom endpoints", "Webhook support", "Authentication"],
      isPopular: false,
    },
  ]);

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

  const handleConnect = (integration: any) => {
    console.log(`Connecting to ${integration.name}`);
  };

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
                  { name: "Billing", key: "billing", active: false },
                  { name: "Preferences", key: "preferences", active: false },
                  { name: "Integrations", key: "integrations", active: true },
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
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              {/* Integrations Grid */}
              <div className="grid grid-cols-4 gap-6">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="mb-4">
                        <div
                          className={`w-16 h-16 ${integration.color} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4`}
                        >
                          {integration.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {integration.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4">
                          {integration.description}
                        </p>
                      </div>

                      {integration.status === "connected" ? (
                        <div className="flex items-center justify-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Connected</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleConnect(integration)}
                          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IntegrationsPage;
