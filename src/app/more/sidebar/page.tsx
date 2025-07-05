"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Home,
  Calendar,
  Users,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Video,
  Play,
  Camera,
  Lightbulb,
  CheckSquare,
  MessageSquare,
  History,
  Tag,
  User,
  CreditCard,
  Bell,
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

  // Simplified navigation handler similar to navbar
  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Handle special logout case
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
        { id: "home/upcoming", label: "Upcoming Meetings", icon: null },
      ],
    },
    {
      id: "meetings",
      label: "Meetings",
      icon: <Video className="w-4 h-4" />,
      customIcon: "/icons/cam-recorder.png",
      children: [
        { id: "meetings", label: "Recording Library", icon: null },
        { id: "meetings/capture", label: "Live Capture", icon: null },
      ],
    },
    {
      id: "insights",
      label: "Insights",
      icon: <Lightbulb className="w-4 h-4" />,
      customIcon: "/icons/calendar.png",
      children: [
        { id: "insights", label: "Insights List", icon: null },
        { id: "insights/tasks", label: "Tasks", icon: null },
      ],
    },
    {
      id: "ai",
      label: "Heidi Core",
      icon: <MessageSquare className="w-4 h-4" />,
      customIcon: "/images/Icon.png",
      children: [
        { id: "ai", label: "New Chat", icon: null },
        { id: "ai/history", label: "Thread History", icon: null },
      ],
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: <Users className="w-4 h-4" />,
      children: [
        { id: "contacts", label: "Contacts List", icon: null },
        { id: "contacts/segments", label: "Segments & Tags", icon: null },
      ],
    },
    {
      id: "templates",
      label: "Templates",
      icon: <FileText className="w-4 h-4" />,
      children: [
        { id: "templates", label: "Templates List", icon: null },
        { id: "templates/create", label: "Create/Edit Template", icon: null },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-4 h-4" />,
      children: [
        { id: "analytics/personal", label: "Personal View", icon: null },
        { id: "analytics/team", label: "Team View", icon: null },
      ],
    },
    {
      id: "billing",
      label: "Billing",
      icon: <CreditCard className="w-4 h-4" />,
      children: [],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
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
      id: "logout",
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
          } ${level > 0 ? "pl-8" : ""}`}
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center space-x-3">
            {level === 0 && (
              <div className={`${active ? "text-blue-600" : "text-gray-500"}`}>
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
              }`}
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
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="py-4">
        {sidebarData.map((item) => renderSidebarItem(item))}
      </div>
    </div>
  );
};

export default Sidebar;
