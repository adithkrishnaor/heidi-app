"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { 
    TrendingUp, 
    Brain, 
    Target,  
    Activity,
    Calendar,
    Users,
    BarChart3,
} from "lucide-react";

type HeidiOverviewData = {
    summary: string;
    suggestions: string[];
    nextSteps: string[];
    risks: string[];
    highlights: string[];
    pulseScore: number;
    trustScore: number;
    trends: string[];
    totalInsights: number;
    opportunitiesPercent: number;
    risksPercent: number;
    followUpsPercent: number;
    engagementTrend: string;
    insightsActioned: number;
    heidiAdvice: string;
};

const fetchHeidiOverview = async (): Promise<HeidiOverviewData> => {
    // Placeholder: Replace with your NLP API call
    return {
        summary: "Momentum is positive but action speed is crucial.",
        suggestions: [
            "Prioritize closing verbal commitments faster.",
            "Reach out to dormant leads — they're colder than your coffee.",
            "Schedule that follow-up call before it becomes a ghost story.",
        ],
        nextSteps: [
            "Follow up with Alex on the Q3 proposal.",
            "Schedule a debrief for last week's meeting.",
            "Review and update project timeline with stakeholders.",
        ],
        risks: [
            "Verbal commitment from Jamie is still floating in the void.",
            "Trust score dipped after last meeting — time to ask more questions.",
            "Three overdue tasks are starting to pile up like laundry.",
        ],
        highlights: [
            "Closed 3 tasks this week. Not bad!",
            "Pulse score steady at 78 — keep the momentum.",
            "Your question-to-statement ratio improved by 40%.",
            "Client satisfaction increased across all touchpoints.",
        ],
        pulseScore: 82,
        trustScore: 78,
        trends: [
            "+5% compared to last month",
            "You're asking more questions (nice!).",
            "Follow-ups are lagging behind — let's fix that.",
            "Meeting participation is up 25% this month.",
        ],
        totalInsights: 17,
        opportunitiesPercent: 64,
        risksPercent: 24,
        followUpsPercent: 12,
        engagementTrend: "+5% compared to last month",
        insightsActioned: 74,
        heidiAdvice: "Momentum is strong, but consider quicker follow-ups for better results."
    };
};

const InsightsPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState("insights");
    const router = useRouter();
    const [data, setData] = useState<HeidiOverviewData | null>(null);
    const [loading, setLoading] = useState(true);

    const handleNavigation = (page: string) => {
        setCurrentPage(page);
        router.push(`/${page}`);
        console.log(`Navigating to: ${page}`);
    };

    const handleViewFullAnalysis = () => {
        router.push('/insights/detailed');
    };

    useEffect(() => {
        fetchHeidiOverview().then((res) => {
            setData(res);
            setLoading(false);
        });
    }, []);

    if (loading || !data) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />
                <div className="ml-64 p-6">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div className="bg-white rounded-xl shadow p-6 mb-8">
                            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />
            
            <div className="ml-64 p-6">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Strategic Insights</h1>
                    <p className="text-gray-600">
                        Your performance analytics and strategic recommendations
                    </p>
                </div>

                {/* Heidi's Global Overview Section */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Brain className="w-6 h-6 text-blue-500 mr-2" />
                                <span className="text-2xl font-bold text-gray-900">Heidi's Insights Overview</span>
                            </div>
                        </div>
                        
                        {/* Key Metrics Bar */}
                        <div className="flex items-center gap-6 mt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">{data.totalInsights}</span>
                                <span className="text-gray-600">insights analyzed</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="font-semibold text-gray-900">{data.opportunitiesPercent}%</span>
                                <span className="text-gray-600">Opportunities</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="font-semibold text-gray-900">{data.risksPercent}%</span>
                                <span className="text-gray-600">Risks</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="font-semibold text-gray-900">{data.followUpsPercent}%</span>
                                <span className="text-gray-600">Follow-ups</span>
                            </div>
                        </div>
                    </div>

                    {/* Heidi's Observation and Suggestion */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">Heidi's Observation:</h4>
                            <p className="text-gray-700 italic">"{data.summary}"</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-800 mb-2">Heidi's Suggestion:</h4>
                            <p className="text-gray-700 italic">"{data.heidiAdvice}"</p>
                        </div>
                    </div>

                    
                </section>

                {/* Global Metrics Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Pulse Score */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Pulse Score Avg</h3>
                            <Activity className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">{data.pulseScore}/100</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="h-2 rounded-full bg-blue-500" 
                                style={{ width: `${data.pulseScore}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Trust Score */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Trust Score Avg</h3>
                            <Users className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-3xl font-bold text-green-600 mb-2">{data.trustScore}/100</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="h-2 rounded-full bg-green-500" 
                                style={{ width: `${data.trustScore}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Engagement Trend */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Engagement Trend</h3>
                            <TrendingUp className="w-5 h-5 text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold text-purple-600 mb-2">{data.engagementTrend}</div>
                        <div className="text-sm text-gray-600">vs last month</div>
                    </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Insights Actioned */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <BarChart3 className="w-5 h-5 text-indigo-500 mr-2" />
                            Insights Actioned
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold text-indigo-600">{data.insightsActioned}%</div>
                            <div className="text-gray-600">of insights followed up</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                            <div 
                                className="h-3 rounded-full bg-indigo-500" 
                                style={{ width: `${data.insightsActioned}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <Target className="w-5 h-5 text-green-500 mr-2" />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <QuickActionButton 
                                title="Schedule Follow-ups" 
                                description="3 pending follow-ups need attention"
                                action={() => handleNavigation('calendar')}
                                icon={<Calendar className="w-4 h-4" />}
                            />
                            <QuickActionButton 
                                title="Review Open Tasks" 
                                description="7 tasks awaiting completion"
                                action={() => handleNavigation('tasks')}
                                icon={<Target className="w-4 h-4" />}
                            />
                            <QuickActionButton 
                                title="Contact Management" 
                                description="Update relationship status"
                                action={() => handleNavigation('contacts')}
                                icon={<Users className="w-4 h-4" />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuickActionButton: React.FC<{ 
    title: string; 
    description: string; 
    action: () => void;
    icon: React.ReactNode;
}> = ({ title, description, action, icon }) => (
    <button
        onClick={action}
        className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group flex items-center gap-3"
    >
        <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
            {icon}
        </div>
        <div className="flex-1">
            <div className="font-medium text-gray-900 group-hover:text-blue-600">{title}</div>
            <div className="text-sm text-gray-500">{description}</div>
        </div>
    </button>
);

export default InsightsPage;