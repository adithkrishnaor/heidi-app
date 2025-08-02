"use client";
import React, { useState } from "react";
import { 
  Play, 
  Video, 
  Plus, 
  Search, 
  Download, 
  Share, 
  Clock, 
  Users, 
  Calendar,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  CheckSquare,
  FileText,
  Settings,
  MoreHorizontal,
  Star,
  Bookmark,
  Filter
} from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  status: "Completed" | "In Progress" | "Scheduled";
  participants: number;
  heidisScore: number;
  hasRecording: boolean;
  hasTranscript: boolean;
}

interface Recording {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnail?: string;
  size: string;
  quality: "HD" | "SD";
}

interface MeetingDetails {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: string[];
  heidisImpression: {
    score: number;
    summary: string;
    keyPoints: string[];
  };
  keyHighlights: string[];
  quickActions: {
    crmLinks: number;
    tasksCreated: number;
    contentTranslated: boolean;
  };
  structuredSummary: {
    short: string;
    standard: string;
    detailed: string;
  };
  insights: string[];
  transcript: Array<{
    time: string;
    speaker: string;
    text: string;
  }>;
}

const MeetingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"history" | "recordings">("history");
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("meetings");
  const [searchQuery, setSearchQuery] = useState("");
  const [summaryType, setSummaryType] = useState<"short" | "standard" | "detailed">("standard");
  const [showDeepAnalysis, setShowDeepAnalysis] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    heidi: true,
    highlights: true,
    actions: true,
    summary: true
  });
  
  const router = useRouter();
  
  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    router.push(`/${page}`);
    console.log(`Navigating to: ${page}`);
  };

  // Sample data with enhanced details
  const meetings: Meeting[] = Array(15)
    .fill(null)
    .map((_, index) => ({
      id: `meeting-${index}`,
      title: `${index % 3 === 0 ? 'Sales Review' : index % 2 === 0 ? 'Product Strategy' : 'Team Standup'} Meeting`,
      date: `May ${19 - index}, 2025`,
      time: `${14 + (index % 3)}:${(index * 15) % 60}`,
      duration: `${1 + (index % 3)}:${15 + (index * 5) % 45}`,
      status: index === 0 ? "In Progress" : index < 3 ? "Completed" : "Scheduled",
      participants: 3 + (index % 5),
      heidisScore: 65 + (index % 35),
      hasRecording: index < 10,
      hasTranscript: index < 8,
    }));

  const recordings: Recording[] = Array(12)
    .fill(null)
    .map((_, index) => ({
      id: `recording-${index}`,
      title: `${index % 3 === 0 ? 'Sales Review' : index % 2 === 0 ? 'Product Strategy' : 'Team Standup'} Recording`,
      date: `May ${19 - index}, 2025`,
      duration: `${1 + (index % 3)}:${15 + (index * 5) % 45}`,
      size: `${120 + (index * 15)} MB`,
      quality: index % 2 === 0 ? "HD" : "SD",
    }));

  // Detailed meeting data
  const getMeetingDetails = (meetingId: string): MeetingDetails => {
    const meetingIndex = parseInt(meetingId.split('-')[1]);
    return {
      id: meetingId,
      title: meetings[meetingIndex]?.title || "Meeting Title",
      date: meetings[meetingIndex]?.date || "Today",
      duration: meetings[meetingIndex]?.duration || "1:30",
      participants: ["John Smith", "Sarah Johnson", "Mike Chen", "Lisa Wang"].slice(0, 3 + (meetingIndex % 3)),
      heidisImpression: {
        score: 85 - (meetingIndex % 20),
        summary: "Positive and productive meeting with clear action items and good engagement from all participants.",
        keyPoints: [
          "Strong team collaboration observed",
          "Clear decision-making process",
          "All action items assigned with deadlines",
          "Good time management throughout"
        ]
      },
      keyHighlights: [
        "Q4 revenue targets exceeded by 15%",
        "New product launch scheduled for next month",
        "Team expansion approved for engineering",
        "Customer satisfaction scores improved"
      ],
      quickActions: {
        crmLinks: 3,
        tasksCreated: 7,
        contentTranslated: true
      },
      structuredSummary: {
        short: "Productive meeting covering Q4 results and Q1 planning. Key decisions made on product launch timeline.",
        standard: "The team reviewed Q4 performance, which exceeded revenue targets by 15%. Discussion focused on upcoming product launch timeline and resource allocation. Engineering team expansion was approved to support growth initiatives. Customer feedback analysis revealed improved satisfaction scores.",
        detailed: "Comprehensive quarterly review meeting with full leadership team. Q4 financial performance exceeded targets by 15%, driven by strong enterprise sales and customer retention. The upcoming product launch was discussed in detail, with timeline confirmed for next month. Engineering team expansion was approved to add 5 new developers. Customer satisfaction analysis showed improvement across all metrics, particularly in support response times and product reliability. Action items were assigned for market research, technical specifications, and hiring process initiation."
      },
      insights: [
        "Schedule follow-up with enterprise clients",
        "Prepare technical specifications for new features",
        "Begin recruitment process for engineering roles",
        "Conduct market research for product positioning"
      ],
      transcript: Array(20).fill(null).map((_, idx) => ({
        time: `${Math.floor(idx * 2 / 60).toString().padStart(2, '0')}:${(idx * 2 % 60).toString().padStart(2, '0')}`,
        speaker: ["John", "Sarah", "Mike", "Lisa"][idx % 4],
        text: `This is a sample transcript entry number ${idx + 1}. The discussion covered important topics related to our quarterly review and future planning initiatives.`
      }))
    };
  };

  const handleMeetingClick = (meetingId: string) => {
    if (activeTab === "history") {
      setSelectedMeeting(selectedMeeting === meetingId ? null : meetingId);
      setSelectedRecording(null);
    }
  };

  const handleRecordingClick = (recordingId: string) => {
    if (activeTab === "recordings") {
      setSelectedRecording(selectedRecording === recordingId ? null : recordingId);
      setSelectedMeeting(null);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRecordings = recordings.filter(recording =>
    recording.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMeetingHistory = () => (
    <div className="space-y-0 divide-y divide-gray-100">
      {filteredMeetings.map((meeting) => (
        <div
          key={meeting.id}
          className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
            selectedMeeting === meeting.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
          }`}
          onClick={() => handleMeetingClick(meeting.id)}
        >
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center text-sm text-gray-500 min-w-[50px]">
              <span className="font-medium">{meeting.time}</span>
              <span className="text-xs">{meeting.duration}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-medium text-gray-900">{meeting.title}</h3>
                {meeting.hasRecording && <Video className="w-3 h-3 text-blue-500" />}
                {meeting.hasTranscript && <FileText className="w-3 h-3 text-green-500" />}
              </div>
              <div className="flex items-center space-x-3 mt-1">
                <p className="text-xs text-gray-500">{meeting.date}</p>
                <span className="flex items-center space-x-1 text-xs text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>{meeting.participants}</span>
                </span>
                {meeting.status === "Completed" && (
                  <span className="flex items-center space-x-1 text-xs text-gray-500">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>{meeting.heidisScore}/100</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              meeting.status === "Completed" 
                ? "bg-green-100 text-green-700"
                : meeting.status === "In Progress"
                ? "bg-blue-100 text-blue-700"  
                : "bg-gray-100 text-gray-600"
            }`}>
              {meeting.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRecordings = () => (
    <div className="space-y-1">
      {filteredRecordings.map((recording) => (
        <div
          key={recording.id}
          className={`flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
            selectedRecording === recording.id ? "bg-blue-50 border border-blue-200" : ""
          }`}
          onClick={() => handleRecordingClick(recording.id)}
        >
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-current ml-0.5" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-gray-900 truncate">{recording.title}</h3>
              <span className={`px-2 py-0.5 text-xs rounded ${
                recording.quality === "HD" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}>
                {recording.quality}
              </span>
            </div>
            <div className="flex items-center space-x-3 mt-1">
              <p className="text-xs text-gray-500">{recording.date}</p>
              <span className="text-xs text-gray-500">{recording.duration}</span>
              <span className="text-xs text-gray-500">{recording.size}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-100 rounded">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Share className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMeetingDetails = () => {
    if (!selectedMeeting) return null;
    
    const details = getMeetingDetails(selectedMeeting);
    
    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{details.title}</h2>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{details.date}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{details.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{details.participants.length} participants</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Deep Analysis
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          {/* Heidi's Impression */}
          <div className="p-6 border-b border-gray-100">
            <button 
              onClick={() => toggleSection('heidi')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-md font-semibold text-gray-900 flex items-center space-x-2">
                <span>🤖 Heidi&apos;s Impression</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  {details.heidisImpression.score}/100
                </span>
              </h3>
              {expandedSections.heidi ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            
            {expandedSections.heidi && (
              <div className="mt-3 space-y-3">
                <p className="text-sm text-gray-700">{details.heidisImpression.summary}</p>
                <div className="space-y-1">
                  {details.heidisImpression.keyPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span className="text-gray-600">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Key Highlights */}
          <div className="p-6 border-b border-gray-100">
            <button 
              onClick={() => toggleSection('highlights')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-md font-semibold text-gray-900">🔍 Key Highlights</h3>
              {expandedSections.highlights ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            
            {expandedSections.highlights && (
              <div className="mt-3 space-y-2">
                {details.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-sm">
                    <Bookmark className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="p-6 border-b border-gray-100">
            <button 
              onClick={() => toggleSection('actions')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-md font-semibold text-gray-900">⚡ Quick Actions</h3>
              {expandedSections.actions ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            
            {expandedSections.actions && (
              <div className="mt-3 grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <ExternalLink className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <div className="text-lg font-semibold text-gray-900">{details.quickActions.crmLinks}</div>
                  <div className="text-xs text-gray-600">CRM Links</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <CheckSquare className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <div className="text-lg font-semibold text-gray-900">{details.quickActions.tasksCreated}</div>
                  <div className="text-xs text-gray-600">Tasks Created</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-lg font-semibold text-gray-900">✓</div>
                  <div className="text-xs text-gray-600">Translated</div>
                </div>
              </div>
            )}
          </div>

          {/* Structured Summary */}
          <div className="p-6 border-b border-gray-100">
            <button 
              onClick={() => toggleSection('summary')}
              className="flex items-center justify-between w-full text-left"
            >
              <h3 className="text-md font-semibold text-gray-900">📄 Structured Summary</h3>
              {expandedSections.summary ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            
            {expandedSections.summary && (
              <div className="mt-3">
                <div className="flex space-x-2 mb-3">
                  {(['short', 'standard', 'detailed'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSummaryType(type)}
                      className={`px-3 py-1 text-sm rounded-full capitalize transition-colors ${
                        summaryType === type
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {details.structuredSummary[summaryType]}
                </p>
              </div>
            )}
          </div>

          {/* Insights & Tasks */}
          <div className="p-6">
            <h3 className="text-md font-semibold text-gray-900 mb-3">💡 Insights & Tasks</h3>
            <div className="space-y-2">
              {details.insights.map((insight, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-sm">
                  <div className="w-4 h-4 border border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                  <span className="text-gray-700">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRecordingPlayer = () => {
    if (!selectedRecording) return null;
    
    const recording = recordings.find(r => r.id === selectedRecording);
    if (!recording) return null;

    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Video Player */}
        <div className="aspect-video bg-gray-900 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors">
              <Play className="w-6 h-6 text-white fill-current ml-1" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black bg-opacity-50 rounded-lg p-3">
              <div className="flex items-center justify-between text-white text-sm">
                <span>00:00 / {recording.duration}</span>
                <div className="flex items-center space-x-2">
                  <button className="hover:text-blue-400">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-1 mt-2">
                <div className="bg-blue-500 h-1 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recording Details */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{recording.title}</h3>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                <span>{recording.date}</span>
                <span>{recording.duration}</span>
                <span>{recording.size}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${
                  recording.quality === "HD" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {recording.quality}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 inline mr-1" />
                Download
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Share className="w-4 h-4 inline mr-1" />
                Share
              </button>
            </div>
          </div>

          {/* Transcript Preview */}
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Transcript</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {Array(5).fill(null).map((_, idx) => (
                <div key={idx} className="flex space-x-3 text-sm">
                  <span className="text-gray-500 w-12 flex-shrink-0">
                    {`0${idx + 1}:00`}
                  </span>
                  <p className="text-gray-700">
                    Sample transcript content for the recording. This would contain the actual spoken content from the meeting.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="flex-1 ml-64 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Meetings</h1>
            
            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search meetings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Panel - Meeting History/Recordings */}
            <div className="col-span-5">
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => {
                      setActiveTab("history");
                      setSelectedRecording(null);
                    }}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === "history"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Meeting History
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("recordings");
                      setSelectedMeeting(null);
                    }}
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
                <div className="h-[600px] overflow-y-auto">
                  {activeTab === "history" ? renderMeetingHistory() : renderRecordings()}
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="col-span-7">
              {selectedMeeting && activeTab === "history" ? (
                renderMeetingDetails()
              ) : selectedRecording && activeTab === "recordings" ? (
                renderRecordingPlayer()
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
                      <p className="text-sm text-gray-500">
                        Start an instant meeting
                      </p>
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
                      <p className="text-sm text-gray-500">
                        Join with meeting ID
                      </p>
                    </div>
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

export default MeetingsPage;