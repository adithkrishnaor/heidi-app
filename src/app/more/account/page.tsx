"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, CheckCircle, AlertCircle, X } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AlertProps {
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
}

interface UpdateUserData {
  email: string;
  name: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const alertStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  };

  const iconStyles = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
  };

  return (
    <div
      className={`border rounded-lg p-4 mb-4 ${alertStyles[type]} flex items-center justify-between`}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <CheckCircle className={`w-5 h-5 mr-3 ${iconStyles[type]}`} />
        ) : (
          <AlertCircle className={`w-5 h-5 mr-3 ${iconStyles[type]}`} />
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className={`${iconStyles[type]} hover:opacity-75 transition-opacity`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const AccountPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("more/account");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [alert, setAlert] = useState<
    { type: "success" | "error" | "warning"; message: string } | null
  >(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  // Load user data on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          router.push("/login");
          return;
        }

        const user = JSON.parse(userData);
        const response = await fetch(
          `/api/auth/account?email=${encodeURIComponent(user.email)}`
        );
        const data = await response.json();

        if (data.success) {
          setFormData((prev) => ({
            ...prev,
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "", 
          }));
        } else {
          showAlert("error", "Failed to load user data");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        showAlert("error", "Failed to load user data");
      } finally {
        setIsLoadingData(false);
      }
    };

    loadUserData();
  }, [router]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);

    // Handle navigation similar to navbar
    if (page === "logout") {
      // Clear any stored user data/tokens
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear alert when user starts typing
    if (alert) {
      setAlert(null);
    }
  };

  const showAlert = (
    type: "success" | "error" | "warning",
    message: string
  ) => {
    setAlert({ type, message });
    if (type === "success") {
      setTimeout(() => setAlert(null), 5000);
    }
  };

  const handleSave = async () => {
    setAlert(null);

    // Basic validation
    if (!formData.name.trim()) {
      showAlert("error", "Name is required");
      return;
    }

    if (!formData.email.trim()) {
      showAlert("error", "Email is required");
      return;
    }

    // Password validation only if password is provided
    if (formData.password && formData.password.length < 6) {
      showAlert("error", "Password must be at least 6 characters long");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      showAlert("error", "Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const updateData: UpdateUserData = {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
      };

      // Only include password if it's provided
      if (formData.password.trim() !== "") {
        updateData.password = formData.password;
        updateData.confirmPassword = formData.confirmPassword;
      }

      const response = await fetch("/api/auth/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        // Update localStorage with new user data
        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = {
          ...currentUser,
          ...data.user,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        showAlert("success", "Account updated successfully!");

        // Clear password fields after successful update
        setFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
        }));
      } else {
        showAlert("error", data.error || "Failed to update account");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      showAlert("error", "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while fetching user data
  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading account data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content with left margin to account for fixed sidebar */}
      <main className="ml-64 px-6 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          {/* Alert Component */}
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}

          <div className="flex items-start space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden">
                  <Image
                    src="/api/placeholder/128/128"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      if (e.currentTarget.nextElementSibling) {
                        (
                          e.currentTarget.nextElementSibling as HTMLElement
                        ).style.display = "flex";
                      }
                    }}
                  />
                  <div
                    className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"
                    style={{ display: "none" }}
                  >
                    <User className="w-12 h-12 text-white" />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full text-black px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full text-black px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full text-black px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-50"
                  disabled={true} // Email should not be editable
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password (leave blank to keep current)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full px-4 text-black py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="w-full px-4 text-black py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
