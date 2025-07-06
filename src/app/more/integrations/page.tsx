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
import Sidebar from "../../sidebar/page";
import { useRouter } from "next/navigation";

const IntegrationsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("more/integrations");
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

  const handleConnect = (integration: any) => {
    console.log(`Connecting to ${integration.name}`);
    // Handle connection logic here
  };

  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="ml-64 px-6 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Integrations
            </h1>
            <p className="text-gray-600">
              Connect your favorite apps and services
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredIntegrations.map((integration) => (
              <div
                key={integration.id}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer relative"
              >
                {integration.isPopular && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}

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
                    <p className="text-sm text-gray-500 mb-2">
                      {integration.description}
                    </p>
                    <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {integration.category}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 space-y-1">
                      {integration.features
                        .slice(0, 2)
                        .map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center"
                          >
                            <span>• {feature}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Status/Action */}
                  <div className="mt-4">
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

                  {/* Connected Date */}
                  {integration.connectedDate &&
                    integration.status === "connected" && (
                      <div className="mt-2 text-xs text-gray-400">
                        Connected on{" "}
                        {new Date(
                          integration.connectedDate
                        ).toLocaleDateString()}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredIntegrations.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No integrations found
              </h3>
              <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default IntegrationsPage;
