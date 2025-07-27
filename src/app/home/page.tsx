"use client";

import React, { useState, useEffect } from "react";
import { Video, Plus, Upload, Play, Clock } from "lucide-react";
import Image from "next/image";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

// Define proper user type instead of using 'any'
interface User {
  id: string;
  email: string;
  name?: string;
  loginTime?: string;
  [key: string]: unknown; // For any additional properties
}

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState<User | null>(null); // Replace 'any' with 'User | null'
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication on page load
    const userData = localStorage.getItem("user");

    if (!userData) {
      // Not authenticated - redirect to login
      router.push("/login");
      return;
    }

    try {
      const parsedUser: User = JSON.parse(userData); // Type the parsed user
      setUser(parsedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }

    setIsLoading(false);
  }, [router]);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    router.push(`/${page}`);
  };

  // Show loading while checking auth
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="ml-64 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16 md:mb-0">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back to Heidi!
          </h2>
          <p className="text-blue-500 font-medium">
            Hello {user.email.split("@")[0]}! Here&apos;s your dashboard
            overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              Meetings Today
            </h3>
            <p className="text-3xl font-bold text-gray-900">1</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Insights</h3>
            <p className="text-3xl font-bold text-gray-900">2</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              Tasks Created
            </h3>
            <p className="text-3xl font-bold text-gray-900">3</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Action Buttons */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6 flex flex-col items-center justify-center hover:from-blue-500 hover:to-blue-700 transition-all transform hover:scale-105">
                <Video className="w-8 h-8 mb-3" />
                <span className="font-medium">New Meeting</span>
              </button>

              <button className="bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl p-6 flex flex-col items-center justify-center hover:from-orange-500 hover:to-orange-700 transition-all transform hover:scale-105">
                <Plus className="w-8 h-8 mb-3" />
                <span className="font-medium">Join Meeting</span>
              </button>

              <button className="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-6 flex flex-col items-center justify-center hover:from-green-500 hover:to-green-700 transition-all transform hover:scale-105">
                <Video className="w-8 h-8 mb-3" />
                <span className="font-medium">Live Capture</span>
              </button>

              <button className="bg-gradient-to-br from-pink-400 to-pink-600 text-white rounded-2xl p-6 flex flex-col items-center justify-center hover:from-pink-500 hover:to-pink-700 transition-all transform hover:scale-105">
                <Upload className="w-8 h-8 mb-3" />
                <span className="font-medium">Upload Recording</span>
              </button>
            </div>
          </div>

          {/* Right Column - Upcoming Meetings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-[#008DDF] to-[#B3F0FF] text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="w-full text-center">
                    <LiveDateTime />
                  </div>
                </div>
              </div>

              {/* Meeting List */}
              <div className="flex justify-center items-center p-6">
                <Image
                  src="/images/pose_home.png"
                  alt="Heidi AI Icon"
                  width={300}
                  height={100}
                  className="mx-auto"
                />
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Upcoming Meetings
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">
                      2:30 PM - Sales Training
                    </span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-sm text-gray-600">
                      2:30 PM - Sales Training
                    </span>
                  </div>
                </div>
                <button className="text-blue-500 text-sm font-medium mt-4 hover:text-blue-600">
                  [View All Meetings]
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Heidi Overview Section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Heidi Overview
          </h3>
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-r from-orange-200 to-yellow-200 flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <button className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 flex justify-end">
              <button className="bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                [View Full Analysis]
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const LiveDateTime: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <h3 className="text-4xl font-bold">
        {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h3>
      <p className="text-blue-100">
        {time.toLocaleDateString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
    </>
  );
};

export default Home;
