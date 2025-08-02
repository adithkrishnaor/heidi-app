"use client";
import React, { useState } from "react";
import { 
  Search, 
  Plus, 
  Clock, 
  Users, 
  User, 
  FileText, 
  TrendingUp, 
  MessageSquare,
  Archive,
  Trash2,
  MoreVertical,
  Filter,
  Calendar,
  Star,
  Download,
  Share
} from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import { useRouter } from "next/navigation";

export interface Thread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  type: "meeting" | "insight" | "contact" | "general" | "followup";
  unreadCount?: number;
  isPinned?: boolean;
  tags?: string[];
  messageCount?: number;
  participants?: string[];
}

interface ThreadContextMenuProps {
  thread: Thread;
  onPin: (threadId: string) => void;
  onArchive: (threadId: string) => void;
  onDelete: (threadId: string) => void;
  onExport: (threadId: string) => void;
  onShare: (threadId: string) => void;
  onClose: () => void;
  position: { top: number; left: number };
}

const ThreadContextMenu: React.FC<ThreadContextMenuProps> = ({
  thread,
  onPin,
  onArchive,
  onDelete,
  onExport,
  onShare,
  onClose,
  position
}) => {
  React.useEffect(() => {
    const handleClickOutside = () => onClose();
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <div 
      className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[160px]"
      style={{ top: position.top, left: position.left }}
    >
      <button
        onClick={() => {
          onPin(thread.id);
          onClose();
        }}
        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
      >
        <Star className={`w-4 h-4 ${thread.isPinned ? 'text-yellow-500 fill-current' : ''}`} />
        <span>{thread.isPinned ? 'Unpin' : 'Pin'} conversation</span>
      </button>
      <button
        onClick={() => {
          onShare(thread.id);
          onClose();
        }}
        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
      >
        <Share className="w-4 h-4" />
        <span>Share</span>
      </button>
      <button
        onClick={() => {
          onExport(thread.id);
          onClose();
        }}
        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
      >
        <Download className="w-4 h-4" />
        <span>Export</span>
      </button>
      <hr className="my-1" />
      <button
        onClick={() => {
          onArchive(thread.id);
          onClose();
        }}
        className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
      >
        <Archive className="w-4 h-4" />
        <span>Archive</span>
      </button>
      <button
        onClick={() => {
          onDelete(thread.id);
          onClose();
        }}
        className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center space-x-2"
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </button>
    </div>
  );
};

const ThreadHistoryPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("threads");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedThreads, setSelectedThreads] = useState<string[]>([]);
  const [contextMenu, setContextMenu] = useState<{
    thread: Thread;
    position: { top: number; left: number };
  } | null>(null);
  const router = useRouter();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    router.push(`/${page}`);
  };

  // Sample thread data with more detailed information
  const threads: Thread[] = [
    {
      id: "1",
      title: "Weekly review with Heidi",
      lastMessage: "Let's schedule your next review session for better productivity tracking and goal alignment.",
      timestamp: "Yesterday",
      type: "meeting",
      isPinned: true,
      unreadCount: 2,
      messageCount: 24,
      participants: ["You", "Heidi"],
      tags: ["weekly", "review", "productivity"]
    },
    {
      id: "2",
      title: "Q4 Strategy Planning Session",
      lastMessage: "Action items from today's meeting have been summarized. Would you like to create follow-up tasks for the team?",
      timestamp: "2 days ago",
      type: "followup",
      messageCount: 18,
      participants: ["You", "Heidi", "Team Lead"],
      tags: ["quarterly", "strategy", "planning"]
    },
    {
      id: "3",
      title: "Contact analysis: Marc L.",
      lastMessage: "Trust score updated • Recent interaction summary • Link to full contact profile with engagement metrics",
      timestamp: "Last week",
      type: "contact",
      messageCount: 12,
      participants: ["You", "Heidi"],
      tags: ["contact", "analysis", "crm"]
    },
    {
      id: "4",
      title: "Market Research Insights",
      lastMessage: "Your Q4 performance metrics and key market insights are ready for comprehensive review and strategic planning.",
      timestamp: "2 weeks ago",
      type: "insight",
      messageCount: 31,
      participants: ["You", "Heidi"],
      tags: ["market", "research", "insights"]
    },
    {
      id: "5",
      title: "Project Alpha Status Update",
      lastMessage: "Current progress on active projects and upcoming deadlines with risk assessment and mitigation strategies.",
      timestamp: "3 weeks ago",
      type: "general",
      messageCount: 8,
      participants: ["You", "Heidi", "Project Manager"],
      tags: ["project", "status", "alpha"]
    },
    {
      id: "6",
      title: "Client Onboarding Process",
      lastMessage: "Step-by-step guidance for new client integration and documentation requirements.",
      timestamp: "1 month ago",
      type: "general",
      messageCount: 15,
      participants: ["You", "Heidi"],
      tags: ["client", "onboarding", "process"]
    }
  ];

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         thread.participants?.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filterType === "all" || thread.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  // Sort threads based on selected criteria
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    // Always show pinned threads first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    
    switch (sortBy) {
      case "recent":
        return 0; // Keep original order (assumed to be by recency)
      case "oldest":
        return 0; // Reverse would be implemented with actual timestamps
      case "messages":
        return (b.messageCount || 0) - (a.messageCount || 0);
      case "alphabetical":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getThreadIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "insight":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "contact":
        return <User className="w-4 h-4 text-purple-500" />;
      case "followup":
        return <MessageSquare className="w-4 h-4 text-orange-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getFilterOptions = () => [
    { value: "all", label: "All Conversations", count: threads.length },
    { value: "meeting", label: "Meetings", count: threads.filter(t => t.type === "meeting").length },
    { value: "contact", label: "Contacts", count: threads.filter(t => t.type === "contact").length },
    { value: "insight", label: "Insights", count: threads.filter(t => t.type === "insight").length },
    { value: "followup", label: "Follow-ups", count: threads.filter(t => t.type === "followup").length },
    { value: "general", label: "General", count: threads.filter(t => t.type === "general").length },
  ];

  const getSortOptions = () => [
    { value: "recent", label: "Most Recent" },
    { value: "oldest", label: "Oldest First" },
    { value: "messages", label: "Most Messages" },
    { value: "alphabetical", label: "Alphabetical" },
  ];

  const handleThreadContextMenu = (e: React.MouseEvent, thread: Thread) => {
    e.preventDefault();
    e.stopPropagation();
    
    setContextMenu({
      thread,
      position: {
        top: e.clientY,
        left: e.clientX
      }
    });
  };

  const handleThreadSelect = (threadId: string) => {
    // Navigate to the specific thread/conversation
    router.push(`/heidi/${threadId}`);
  };

  const handleNewConversation = () => {
    router.push('/heidi');
  };

  const handlePin = (threadId: string) => {
    console.log("Pin thread:", threadId);
    // Implement pin functionality
  };

  const handleArchive = (threadId: string) => {
    console.log("Archive thread:", threadId);
    // Implement archive functionality
  };

  const handleDelete = (threadId: string) => {
    console.log("Delete thread:", threadId);
    // Implement delete functionality
  };

  const handleExport = (threadId: string) => {
    console.log("Export thread:", threadId);
    // Implement export functionality
  };

  const handleShare = (threadId: string) => {
    console.log("Share thread:", threadId);
    // Implement share functionality
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action}:`, selectedThreads);
    setSelectedThreads([]);
  };

  const toggleThreadSelection = (threadId: string) => {
    setSelectedThreads(prev => 
      prev.includes(threadId) 
        ? prev.filter(id => id !== threadId)
        : [...prev, threadId]
    );
  };

  const formatTimestamp = (timestamp: string) => {
    // You can implement more sophisticated timestamp formatting here
    return timestamp;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="flex-1 ml-64 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Conversation History</h1>
                <p className="text-gray-600">Manage and search through your Heidi conversations</p>
              </div>
              <button
                onClick={handleNewConversation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Conversation</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations, messages, tags, or participants..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <Filter className="w-4 h-4" />
                  <span>{getFilterOptions().find(f => f.value === filterType)?.label}</span>
                </button>
                
                {showFilterMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[200px]">
                    {getFilterOptions().map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setFilterType(option.value);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                          filterType === option.value ? "bg-blue-50 text-blue-600" : ""
                        }`}
                      >
                        <span>{option.label}</span>
                        <span className="text-xs text-gray-500">{option.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{getSortOptions().find(s => s.value === sortBy)?.label}</span>
                </button>
                
                {showSortMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[150px]">
                    {getSortOptions().map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                          sortBy === option.value ? "bg-blue-50 text-blue-600" : ""
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedThreads.length > 0 && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 mb-4">
                <span className="text-sm text-blue-800">
                  {selectedThreads.length} conversation{selectedThreads.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBulkAction('archive')}
                    className="px-3 py-1 text-sm bg-white border border-blue-300 text-blue-700 rounded hover:bg-blue-50"
                  >
                    Archive
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1 text-sm bg-white border border-red-300 text-red-700 rounded hover:bg-red-50"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedThreads([])}
                    className="px-3 py-1 text-sm bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Thread List */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            {sortedThreads.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? "Try adjusting your search terms or filters" : "Start a new conversation with Heidi to get started"}
                </p>
                <button
                  onClick={handleNewConversation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start New Conversation
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {sortedThreads.map((thread) => (
                  <div
                    key={thread.id}
                    className="relative group hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center p-4">
                      {/* Selection Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedThreads.includes(thread.id)}
                        onChange={() => toggleThreadSelection(thread.id)}
                        className="mr-4 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />

                      {/* Thread Content */}
                      <button
                        onClick={() => handleThreadSelect(thread.id)}
                        onContextMenu={(e) => handleThreadContextMenu(e, thread)}
                        className="flex-1 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg p-2 -m-2"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            {getThreadIcon(thread.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
                                <span className="truncate">{thread.title}</span>
                                {thread.isPinned && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                                )}
                              </h3>
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                {thread.unreadCount && thread.unreadCount > 0 && (
                                  <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                                    {thread.unreadCount}
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">
                                  {thread.messageCount} messages
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                              {thread.lastMessage}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                  <Clock className="w-3 h-3 text-gray-400 mr-1" />
                                  <span className="text-xs text-gray-500">
                                    {formatTimestamp(thread.timestamp)}
                                  </span>
                                </div>
                                {thread.participants && thread.participants.length > 0 && (
                                  <div className="flex items-center">
                                    <User className="w-3 h-3 text-gray-400 mr-1" />
                                    <span className="text-xs text-gray-500">
                                      {thread.participants.join(', ')}
                                    </span>
                                  </div>
                                )}
                              </div>
                              {thread.tags && thread.tags.length > 0 && (
                                <div className="flex items-center space-x-1">
                                  {thread.tags.slice(0, 3).map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {thread.tags.length > 3 && (
                                    <span className="text-xs text-gray-400">
                                      +{thread.tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>

                      {/* Context Menu Trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleThreadContextMenu(e, thread);
                        }}
                        className="ml-2 p-2 opacity-0 group-hover:opacity-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Context Menu */}
        {contextMenu && (
          <ThreadContextMenu
            thread={contextMenu.thread}
            onPin={handlePin}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onExport={handleExport}
            onShare={handleShare}
            onClose={() => setContextMenu(null)}
            position={contextMenu.position}
          />
        )}
        
        {/* Click overlays to close menus */}
        {(showFilterMenu || showSortMenu) && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => {
              setShowFilterMenu(false);
              setShowSortMenu(false);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default ThreadHistoryPage;