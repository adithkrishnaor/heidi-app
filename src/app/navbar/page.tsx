"use client";

import React from "react";
import { Calendar, Video, MoreHorizontal } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  currentPage = "home",
  onNavigate,
}) => {
  const handleNavClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <>
      {/* Desktop Header */}
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("home");
                }}
                className={`px-3 py-2 ${
                  currentPage === "home"
                    ? "bg-blue-500 text-white rounded-lg"
                    : "text-gray-500 hover:text-blue-600"
                }`}
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("meetings");
                }}
                className={`px-3 py-2 ${
                  currentPage === "meetings"
                    ? "bg-blue-500 text-white rounded-lg"
                    : "text-gray-500 hover:text-blue-600"
                }`}
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
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("ai");
                }}
                className={`px-3 py-2 ${
                  currentPage === "ai"
                    ? "bg-blue-500 text-white rounded-lg"
                    : "text-gray-500 hover:text-blue-600"
                }`}
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
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("calendar");
                }}
                className={`px-3 py-2 ${
                  currentPage === "calendar"
                    ? "bg-blue-500 text-white rounded-lg"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                <div className="flex flex-col items-center">
                  <Calendar className="w-6 h-6 mb-1" />
                  <span className="text-xs">Calendar</span>
                </div>
              </a>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("more");
                }}
                className={`px-3 py-2 ${
                  currentPage === "more"
                    ? "bg-blue-500 text-white rounded-lg"
                    : "text-gray-500 hover:text-blue-600"
                }`}
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

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex justify-around py-2">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className={`px-3 py-2 ${
              currentPage === "home"
                ? "bg-blue-500 text-white rounded-lg"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                🏠
              </div>
              <span className="text-xs">Home</span>
            </div>
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("meetings");
            }}
            className={`px-3 py-2 ${
              currentPage === "meetings"
                ? "bg-blue-500 text-white rounded-lg"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                📊
              </div>
              <span className="text-xs">Meetings</span>
            </div>
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("ai");
            }}
            className={`px-3 py-2 ${
              currentPage === "ai"
                ? "bg-blue-500 text-white rounded-lg"
                : "text-gray-500 hover:text-blue-600"
            }`}
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
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("calendar");
            }}
            className={`px-3 py-2 ${
              currentPage === "calendar"
                ? "bg-blue-500 text-white rounded-lg"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            <div className="flex flex-col items-center">
              <Calendar className="w-6 h-6 mb-1" />
              <span className="text-xs">Calendar</span>
            </div>
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("more");
            }}
            className={`px-3 py-2 ${
              currentPage === "more"
                ? "bg-blue-500 text-white rounded-lg"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            <div className="flex flex-col items-center">
              <MoreHorizontal className="w-6 h-6 mb-1" />
              <span className="text-xs">More</span>
            </div>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
