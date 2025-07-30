"use client";
import React, { useState } from "react";
import { Plus, Edit3, Star, Copy, Trash2, Search } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  isFavorite: boolean;
  isDefault: boolean;
  sections: string[];
  createdDate: string;
  lastUsed?: string;
}

const TemplatesListPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const router = useRouter();

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    router.push(`/${page}`);
    console.log(`Navigating to: ${page}`);
  };

  // Sample template data
  const templates: Template[] = [
    {
      id: "template-1",
      title: "Sales Meeting Template",
      description: "Structured template for sales discussions and follow-ups",
      category: "Sales",
      isFavorite: true,
      isDefault: true,
      sections: ["Meeting Objective", "Key Discussion Points", "Action Items", "Next Steps"],
      createdDate: "2025-01-15",
      lastUsed: "2025-01-28"
    },
    {
      id: "template-2",
      title: "Customer Success Review",
      description: "Quarterly review template for customer success meetings",
      category: "Customer Success",
      isFavorite: false,
      isDefault: false,
      sections: ["Performance Review", "Challenges", "Opportunities", "Action Plan"],
      createdDate: "2025-01-10",
      lastUsed: "2025-01-25"
    },
    {
      id: "template-3",
      title: "HR Interview Template",
      description: "Comprehensive template for candidate interviews",
      category: "HR",
      isFavorite: true,
      isDefault: false,
      sections: ["Candidate Background", "Technical Assessment", "Cultural Fit", "Next Steps"],
      createdDate: "2025-01-05"
    },
    {
      id: "template-4",
      title: "Marketing Strategy Session",
      description: "Template for marketing planning and strategy meetings",
      category: "Marketing",
      isFavorite: false,
      isDefault: false,
      sections: ["Current Metrics", "Strategy Discussion", "Campaign Planning", "Budget Allocation"],
      createdDate: "2024-12-20",
      lastUsed: "2025-01-20"
    },
    {
      id: "template-5",
      title: "Leadership Team Meeting",
      description: "Executive level meeting template for leadership discussions",
      category: "Leadership",
      isFavorite: false,
      isDefault: false,
      sections: ["Company Updates", "Strategic Initiatives", "Decisions Required", "Action Items"],
      createdDate: "2024-12-15"
    },
    {
      id: "template-6",
      title: "Project Kickoff Template",
      description: "Template for project initiation and team alignment meetings",
      category: "Project Management",
      isFavorite: true,
      isDefault: false,
      sections: ["Project Overview", "Team Roles", "Timeline", "Success Criteria"],
      createdDate: "2024-12-10"
    }
  ];

  const categories = ["all", "Sales", "Marketing", "HR", "Customer Success", "Leadership", "Project Management", "Consulting"];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesFavorites = !showFavorites || template.isFavorite;
    
    return matchesSearch && matchesCategory && matchesFavorites;
  });

  const handleTemplateAction = (action: string, templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`${action} template:`, templateId);
    
    switch (action) {
      case "edit":
        router.push(`/templates/edit/${templateId}`);
        break;
      case "copy":
        router.push(`/templates/create?copy=${templateId}`);
        break;
      case "favorite":
        // Toggle favorite logic here
        break;
      case "delete":
        // Delete confirmation and logic here
        break;
      default:
        break;
    }
  };

  const handleCreateNew = () => {
    router.push("/templates/create");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="flex-1 ml-64 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
              <p className="text-gray-600 mt-1">Structure and personalize your meeting notes</p>
            </div>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Create Template
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  showFavorites 
                    ? "bg-yellow-50 border-yellow-200 text-yellow-700" 
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Star className={`w-4 h-4 ${showFavorites ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className={`bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all duration-200 ${
                  selectedTemplate === template.id ? "ring-2 ring-blue-500 border-blue-200" : ""
                }`}
                onClick={() => setSelectedTemplate(selectedTemplate === template.id ? null : template.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{template.title}</h3>
                    {template.isDefault && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleTemplateAction("favorite", template.id, e)}
                    className={`transition-colors ${
                      template.isFavorite ? "text-yellow-500" : "text-gray-300 hover:text-yellow-500"
                    }`}
                  >
                    <Star className={`w-4 h-4 ${template.isFavorite ? "fill-current" : ""}`} />
                  </button>
                </div>
                
                <p className="text-gray-600 text-xs mb-4 line-clamp-2">{template.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span className="bg-gray-100 px-2 py-1 rounded truncate">{template.category}</span>
                  <span>{template.sections.length} sections</span>
                </div>
                
                {template.lastUsed && (
                  <p className="text-xs text-gray-400 mb-4">Last used: {new Date(template.lastUsed).toLocaleDateString()}</p>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleTemplateAction("edit", template.id, e)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleTemplateAction("copy", template.id, e)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                  <button
                    onClick={(e) => handleTemplateAction("delete", template.id, e)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || selectedCategory !== "all" || showFavorites
                    ? "Try adjusting your search criteria or filters."
                    : "Get started by creating your first template."}
                </p>
                <button
                  onClick={handleCreateNew}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create Template
                </button>
              </div>
            </div>
          )}

          {/* Stats Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
              <div>
                Showing {filteredTemplates.length} of {templates.length} templates
              </div>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span>{templates.filter(t => t.isFavorite).length} favorites</span>
                <span>{templates.filter(t => t.isDefault).length} default templates</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplatesListPage;