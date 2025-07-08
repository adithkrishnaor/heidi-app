"use client";
import React, { useState } from "react";
import { Search, User, MessageCircle, Video, Plus, Filter } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import { useRouter } from "next/navigation";

const ContactsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("more/contacts");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contacts | null>(null);
  const router = useRouter();

  interface Contacts {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    lastContact: string;
    status: "active" | "inactive";
  }
  // Mock contacts data
  const [contacts] = useState<Contacts[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "+1 (555) 123-4567",
      role: "Patient",
      lastContact: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@gmail.com",
      phone: "+1 (555) 987-6543",
      role: "Doctor",
      lastContact: "2024-01-14",
      status: "active",
    },
    {
      id: 3,
      name: "Dr. Robert Johnson",
      email: "r.johnson@hospital.com",
      phone: "+1 (555) 456-7890",
      role: "Specialist",
      lastContact: "2024-01-13",
      status: "active",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@gmail.com",
      phone: "+1 (555) 321-0987",
      role: "Patient",
      lastContact: "2024-01-12",
      status: "inactive",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "m.brown@clinic.com",
      phone: "+1 (555) 654-3210",
      role: "Nurse",
      lastContact: "2024-01-11",
      status: "active",
    },
  ]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);

    // Handle navigation similar to navbar
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

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSelect = (contact: Contacts) => {
    setSelectedContact(contact);
  };

  const handleStartChat = (contact: Contacts) => {
    console.log(`Starting chat with ${contact.name}`);
  };

  const handleStartMeeting = (contact: Contacts) => {
    console.log(`Starting meeting with ${contact.name}`);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "doctor":
        return "bg-green-100 text-green-800";
      case "specialist":
        return "bg-purple-100 text-purple-800";
      case "nurse":
        return "bg-blue-100 text-blue-800";
      case "patient":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="ml-64 px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Contacts List */}
          <div className="col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200 h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Contacts
                  </h2>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Filter className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              {/* Contacts List */}
              <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedContact?.id === contact.id
                        ? "bg-blue-50 border-blue-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {contact.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getRoleColor(
                              contact.role
                            )}`}
                          >
                            {contact.role}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {contact.email}
                        </p>
                        <p className="text-xs text-gray-400">
                          Last contact: {contact.lastContact}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="col-span-7">
            <div className="bg-white rounded-2xl border border-gray-200 h-full">
              {selectedContact ? (
                <div className="p-6">
                  {/* Contact Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          {selectedContact.name}
                        </h2>
                        <span
                          className={`px-3 py-1 text-sm rounded-full ${getRoleColor(
                            selectedContact.role
                          )}`}
                        >
                          {selectedContact.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStartChat(selectedContact)}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat</span>
                      </button>
                      <button
                        onClick={() => handleStartMeeting(selectedContact)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Video className="w-4 h-4" />
                        <span>Meeting</span>
                      </button>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <p className="text-gray-900">{selectedContact.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <p className="text-gray-900">{selectedContact.phone}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Role
                        </label>
                        <p className="text-gray-900">{selectedContact.role}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Contact
                        </label>
                        <p className="text-gray-900">
                          {selectedContact.lastContact}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            selectedContact.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedContact.status.charAt(0).toUpperCase() +
                            selectedContact.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm text-gray-900">
                            Meeting scheduled
                          </p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm text-gray-900">
                            Chat message sent
                          </p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="text-sm text-gray-900">
                            Profile updated
                          </p>
                          <p className="text-xs text-gray-500">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Select a contact
                    </h3>
                    <p className="text-gray-500">
                      Choose a contact from the list to view their details
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

export default ContactsPage;
