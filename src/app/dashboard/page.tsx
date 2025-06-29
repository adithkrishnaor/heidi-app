"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Video,
  Plus,
  Upload,
  Play,
  Clock,
  Users,
  Lightbulb,
  CheckSquare,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Image
                src="/images/icon_and_text.png"
                alt="Heidi AI Text"
                width={200}
                height={150}
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 px-3 py-2"
              >
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 mb-1 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <span className="text-xs">Home</span>
                </div>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 px-3 py-2"
              >
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 mb-1 flex items-center justify-center">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="text-xs">Meetings</span>
                </div>
              </a>
              <a
                href="#"
                className="bg-blue-500 text-white rounded-lg px-3 py-2"
              >
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 mb-1 flex items-center justify-center">
                    🤖
                  </div>
                  <span className="text-xs">AI</span>
                </div>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 px-3 py-2"
              >
                <div className="flex flex-col items-center">
                  <Calendar className="w-6 h-6 mb-1" />
                  <span className="text-xs">Calendar</span>
                </div>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 px-3 py-2"
              >
                <div className="flex flex-col items-center">
                  <MoreHorizontal className="w-6 h-6 mb-1" />
                  <span className="text-xs">More</span>
                </div>
              </a>
            </nav>

            {/* Profile */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Image
                  src="/images/Icon.png"
                  alt="Heidi Icon"
                  width={200}
                  height={150}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Heidi – Welcome Message
          </h2>
          <p className="text-blue-500 font-medium">
            Hello Name! Here's your day overview
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
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="w-full text-center">
                    <LiveDateTime />
                  </div>
                </div>
              </div>

              {/* Meeting List */}
              <div className="flex justify-center items-center p-6">
                <Image
                  src="/images/Icon.png"
                  alt="Heidi AI Icon"
                  width={150}
                  height={30}
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

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around py-2">
          <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                🏠
              </div>
              <span className="text-xs">Home</span>
            </div>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                📊
              </div>
              <span className="text-xs">Meetings</span>
            </div>
          </a>
          <a href="#" className="bg-blue-500 text-white rounded-lg px-3 py-2">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                🤖
              </div>
              <span className="text-xs">AI</span>
            </div>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2">
            <div className="flex flex-col items-center">
              <Calendar className="w-6 h-6 mb-1" />
              <span className="text-xs">Calendar</span>
            </div>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2">
            <div className="flex flex-col items-center">
              <MoreHorizontal className="w-6 h-6 mb-1" />
              <span className="text-xs">More</span>
            </div>
          </a>
        </div>
      </nav>
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

export default Dashboard;
