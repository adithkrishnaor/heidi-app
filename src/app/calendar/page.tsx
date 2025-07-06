"use client";

import React, { useState } from "react";
import { Calendar, Clock, X, ChevronRight } from "lucide-react";
import Sidebar from "../sidebar/page";
import { useRouter } from "next/navigation";

const SchedulePage = () => {
  const [currentPage, setCurrentPage] = useState("calendar"); // Track current page
  const router = useRouter();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    // Add your navigation logic here (e.g., router.push, etc.)
    router.push(`/${page}`);

    console.log(`Navigating to: ${page}`);
  };
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(23);
  const [selectedMonth] = useState("May");
  const [selectedYear] = useState("2025");
  const [startTime, setStartTime] = useState("12.00");
  const [endTime, setEndTime] = useState("14.00");
  const [note, setNote] = useState("");

  // Calendar data for November
  const calendarDays = [
    { date: 31, prev: true },
    { date: 1 },
    { date: 2 },
    { date: 3 },
    { date: 4 },
    { date: 5 },
    { date: 6 },
    { date: 7 },
    { date: 8 },
    { date: 9 },
    { date: 10 },
    { date: 11 },
    { date: 12 },
    { date: 13 },
    { date: 14 },
    { date: 15 },
    { date: 16 },
    { date: 17 },
    { date: 18, current: true },
    { date: 19 },
    { date: 20 },
    { date: 21 },
    { date: 22 },
    { date: 23 },
    { date: 24 },
    { date: 25 },
    { date: 26 },
    { date: 27 },
    { date: 28 },
    { date: 29 },
    { date: 30 },
    { date: 1, next: true },
    { date: 2, next: true },
    { date: 3, next: true },
    { date: 4, next: true },
  ];

  const scheduleItems = [
    { time: "08.00", title: "Hi hello Schedule 1" },
    { time: "12.00", title: "Hi hello Schedule 2" },
  ];

  const reminders = [
    {
      title: "Reminder 1",
      time: "12.00 - 16.00",
      color: "purple",
    },
    {
      title: "Reminder 2",
      time: "12.00 - 16.00",
      color: "blue",
    },
  ];

  const handleSaveSchedule = () => {
    // Handle save logic here
    console.log("Saving schedule:", { selectedDate, startTime, endTime, note });
    setShowScheduleModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      <div className="ml-64 max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schedule Today Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Schedule Today
            </h2>

            <div className="space-y-4">
              {scheduleItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-gray-500 font-medium min-w-[60px]">
                    {item.time}
                  </div>
                  <div className="bg-blue-100 rounded-xl p-4 flex-1">
                    <p className="text-gray-800 font-medium">{item.title}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-4">
                <div className="text-gray-500 font-medium min-w-[60px]">
                  14.00
                </div>
                <div className="flex-1"></div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-gray-500 font-medium min-w-[60px]">
                  16.00
                </div>
                <div className="flex-1"></div>
              </div>
            </div>

            {/* Reminder Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reminder</h3>
              <p className="text-gray-600 mb-4">
                Don't forget schedule for tomorrow
              </p>

              <div className="space-y-3">
                {reminders.map((reminder, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl flex items-center gap-3 ${
                      reminder.color === "purple"
                        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    }`}
                  >
                    <Calendar className="w-6 h-6" />
                    <div>
                      <p className="font-medium">{reminder.title}</p>
                      <div className="flex items-center gap-1 text-sm opacity-90">
                        <Clock className="w-4 h-4" />
                        <span>{reminder.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">January</h2>

            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <div
                  key={day}
                  className="text-center text-gray-500 font-medium py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-8">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`
                    h-12 flex items-center justify-center rounded-lg cursor-pointer transition-colors
                    ${
                      day.current
                        ? "bg-blue-500 text-white font-bold"
                        : day.prev || day.next
                        ? "text-gray-300"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {day.date}
                </div>
              ))}
            </div>

            {/* Set Schedule Button */}
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-blue-500 hover:to-blue-700 transition-all"
            >
              Set schedule
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Let's set the schedule easily
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 mb-3">
                {selectedMonth}, {selectedYear}
              </p>

              {/* Date Selection */}
              <div className="flex gap-2 mb-6">
                <button className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600">
                  <div className="text-lg font-bold">22</div>
                  <div className="text-xs">Fr</div>
                </button>
                <button className="px-4 py-3 rounded-xl bg-blue-500 text-white">
                  <div className="text-lg font-bold">23</div>
                  <div className="text-xs">Sa</div>
                </button>
                <button className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600">
                  <div className="text-lg font-bold">24</div>
                  <div className="text-xs">Su</div>
                </button>
                <button className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600">
                  <div className="text-sm">Other</div>
                  <div className="text-xs">Date</div>
                </button>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <p className="text-gray-900 font-medium mb-3">Select time</p>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-gray-600 text-sm">From</label>
                    <div className="text-2xl font-bold text-gray-900">
                      {startTime}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 mt-4" />
                  <div>
                    <label className="text-gray-600 text-sm">To</label>
                    <div className="text-2xl font-bold text-gray-900">
                      {endTime}
                    </div>
                  </div>
                </div>
              </div>

              {/* Note Section */}
              <div className="mb-8">
                <label className="text-gray-900 font-medium mb-2 block">
                  Note
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full h-20 p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500"
                  placeholder="Add a note..."
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveSchedule}
                className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-500 hover:to-blue-700 transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
