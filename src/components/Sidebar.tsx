"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Video,
  Lightbulb,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  customIcon?: string;
  children?: SidebarItem[];
  isExpanded?: boolean;
  route?: string;
}

interface SidebarProps {
  currentPage: string;
  onNavigate?: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const router = useRouter();

  // Single logout handler
  const handleLogout = () => {
    console.log("Logging out..."); // Debug log

    // Clear all user data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");

    // Clear session storage
    sessionStorage.clear();

    // Force redirect to login page
    router.replace("/login"); // Use replace instead of push to prevent back navigation
  };

  // Updated navigation handler
  const handleNavClick = (page: string) => {
    console.log("Navigation clicked:", page); // Debug log

    // Handle logout specifically
    if (page === "logout" || page === "login") {
      handleLogout();
      return;
    }

    if (onNavigate) {
      onNavigate(page);
    } else {
      // Direct navigation based on page string
      router.push(`/${page}`);
    }
  };

  const sidebarData: SidebarItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home className="w-4 h-4" />,
      customIcon: "/icons/home.png",
      children: [
        { id: "home", label: "Overview", icon: null },
        { id: "calendar", label: "Upcoming Meetings", icon: null },
      ],
    },
    {
      id: "meetings",
      label: "Meetings",
      icon: <Video className="w-4 h-4" />,
      customIcon: "/icons/calendar.png",
      children: [
        { id: "meetings", label: "Recording Library", icon: null },
        { id: "meetings/capture", label: "Live Capture", icon: null },
      ],
    },
    {
      id: "insights",
      label: "Insights",
      icon: <Lightbulb className="w-4 h-4" />,
      customIcon: "/icons/insights.png",
      children: [
        { id: "insights", label: "Insights List", icon: null },
        { id: "insights/tasks", label: "Tasks", icon: null },
      ],
    },
    {
      id: "heidiCore",
      label: "Heidi Core",
      icon: <MessageSquare className="w-4 h-4" />,
      customIcon: "/icons/heidi_core.png",
      children: [
        { id: "heidiCore", label: "New Chat", icon: null },
        { id: "heidiCore/history", label: "Thread History", icon: null },
      ],
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: <Users className="w-4 h-4" />,
      customIcon: "/icons/contact.png",
      children: [
        { id: "more/contacts", label: "Contacts List", icon: null },
        { id: "contacts/segments", label: "Segments & Tags", icon: null },
      ],
    },
    {
      id: "templates",
      label: "Templates",
      icon: <FileText className="w-4 h-4" />,
      customIcon: "/icons/template.png",
      children: [
        { id: "templates", label: "Templates List", icon: null },
        { id: "templates/create", label: "Create/Edit Template", icon: null },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-4 h-4" />,
      customIcon: "/icons/analytics.png",
      children: [
        { id: "analytics/personal", label: "Personal View", icon: null },
        { id: "analytics/team", label: "Team View", icon: null },
      ],
    },
    {
      id: "more/billing",
      label: "Billing",
      icon: <CreditCard className="w-4 h-4" />,
      customIcon: "/icons/billings.png",
      children: [],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      customIcon: "/icons/settings.png",
      children: [
        { id: "more/account", label: "Profile & Preferences", icon: null },
        { id: "more/integrations", label: "Integrations", icon: null },
        { id: "more/team-roles", label: "Team & Roles", icon: null },
        { id: "more/preferences", label: "Notifications", icon: null },
      ],
    },
    {
      id: "help",
      label: "Help",
      icon: <HelpCircle className="w-4 h-4" />,
      children: [
        { id: "more/faqs", label: "FAQ & Tutorials", icon: null },
        { id: "more/support", label: "Support Chat", icon: null },
      ],
    },
    {
      id: "logout", // Changed from "login" to "logout"
      label: "Logout",
      icon: <LogOut className="w-4 h-4" />,
      children: [],
    },
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isExpanded = (itemId: string) => expandedItems.includes(itemId);

  const isActive = (itemId: string) => {
    // Simplified active state checking
    if (currentPage === itemId) return true;

    // Handle nested routes
    if (currentPage.startsWith("more/")) {
      const page = currentPage.replace("more/", "");
      return itemId === `more/${page}`;
    }

    // Handle parent-child relationships
    if (itemId === "home" && currentPage === "home") return true;
    if (itemId === "meetings" && currentPage === "meetings") return true;
    if (itemId === "ai" && currentPage === "ai") return true;
    if (itemId === "contacts" && currentPage === "contacts") return true;
    if (itemId === "billing" && currentPage === "billing") return true;

    return false;
  };

  const handleItemClick = (item: SidebarItem) => {
    console.log("Item clicked:", item.id); // Debug log

    // Special handling for logout
    if (item.id === "logout") {
      handleLogout();
      return;
    }

    if (item.children && item.children.length > 0) {
      // Toggle expansion for parent items
      toggleExpanded(item.id);
    } else {
      // Navigate for leaf items
      handleNavClick(item.id);
    }
  };

  const renderSidebarItem = (item: SidebarItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const expanded = isExpanded(item.id);
    const active = isActive(item.id);

    return (
      <div key={item.id} className="w-full">
        <div
          className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors ${
            active
              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              : "text-gray-700"
          } ${level > 0 ? "pl-8" : ""} ${
            item.id === "logout" ? "hover:bg-red-50 hover:text-red-600" : ""
          }`}
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center space-x-3">
            {level === 0 && (
              <div
                className={`${
                  active ? "text-blue-600" : "text-gray-500"
                } ${item.id === "logout" ? "text-red-500" : ""}`}
              >
                {item.customIcon ? (
                  <Image
                    src={item.customIcon}
                    alt={`${item.label} icon`}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                ) : (
                  item.icon
                )}
              </div>
            )}
            <span
              className={`text-sm font-medium ${
                level > 0 ? "text-gray-600" : ""
              } ${item.id === "logout" ? "text-red-600" : ""}`}
            >
              {item.label}
            </span>
          </div>
          {hasChildren && (
            <div className="text-gray-400">
              {expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </div>
          )}
        </div>
        {hasChildren && expanded && (
          <div className="border-l border-gray-200 ml-5">
            {item.children?.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="px-4 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/images/icon_and_text.png"
              alt="Heidi AI Text"
              width={160}
              height={120}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="py-4">{sidebarData.map((item) => renderSidebarItem(item))}</div>
    </div>
  );
};

export default Sidebar;
