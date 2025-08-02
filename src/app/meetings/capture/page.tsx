"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Settings,
  Users,
  MessageSquare,
  PhoneOff,
  MoreHorizontal,
  Share,
  Circle,
  Square,
  Maximize,
  Minimize,
  Monitor,
  MonitorOff,
  Copy,
  Star,
  Activity,
  Zap,
  Eye,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  FileText,
  Download,
  Send,
  PlusCircle,
  Link,
  Globe,
  ArrowLeft
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  isHost: boolean;
  isMuted: boolean;
  isCameraOn: boolean;
  isOnline: boolean;
  avatar?: string;
}

interface LiveTranscript {
  id: string;
  timestamp: string;
  speaker: string;
  text: string;
  confidence: number;
}

interface KeyInsight {
  id: string;
  type: "decision" | "action" | "question" | "highlight";
  content: string;
  timestamp: string;
  participants: string[];
}

interface HeidiFeedback {
  overallScore: number;
  engagement: number;
  clarity: number;
  actionItems: number;
  sentiment: "positive" | "neutral" | "negative";
  suggestions: string[];
}

interface LiveCaptureProps {
  onExit?: () => void;
}

const LiveCaptureComponent: React.FC<LiveCaptureProps> = ({ onExit }) => {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showInsights, setShowInsights] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState<"excellent" | "good" | "fair" | "poor">("excellent");
  const [chatMessage, setChatMessage] = useState("");
  const [showHeidiFeedback, setShowHeidiFeedback] = useState(true);

  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Sample data
  const [participants] = useState<Participant[]>([
    { id: "1", name: "You", isHost: true, isMuted: false, isCameraOn: true, isOnline: true },
    { id: "2", name: "Sarah Johnson", isHost: false, isMuted: false, isCameraOn: true, isOnline: true },
    { id: "3", name: "Mike Chen", isHost: false, isMuted: true, isCameraOn: false, isOnline: true },
    { id: "4", name: "Lisa Wang", isHost: false, isMuted: false, isCameraOn: true, isOnline: true },
  ]);

  const [liveTranscript, setLiveTranscript] = useState<LiveTranscript[]>([
    { id: "1", timestamp: "14:30:15", speaker: "Sarah", text: "Let's start by reviewing the Q4 performance metrics.", confidence: 0.95 },
    { id: "2", timestamp: "14:30:28", speaker: "Mike", text: "The numbers look really promising, especially in the enterprise segment.", confidence: 0.92 },
    { id: "3", timestamp: "14:30:45", speaker: "You", text: "Yes, we exceeded our targets by 15%. Should we dive into the details?", confidence: 0.98 },
    { id: "4", timestamp: "14:31:02", speaker: "Lisa", text: "Absolutely. I have the breakdown ready to share.", confidence: 0.91 },
  ]);

  const [keyInsights] = useState<KeyInsight[]>([
    { id: "1", type: "decision", content: "Team decided to accelerate product launch timeline", timestamp: "14:25:30", participants: ["Sarah", "You"] },
    { id: "2", type: "action", content: "Mike to prepare technical specifications by Friday", timestamp: "14:28:15", participants: ["Mike"] },
    { id: "3", type: "highlight", content: "Q4 revenue exceeded targets by 15%", timestamp: "14:30:45", participants: ["You", "Sarah"] },
    { id: "4", type: "question", content: "Should we increase marketing budget for Q1?", timestamp: "14:32:10", participants: ["Lisa"] },
  ]);

  const [heidiFeedback] = useState<HeidiFeedback>({
    overallScore: 87,
    engagement: 92,
    clarity: 85,
    actionItems: 6,
    sentiment: "positive",
    suggestions: [
      "Great engagement levels! Keep encouraging participation.",
      "Consider summarizing key points every 10 minutes.",
      "Action items are well-defined and assigned."
    ]
  });

  const [chatMessages] = useState([
    { id: "1", sender: "Sarah", message: "Thanks for sharing those metrics!", timestamp: "14:28:30" },
    { id: "2", sender: "Mike", message: "I'll have the specs ready by EOD Friday", timestamp: "14:30:15" },
    { id: "3", sender: "Lisa", message: "Can we schedule a follow-up for next week?", timestamp: "14:32:45" },
  ]);

  // Timer effect for meeting duration
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setMeetingDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [liveTranscript]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setMeetingDuration(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Add message logic here
      setChatMessage("");
    }
  };

  const handleExitMeeting = () => {
    if (isRecording) {
      setShowExitConfirmation(true);
    } else {
      // Route to home page
      router.push('/home');
      if (onExit) {
        onExit();
      }
    }
  };

  const confirmExit = () => {
    setIsRecording(false);
    setShowExitConfirmation(false);
    // Route to home page
    router.push('/home');
    if (onExit) {
      onExit();
    }
  };

  const getInsightIcon = (type: KeyInsight["type"]) => {
    switch (type) {
      case "decision": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "action": return <Zap className="w-4 h-4 text-blue-500" />;
      case "question": return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case "highlight": return <Star className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getConnectionColor = () => {
    switch (connectionQuality) {
      case "excellent": return "bg-green-500";
      case "good": return "bg-blue-500";
      case "fair": return "bg-yellow-500";
      case "poor": return "bg-red-500";
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'} bg-gray-900 flex flex-col`}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          {/* Exit Button */}
          <button
            onClick={handleExitMeeting}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Exit</span>
          </button>
          
          <div className="h-6 w-px bg-gray-600"></div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getConnectionColor()}`}></div>
            <span className="text-white text-sm font-medium">Live Meeting</span>
          </div>
          
          {isRecording && (
            <div className="flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">REC {formatDuration(meetingDuration)}</span>
            </div>
          )}
          
          <div className="text-gray-300 text-sm">
            Meeting ID: 123-456-789
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
          >
            <Users className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowChat(!showChat)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white relative"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
          >
            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Main Speaker */}
              <div className="col-span-2 bg-gray-800 rounded-xl relative overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                  <span className="text-white text-sm font-medium">You (Host)</span>
                </div>
                {!isCameraOn && (
                  <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <CameraOff className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-300">Camera Off</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Participants */}
              {participants.slice(1, 3).map((participant, idx) => (
                <div key={participant.id} className="bg-gray-800 rounded-xl relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                    <span className="text-white text-xs">{participant.name}</span>
                  </div>
                  {participant.isMuted && (
                    <div className="absolute top-2 right-2">
                      <MicOff className="w-4 h-4 text-red-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-colors ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
              </button>

              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-3 rounded-full transition-colors ${
                  !isCameraOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                {isCameraOn ? <Camera className="w-5 h-5 text-white" /> : <CameraOff className="w-5 h-5 text-white" />}
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3 rounded-full transition-colors ${
                  isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                {isScreenSharing ? <MonitorOff className="w-5 h-5 text-white" /> : <Monitor className="w-5 h-5 text-white" />}
              </button>

              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                >
                  <Circle className="w-5 h-5 text-white" />
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  className="p-3 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <Square className="w-5 h-5 text-white" />
                </button>
              )}

              <button className="p-3 bg-gray-600 hover:bg-gray-500 rounded-full transition-colors">
                <Share className="w-5 h-5 text-white" />
              </button>

              <button className="p-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors">
                <PhoneOff className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          {/* Sidebar Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setShowTranscript(true);
                setShowInsights(false);
                setShowHeidiFeedback(false);
              }}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                showTranscript ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-1" />
              Transcript
            </button>
            <button
              onClick={() => {
                setShowTranscript(false);
                setShowInsights(true);
                setShowHeidiFeedback(false);
              }}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                showInsights ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Insights
            </button>
            <button
              onClick={() => {
                setShowTranscript(false);
                setShowInsights(false);
                setShowHeidiFeedback(true);
              }}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                showHeidiFeedback ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-1" />
              Heidi
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-hidden">
            {showTranscript && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Live Transcript</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Activity className="w-4 h-4" />
                    <span>Real-time transcription active</span>
                  </div>
                </div>
                <div ref={transcriptRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                  {liveTranscript.map((entry) => (
                    <div key={entry.id} className="flex space-x-3">
                      <div className="flex-shrink-0 w-12 text-xs text-gray-500 pt-0.5">
                        {entry.timestamp.slice(-5)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{entry.speaker}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            entry.confidence > 0.95 ? 'bg-green-500' : 
                            entry.confidence > 0.9 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{entry.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showInsights && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Key Insights</h3>
                  <div className="text-sm text-gray-500">
                    {keyInsights.length} insights captured
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {keyInsights.map((insight) => (
                    <div key={insight.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2 mb-2">
                        {getInsightIcon(insight.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-gray-500 uppercase">
                              {insight.type}
                            </span>
                            <span className="text-xs text-gray-400">{insight.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-900">{insight.content}</p>
                          <div className="flex items-center space-x-1 mt-2">
                            {insight.participants.map((participant, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-xs text-gray-600 rounded-full">
                                {participant}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showHeidiFeedback && (
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">🤖 Heidi&apos;s Live Feedback</h3>
                  <div className="flex items-center space-x-2">
                    <div className="text-2xl font-bold text-blue-600">{heidiFeedback.overallScore}</div>
                    <div className="text-sm text-gray-500">Overall Score</div>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Engagement</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${heidiFeedback.engagement}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{heidiFeedback.engagement}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Clarity</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-blue-500 rounded-full" 
                            style={{ width: `${heidiFeedback.clarity}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{heidiFeedback.clarity}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Action Items Identified</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{heidiFeedback.actionItems}</div>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Live Suggestions</h4>
                    <div className="space-y-2">
                      {heidiFeedback.suggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-sm text-gray-700">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      Generate Summary
                    </button>
                    <button className="w-full px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                      Export Insights
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Chat Panel (when active) */}
        {showChat && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Chat</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{message.sender}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-2">{message.message}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Participants Panel (when active) */}
        {showParticipants && (
          <div className="w-64 bg-white border-l border-gray-200 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">
                Participants ({participants.length})
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {participant.name.charAt(0)}
                      </span>
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{participant.name}</span>
                      {participant.isHost && (
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Host</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-0.5">
                      {participant.isMuted ? (
                        <MicOff className="w-3 h-3 text-red-500" />
                      ) : (
                        <Mic className="w-3 h-3 text-green-500" />
                      )}
                      {participant.isCameraOn ? (
                        <Camera className="w-3 h-3 text-green-500" />
                      ) : (
                        <CameraOff className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>Invite Others</span>
              </button>
              <button className="w-full px-3 py-2 mt-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Copy className="w-4 h-4" />
                <span>Copy Meeting Link</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Meeting Status Notifications */}
      <div className="absolute top-20 right-6 space-y-2 z-40">
        {isRecording && (
          <div className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <Circle className="w-4 h-4" />
            <span className="text-sm">Recording in progress</span>
          </div>
        )}
        
        {connectionQuality === "poor" && (
          <div className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Poor connection quality</span>
          </div>
        )}
      </div>

      {/* Quick Actions Floating Menu */}
      <div className="absolute bottom-24 right-6 z-40">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 space-y-1">
          <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center space-x-2">
            <Download className="w-4 h-4 text-gray-500" />
            <span>Download Transcript</span>
          </button>
          <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center space-x-2">
            <FileText className="w-4 h-4 text-gray-500" />
            <span>Generate Summary</span>
          </button>
          <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center space-x-2">
            <Link className="w-4 h-4 text-gray-500" />
            <span>Create CRM Entry</span>
          </button>
          <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 rounded flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <span>Translate Content</span>
          </button>
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-semibold text-gray-900">Recording in Progress</h3>
            </div>
            <p className="text-gray-600 mb-6">
              You are currently recording this meeting. If you exit now, the recording will be stopped and saved automatically.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={confirmExit}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Exit Meeting
              </button>
              <button
                onClick={() => setShowExitConfirmation(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveCaptureComponent;