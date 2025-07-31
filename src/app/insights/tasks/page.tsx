"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar";
import { 
    Filter,
    MessageCircle,
    Calendar,
    CheckCircle,
    Clock,
    AlertTriangle,
    Target,
    MoreHorizontal,
    User,
    Tag,
    Activity
} from "lucide-react";

type InsightType = 'Opportunity' | 'Risk' | 'Follow-up';
type InsightTone = 'Positive' | 'Negative' | 'Neutral';
type TaskStatus = 'To Do' | 'In Progress' | 'Done';

interface Insight {
    id: string;
    title: string;
    type: InsightType;
    tone: InsightTone;
    healthScore: number;
    heidiComment: string;
    assignedTo: 'Me' | 'Teammate';
    status: TaskStatus;
    contact: string;
    meetingType: string;
    date: string;
    tags: string[];
}

const mockInsights: Insight[] = [
    {
        id: '1',
        title: 'Client interested in demo, follow-up suggested.',
        type: 'Opportunity',
        tone: 'Positive',
        healthScore: 82,
        heidiComment: 'You should schedule a product demo within 48h.',
        assignedTo: 'Me',
        status: 'To Do',
        contact: 'John Smith',
        meetingType: 'Sales Call',
        date: '2024-01-15',
        tags: ['Demo', 'High Priority']
    },
    {
        id: '2',
        title: 'Decision-maker unclear - potential risk.',
        type: 'Risk',
        tone: 'Negative',
        healthScore: 62,
        heidiComment: 'Clarify who the actual buyer is. They seemed hesitant.',
        assignedTo: 'Me',
        status: 'To Do',
        contact: 'Sarah Johnson',
        meetingType: 'Discovery Call',
        date: '2024-01-14',
        tags: ['Decision Maker', 'Risk']
    },
    {
        id: '3',
        title: 'Pricing discussion went well, next steps confirmed.',
        type: 'Opportunity',
        tone: 'Positive',
        healthScore: 88,
        heidiComment: 'Great momentum! Send the proposal by Friday.',
        assignedTo: 'Teammate',
        status: 'In Progress',
        contact: 'Mike Davis',
        meetingType: 'Pricing Call',
        date: '2024-01-13',
        tags: ['Proposal', 'Pricing']
    },
    {
        id: '4',
        title: 'Budget constraints mentioned - need follow-up.',
        type: 'Follow-up',
        tone: 'Neutral',
        healthScore: 65,
        heidiComment: 'Explore alternative pricing options or phased implementation.',
        assignedTo: 'Me',
        status: 'Done',
        contact: 'Lisa Wong',
        meetingType: 'Budget Review',
        date: '2024-01-12',
        tags: ['Budget', 'Follow-up']
    }
];

const InsightsDetailedPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState("insights");
    const router = useRouter();
    const [insights, setInsights] = useState<Insight[]>(mockInsights);
    const [filteredInsights, setFilteredInsights] = useState<Insight[]>(mockInsights);
    const [filters, setFilters] = useState({
        type: 'All',
        status: 'All',
        contact: 'All',
        date: 'All'
    });
    const [isLoading, setIsLoading] = useState(false);

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

    const handleChatWithHeidi = (insightId: string) => {
        // Implement chat with Heidi functionality
        console.log(`Chat with Heidi about insight: ${insightId}`);
    };

    const handleViewInMeeting = (insightId: string) => {
        // Navigate to meeting context
        console.log(`View insight ${insightId} in meeting context`);
    };

    const handleAssignTask = (insightId: string, assignee: 'Me' | 'Teammate') => {
        setInsights(prev => 
            prev.map(insight => 
                insight.id === insightId ? { ...insight, assignedTo: assignee } : insight
            )
        );
    };

    const handleStatusChange = (insightId: string, status: TaskStatus) => {
        setInsights(prev => 
            prev.map(insight => 
                insight.id === insightId ? { ...insight, status } : insight
            )
        );
    };

    const applyFilters = useCallback(() => {
        let filtered = insights;

        if (filters.type !== 'All') {
            filtered = filtered.filter(insight => insight.type === filters.type);
        }
        if (filters.status !== 'All') {
            filtered = filtered.filter(insight => insight.status === filters.status);
        }
        if (filters.contact !== 'All') {
            filtered = filtered.filter(insight => insight.contact === filters.contact);
        }

        setFilteredInsights(filtered);
    }, [insights, filters]);

    const loadInsights = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // In a real app, this would fetch from an API
            setInsights(mockInsights);
        } catch (error) {
            console.error('Error loading insights:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    // Load insights on component mount
    useEffect(() => {
        loadInsights();
    }, []);

    const getTypeIcon = (type: InsightType) => {
        switch (type) {
            case 'Opportunity':
                return <Target className="w-4 h-4 text-green-500" />;
            case 'Risk':
                return <AlertTriangle className="w-4 h-4 text-red-500" />;
            case 'Follow-up':
                return <Clock className="w-4 h-4 text-yellow-500" />;
        }
    };

    const getTypeColor = (type: InsightType) => {
        switch (type) {
            case 'Opportunity':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Risk':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Follow-up':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const getStatusIcon = (status: TaskStatus) => {
        switch (status) {
            case 'To Do':
                return <Clock className="w-4 h-4 text-gray-500" />;
            case 'In Progress':
                return <Activity className="w-4 h-4 text-blue-500" />;
            case 'Done':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />
                <div className="ml-64 p-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-lg border p-6 mb-4">
                                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />
            
            <div className="ml-64 p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Detailed Insights Analysis</h1>
                    <p className="text-gray-600">
                        All insights extracted from meetings with filtering and management options
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <span className="font-medium text-gray-700">Filters:</span>
                        </div>
                        
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                            className="border border-gray-300 rounded px-3 py-1 text-sm text-black"
                        >
                            <option value="All">All Types</option>
                            <option value="Opportunity">Opportunities</option>
                            <option value="Risk">Risks</option>
                            <option value="Follow-up">Follow-ups</option>
                        </select>

                        <select
                            value={filters.status}
                            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                            className="border border-gray-300 rounded px-3 py-1 text-sm text-black"
                        >
                            <option value="All">All Status</option>
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>

                        <select
                            value={filters.contact}
                            onChange={(e) => setFilters(prev => ({ ...prev, contact: e.target.value }))}
                            className="border border-gray-300 rounded px-3 py-1 text-sm text-black"
                        >
                            <option value="All">All Contacts</option>
                            <option value="John Smith">John Smith</option>
                            <option value="Sarah Johnson">Sarah Johnson</option>
                            <option value="Mike Davis">Mike Davis</option>
                            <option value="Lisa Wong">Lisa Wong</option>
                        </select>

                        <div className="text-sm text-gray-500 ml-auto">
                            {filteredInsights.length} insights found
                        </div>
                    </div>
                </div>

                {/* Insights List */}
                <div className="space-y-4">
                    {filteredInsights.map((insight) => (
                        <div key={insight.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                            {/* Insight Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        {getTypeIcon(insight.type)}
                                        <span className={`px-2 py-1 text-xs rounded border ${getTypeColor(insight.type)}`}>
                                            {insight.type}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded border ${
                                            insight.tone === 'Positive' ? 'bg-green-50 text-green-700 border-green-200' :
                                            insight.tone === 'Negative' ? 'bg-red-50 text-red-700 border-red-200' :
                                            'bg-gray-50 text-gray-700 border-gray-200'
                                        }`}>
                                            {insight.tone}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            Health Score: <span className="font-semibold">{insight.healthScore}/100</span>
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {insight.title}
                                    </h3>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Heidi's Comment */}
                            <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                <div className="flex items-start gap-2">
                                    <MessageCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                                    <div>
                                        <span className="text-sm font-medium text-blue-800">Heidi says:</span>
                                        <p className="text-sm text-blue-700 mt-1">&quot;{insight.heidiComment}&quot;</p>
                                    </div>
                                </div>
                            </div>

                            {/* Insight Details */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">Contact:</span>
                                    <span className="font-medium">{insight.contact}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">Date:</span>
                                    <span className="font-medium">{insight.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-gray-400" />
                                    <span className="text-gray-600">Type:</span>
                                    <span className="font-medium">{insight.meetingType}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {getStatusIcon(insight.status)}
                                    <span className="text-gray-600">Status:</span>
                                    <select
                                        value={insight.status}
                                        onChange={(e) => handleStatusChange(insight.id, e.target.value as TaskStatus)}
                                        className="text-sm text-black border border-gray-300 rounded px-2 py-1"
                                    >
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-gray-600">Tags:</span>
                                {insight.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Assign to:</span>
                                    <select
                                        value={insight.assignedTo}
                                        onChange={(e) => handleAssignTask(insight.id, e.target.value as 'Me' | 'Teammate')}
                                        className="text-sm text-black border border-gray-300 rounded px-2 py-1"
                                    >
                                        <option value="Me">Me</option>
                                        <option value="Teammate">Teammate</option>
                                    </select>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleViewInMeeting(insight.id)}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        View in Meeting
                                    </button>
                                    <button
                                        onClick={() => handleChatWithHeidi(insight.id)}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        Chat with Heidi
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredInsights.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No insights found</h3>
                        <p className="text-gray-600 mb-4">
                            Try adjusting your filters to see more results.
                        </p>
                        <button
                            onClick={() => setFilters({ type: 'All', status: 'All', contact: 'All', date: 'All' })}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Summary Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <Target className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {insights.filter(i => i.type === 'Opportunity').length}
                                </div>
                                <div className="text-sm text-gray-600">Opportunities</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {insights.filter(i => i.type === 'Risk').length}
                                </div>
                                <div className="text-sm text-gray-600">Risks</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {insights.filter(i => i.type === 'Follow-up').length}
                                </div>
                                <div className="text-sm text-gray-600">Follow-ups</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {insights.filter(i => i.status === 'Done').length}
                                </div>
                                <div className="text-sm text-gray-600">Completed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsDetailedPage;

