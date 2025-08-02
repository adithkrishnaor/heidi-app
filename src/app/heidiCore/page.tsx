"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Plus, Search, User, Bot, Clock, Users, FileText, TrendingUp, Menu, X } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  type: "user" | "heidi";
  content: string;
  timestamp: Date;
}

interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  type: "meeting" | "insight" | "contact" | "general";
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HeidiCorePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("heidi");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showThreads, setShowThreads] = useState(false);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    
    // Handle navigation similar to other pages
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

  // Sample thread data
  const threads: Thread[] = [
    {
      id: "1",
      title: "Weekly review with Heidi",
      lastMessage: "Let's schedule your next review session",
      timestamp: "Yesterday",
      type: "meeting"
    },
    {
      id: "2", 
      title: "Team meeting follow-up",
      lastMessage: "Action items from today's meeting",
      timestamp: "2 days ago",
      type: "meeting"
    },
    {
      id: "3",
      title: "Contact analysis: Marc L.",
      lastMessage: "Trust score and engagement insights",
      timestamp: "Last week",
      type: "contact"
    }
  ];

  // Quick actions for new conversations
  const quickActions: QuickAction[] = [
    {
      id: "review-meetings",
      title: "Review top 3 meetings",
      description: "Get insights from your recent meetings",
      icon: <Users className="w-5 h-5" />
    },
    {
      id: "check-contacts",
      title: "Check contacts with no follow-up",
      description: "Find contacts that need attention",
      icon: <User className="w-5 h-5" />
    },
    {
      id: "ask-question",
      title: "Ask Heidi a question",
      description: "Get help with anything",
      icon: <Bot className="w-5 h-5" />
    }
  ];

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0 && !selectedThread) {
      setMessages([
        {
          id: "welcome",
          type: "heidi",
          content: "Hi [First Name], what do you want to explore today?",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length, selectedThread]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate Heidi's response
    setTimeout(() => {
      const heidiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "heidi",
        content: "I understand your request. Let me help you with that. Based on your data and context, here are some insights and recommendations...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, heidiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    if (action) {
      setInputMessage(action.title);
      inputRef.current?.focus();
    }
  };

  const handleThreadSelect = (threadId: string) => {
    setSelectedThread(threadId);
    setShowThreads(false);
    // Load thread messages here
    const thread = threads.find(t => t.id === threadId);
    if (thread) {
      setMessages([
        {
          id: "thread-start",
          type: "heidi",
          content: `Continuing our conversation about: ${thread.title}`,
          timestamp: new Date()
        }
      ]);
    }
  };

  const startNewConversation = () => {
    setSelectedThread(null);
    setMessages([
      {
        id: "new-welcome",
        type: "heidi",
        content: "Hi [First Name], what do you want to explore today?",
        timestamp: new Date()
      }
    ]);
    setShowThreads(false);
  };

  const getThreadIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "insight":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "contact":
        return <User className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />
      
      {/* Mobile Thread Overlay */}
      {showThreads && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="bg-white h-full w-80 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Chat History</h2>
              <button
                onClick={() => setShowThreads(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ThreadHistory 
              threads={threads}
              onThreadSelect={handleThreadSelect}
              onNewConversation={startNewConversation}
              selectedThread={selectedThread}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 ml-64 flex">
        {/* Thread History - Desktop */}
        <div className="w-80 bg-white border-r border-gray-200">
          <ThreadHistory 
            threads={threads}
            onThreadSelect={handleThreadSelect}
            onNewConversation={startNewConversation}
            selectedThread={selectedThread}
          />
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowThreads(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">Heidi Core</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-3xl px-4 py-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900 border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions - Show when no messages or only welcome */}
          {messages.length <= 1 && (
            <div className="px-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className="p-4 text-left bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-blue-600 group-hover:text-blue-700">
                        {action.icon}
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {action.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  rows={1}
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Thread History Component
interface ThreadHistoryProps {
  threads: Thread[];
  onThreadSelect: (threadId: string) => void;
  onNewConversation: () => void;
  selectedThread: string | null;
}

const ThreadHistory: React.FC<ThreadHistoryProps> = ({
  threads,
  onThreadSelect,
  onNewConversation,
  selectedThread
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getThreadIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "insight":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "contact":
        return <User className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Heidi Core</h2>
          <button
            onClick={onNewConversation}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 placeholder-gray-500 bg-white"
          />
        </div>
      </div>

      {/* Conversation Threads */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => (
              <button
                key={thread.id}
                onClick={() => onThreadSelect(thread.id)}
                className={`w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors ${
                  selectedThread === thread.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getThreadIcon(thread.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {thread.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {thread.lastMessage}
                    </p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-400">{thread.timestamp}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">No conversations found</p>
              <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Suggestions */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">
            Smart Suggestions
          </p>
          <div className="space-y-1">
            <p className="text-xs text-gray-600">
              &quot;Summarize my week&quot;
            </p>
            <p className="text-xs text-gray-600">
              &quot;Prepare for upcoming meeting&quot;
            </p>
            <p className="text-xs text-gray-600">
              &quot;Show me high-priority contacts&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeidiCorePage;