"use client";
import React, { useState } from "react";
import { Play, Video, Plus } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  status: "Completed";
}

interface Recording {
  id: string;
  title: string;
  date: string;
  duration: string;
}

const MeetingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"history" | "recordings">(
    "history"
  );
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("meetings");
  const router = useRouter();
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    router.push(`/${page}`);

    console.log(`Navigating to: ${page}`);
  };
  // Sample data
  const meetings: Meeting[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: `meeting-${index}`,
      title: "Meeting Title",
      date: "Today, May 19, 2025",
      time: "14:00",
      duration: "03:00",
      status: "Completed" as const,
    }));

  const recordings: Recording[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: `recording-${index}`,
      title: "Meeting Title",
      date: "May 19, 2025",
      duration: "03:00",
    }));

  const transcriptData = Array(10)
    .fill(null)
    .map((_, index) => ({
      time: `0${index + 1}:00`,
      text: "Aenean commodo ligula eget dolor. Aenean massa.",
    }));

  const handleMeetingClick = (meetingId: string) => {
    if (activeTab === "history") {
      setSelectedMeeting(selectedMeeting === meetingId ? null : meetingId);
    }
  };

  const renderMeetingHistory = () => (
    <div className="space-y-0 divide-y divide-gray-100">
      {meetings.map((meeting) => (
        <div
          key={meeting.id}
          className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedMeeting === meeting.id ? "bg-gray-100" : ""
          }`}
          onClick={() => handleMeetingClick(meeting.id)}
        >
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600 w-10 text-right">
              {meeting.time}
            </span>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                {meeting.title}
              </h3>
              <p className="text-xs text-gray-500">{meeting.date}</p>
            </div>
          </div>
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
            {meeting.status}
          </span>
        </div>
      ))}
    </div>
  );

  const renderRecordings = () => (
    <div className="space-y-1">
      {recordings.map((recording) => (
        <div
          key={recording.id}
          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded cursor-pointer transition-colors"
        >
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-current ml-0.5" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {recording.date}: {recording.title}
            </h3>
            <p className="text-xs text-gray-500">{recording.duration}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Meeting History/Recordings */}
          <div className="col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex">
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === "history"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Meeting History
                </button>
                <button
                  onClick={() => setActiveTab("recordings")}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === "recordings"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  Recordings
                </button>
              </div>

              {/* Content */}
              <div className="h-96 overflow-y-auto">
                {activeTab === "history"
                  ? renderMeetingHistory()
                  : renderRecordings()}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-7">
            {selectedMeeting && activeTab === "history" ? (
              /* Meeting Transcript */
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-96">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Meeting Transcript
                </h3>
                <div className="h-80 overflow-y-auto space-y-4">
                  {transcriptData.map((item, idx) => (
                    <div key={idx} className="flex space-x-3">
                      <span className="text-sm font-medium text-gray-600 w-12 flex-shrink-0">
                        {item.time}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* New/Join Meeting Cards */
              <div className="grid grid-cols-2 gap-6">
                {/* New Meeting */}
                <div className="group cursor-pointer">
                  <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-200 border border-gray-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      New Meeting
                    </h3>
                  </div>
                </div>

                {/* Join Meeting */}
                <div className="group cursor-pointer">
                  <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-200 border border-gray-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Join Meeting
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetingsPage;
