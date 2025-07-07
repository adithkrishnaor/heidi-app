"use client";
import React, { useState } from "react";
import { Search, User, MessageSquare, Video } from "lucide-react";
import Sidebar from "../../sidebar/page";
import { useRouter } from "next/navigation";

const TeamRolesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("more/team-roles");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);
  const router = useRouter();

  interface TeamMember {
    id: number;
    name: string;
    role: string;
    email: string;
    avatar: string | null;
    status: "active" | "inactive";
  }

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      email: "john.doe@company.com",
      avatar: null,
      status: "active",
    },
    {
      id: 2,
      name: "John Doe",
      role: "Admin",
      email: "john.doe2@company.com",
      avatar: null,
      status: "active",
    },
    {
      id: 3,
      name: "John Doe",
      role: "Accountant",
      email: "john.doe3@company.com",
      avatar: null,
      status: "active",
    },
    {
      id: 4,
      name: "John Doe",
      role: "Accountant",
      email: "john.doe4@company.com",
      avatar: null,
      status: "active",
    },
    {
      id: 5,
      name: "John Doe",
      role: "Assistant",
      email: "john.doe5@company.com",
      avatar: null,
      status: "active",
    },
    {
      id: 6,
      name: "John Doe",
      role: "Assistant",
      email: "john.doe6@company.com",
      avatar: null,
      status: "active",
    },
    {
      id: 7,
      name: "John Doe",
      role: "Assistant",
      email: "john.doe7@company.com",
      avatar: null,
      status: "active",
    },
    {
      id: 8,
      name: "John Doe",
      role: "Assistant",
      email: "john.doe8@company.com",
      avatar: null,
      status: "active",
    },
    {
      id: 9,
      name: "John Doe",
      role: "Assistant",
      email: "john.doe9@company.com",
      avatar: null,
      status: "active",
    },
    {
      id: 10,
      name: "John Doe",
      role: "Assistant",
      email: "john.doe10@company.com",
      avatar: null,
      status: "active",
    },
  ]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);

    // Handle navigation similar to account page
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

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (user: TeamMember) => {
    setSelectedUser(user);
  };

  const handleChat = () => {
    console.log("Starting chat with", selectedUser?.name);
  };

  const handleMeeting = () => {
    console.log("Starting meeting with", selectedUser?.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="ml-64 px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Team Members List */}
          <div className="col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Team Members List */}
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => handleUserSelect(member)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedUser?.id === member.id
                        ? "bg-blue-50 border border-blue-200"
                        : ""
                    }`}
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User Details */}
          <div className="col-span-7">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              {selectedUser ? (
                <div>
                  {/* User Header */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedUser.name}
                      </h2>
                      <p className="text-gray-600 mt-1">{selectedUser.role}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mb-6">
                    <button
                      onClick={handleChat}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat</span>
                    </button>
                    <button
                      onClick={handleMeeting}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      <span>Meeting</span>
                    </button>
                  </div>

                  {/* User Details */}
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email:
                      </label>
                      <p className="text-gray-900">{selectedUser.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a team member
                    </h3>
                    <p className="text-gray-500">
                      Choose a team member from the list to view their details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamRolesPage;
