"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { TrendingUp, Brain, Target, AlertTriangle, Star, Activity } from "lucide-react";

type HeidiOverviewData = {
    summary: string;
    suggestions: string[];
    nextSteps: string[];
    risks: string[];
    highlights: string[];
    pulseScore: number;
    trends: string[];
};

const fetchHeidiOverview = async (): Promise<HeidiOverviewData> => {
    // Placeholder: Replace with your NLP API call
    return {
        summary:
            "Looks like your strategic game is strong, but there's room to spice things up. Let's turn those insights into action.",
        suggestions: [
            "Reach out to dormant leads — they're colder than your coffee.",
            "Prioritize tasks marked 'urgent' before they start growing roots.",
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
        pulseScore: 78,
        trends: [
            "You're asking more questions (nice!).",
            "Follow-ups are lagging behind — let's fix that.",
            "Meeting participation is up 25% this month.",
            "Response time to emails improved significantly.",
        ],
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

                {/* Heidi Overview Section */}
                <section className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <Brain className="w-6 h-6 text-blue-500 mr-2" />
                            <span className="text-2xl font-bold text-gray-900">Heidi Overview</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-500" />
                            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                                Pulse: {data.pulseScore}
                            </span>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <p className="text-gray-700 italic text-lg leading-relaxed">
                            &quot;{data.summary}&quot;
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <OverviewBlock 
                            title="Smart Suggestions" 
                            items={data.suggestions} 
                            icon={<Target className="w-5 h-5 text-green-500" />}
                            bgColor="bg-green-50"
                            borderColor="border-green-200"
                        />
                        <OverviewBlock 
                            title="Next Steps" 
                            items={data.nextSteps} 
                            icon={<TrendingUp className="w-5 h-5 text-blue-500" />}
                            bgColor="bg-blue-50"
                            borderColor="border-blue-200"
                        />
                        <OverviewBlock 
                            title="Risks & Opportunities" 
                            items={data.risks} 
                            icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
                            bgColor="bg-amber-50"
                            borderColor="border-amber-200"
                        />
                        <OverviewBlock 
                            title="Highlights" 
                            items={data.highlights} 
                            icon={<Star className="w-5 h-5 text-purple-500" />}
                            bgColor="bg-purple-50"
                            borderColor="border-purple-200"
                        />
                        <OverviewBlock 
                            title="Performance Trends" 
                            items={data.trends} 
                            icon={<Activity className="w-5 h-5 text-indigo-500" />}
                            bgColor="bg-indigo-50"
                            borderColor="border-indigo-200"
                            className="md:col-span-2"
                        />
                    </div>
                </section>

                {/* Additional Insights Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Trust Score Breakdown */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <Activity className="w-5 h-5 text-blue-500 mr-2" />
                            Trust Score Breakdown
                        </h3>
                        <div className="space-y-4">
                            <ScoreBar label="Communication Quality" score={82} color="bg-green-500" />
                            <ScoreBar label="Follow-up Consistency" score={65} color="bg-yellow-500" />
                            <ScoreBar label="Meeting Engagement" score={88} color="bg-green-500" />
                            <ScoreBar label="Task Completion" score={75} color="bg-blue-500" />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <Target className="w-5 h-5 text-green-500 mr-2" />
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <QuickActionButton 
                                title="Schedule Follow-ups" 
                                description="3 pending follow-ups need attention"
                                action={() => handleNavigation('calendar')}
                            />
                            <QuickActionButton 
                                title="Review Open Tasks" 
                                description="7 tasks awaiting completion"
                                action={() => handleNavigation('tasks')}
                            />
                            <QuickActionButton 
                                title="Contact Management" 
                                description="Update relationship status"
                                action={() => handleNavigation('contacts')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OverviewBlock: React.FC<{ 
    title: string; 
    items: string[];
    icon: React.ReactNode;
    bgColor: string;
    borderColor: string;
    className?: string;
}> = ({ title, items, icon, bgColor, borderColor, className = "" }) => (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 ${className}`}>
        <div className="flex items-center mb-3">
            {icon}
            <h3 className="font-semibold text-gray-800 ml-2">{title}</h3>
        </div>
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="text-gray-700 text-sm flex items-start">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

const ScoreBar: React.FC<{ label: string; score: number; color: string }> = ({ 
    label, 
    score, 
    color 
}) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium text-gray-900">{score}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
                className={`h-2 rounded-full ${color}`} 
                style={{ width: `${score}%` }}
            ></div>
        </div>
    </div>
);

const QuickActionButton: React.FC<{ 
    title: string; 
    description: string; 
    action: () => void;
}> = ({ title, description, action }) => (
    <button
        onClick={action}
        className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
    >
        <div className="font-medium text-gray-900 group-hover:text-blue-600">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
    </button>
);

export default InsightsPage;