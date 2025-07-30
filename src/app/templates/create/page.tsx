"use client";
import React, { useState, useEffect } from "react";
import { Plus, Trash2, ArrowLeft, Save, GripVertical } from "lucide-react";
import Sidebar from "../../../components/Sidebar";
import { useRouter, useParams, useSearchParams } from "next/navigation";

interface TemplateSection {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'summary' | 'action_items' | 'questions' | 'insights';
  isRequired: boolean;
  order: number;
}

interface TemplateFormData {
  title: string;
  description: string;
  category: string;
  sections: TemplateSection[];
  isShared: boolean;
  isDefault: boolean;
  isFavorite: boolean;
}

const CreateEditTemplatePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("templates");
  const [isEditing, setIsEditing] = useState(false);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState<TemplateFormData>({
    title: "",
    description: "",
    category: "",
    sections: [
      {
        id: "section-1",
        title: "Meeting Objective",
        description: "Define the main purpose and goals of the meeting",
        type: "text",
        isRequired: true,
        order: 1
      },
      {
        id: "section-2",
        title: "Key Discussion Points",
        description: "List the main topics to be discussed",
        type: "text",
        isRequired: false,
        order: 2
      },
      {
        id: "section-3",
        title: "Action Items",
        description: "Track tasks and assignments from the meeting",
        type: "action_items",
        isRequired: true,
        order: 3
      }
    ],
    isShared: false,
    isDefault: false,
    isFavorite: false
  });

  const categories = ["Sales", "Marketing", "HR", "Customer Success", "Leadership", "Project Management", "Consulting"];
  const sectionTypes = [
    { value: "text", label: "Text Content" },
    { value: "summary", label: "Summary" },
    { value: "action_items", label: "Action Items" },
    { value: "questions", label: "Questions" },
    { value: "insights", label: "Insights" }
  ];

  useEffect(() => {
    // Check if we're editing (URL contains template ID)
    if (params?.id) {
      setIsEditing(true);
      setTemplateId(params.id as string);
      loadTemplateData(params.id as string);
    }
    
    // Check if we're copying (URL contains copy parameter)
    const copyId = searchParams?.get('copy');
    if (copyId) {
      loadTemplateData(copyId, true);
    }
  }, [params, searchParams]);

  const loadTemplateData = async (id: string, isCopy: boolean = false) => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate loading template data
    const mockTemplate = {
      title: isCopy ? "Copy of Sales Meeting Template" : "Sales Meeting Template",
      description: "Structured template for sales discussions and follow-ups",
      category: "Sales",
      sections: [
        {
          id: "section-1",
          title: "Meeting Objective",
          description: "Define the main purpose and goals of the meeting",
          type: "text" as const,
          isRequired: true,
          order: 1
        },
        {
          id: "section-2",
          title: "Prospect Information",
          description: "Key details about the prospect or client",
          type: "text" as const,
          isRequired: true,
          order: 2
        },
        {
          id: "section-3",
          title: "Discussion Points",
          description: "Main topics covered in the meeting",
          type: "text" as const,
          isRequired: false,
          order: 3
        },
        {
          id: "section-4",
          title: "Action Items",
          description: "Tasks and follow-ups from the meeting",
          type: "action_items" as const,
          isRequired: true,
          order: 4
        }
      ],
      isShared: true,
      isDefault: false,
      isFavorite: true
    };

    setFormData(mockTemplate);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    router.push(`/${page}`);
  };

  const handleInputChange = (field: keyof TemplateFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSectionChange = (sectionId: string, field: keyof TemplateSection, value: any) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  const addSection = () => {
    const newSection: TemplateSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      description: "Description for this section",
      type: "text",
      isRequired: false,
      order: formData.sections.length + 1
    };

    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const removeSection = (sectionId: string) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Validate form
      if (!formData.title.trim() || !formData.category) {
        alert("Please fill in all required fields");
        return;
      }

      // In a real app, this would make an API call
      console.log("Saving template:", formData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to templates list
      router.push("/templates");
      
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Error saving template. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="flex-1 ml-64 px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? "Edit Template" : "Create New Template"}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditing 
                  ? "Modify your existing template" 
                  : "Build a custom template to structure your meetings effectively"
                }
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <div className="space-y-8">
              {/* Template Basic Info */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Template Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name *
                    </label>
                    
                    {/* Template Name Input */}
                    
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter template name"
                      className="w-full text-black px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    {/* Category Select */}
                    <select 
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full text-black px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  {/* Description Textarea */}
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe what this template is used for..."
                    rows={3}
                    className="w-full text-black px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
              </div>

              {/* Template Sections */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Template Sections</h2>
                  <button 
                    onClick={addSection}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Section
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.sections.map((section, index) => (
                    <div key={section.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-2">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              {/* Section Title Input */}
                              <input
                                type="text"
                                value={section.title}
                                onChange={(e) => handleSectionChange(section.id, "title", e.target.value)}
                                className="font-medium text-black bg-transparent border-none outline-none focus:bg-white focus:border focus:border-gray-200 focus:rounded px-2 py-1"
                              />
                              <div className="flex items-center gap-2">
                                {/* Section Type Select */}
                                <select
                                  value={section.type}
                                  onChange={(e) => handleSectionChange(section.id, "type", e.target.value)}
                                  className="text-xs text-black border border-gray-200 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                  {sectionTypes.map(type => (
                                    <option key={type.value} value={type.value}>
                                      {type.label}
                                    </option>
                                  ))}
                                </select>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  section.isRequired 
                                    ? "bg-green-100 text-green-700" 
                                    : "bg-gray-100 text-gray-600"
                                }`}>
                                  {section.isRequired ? "Required" : "Optional"}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeSection(section.id)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          {/* Section Description Textarea */}
                          <textarea
                            value={section.description}
                            onChange={(e) => handleSectionChange(section.id, "description", e.target.value)}
                            placeholder="Description for this section..."
                            rows={2}
                            className="w-full text-black px-3 py-2 border border-gray-200 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                          />
                          
                          <div className="flex items-center gap-4">
                            <label className="flex items-center">
                              <input 
                                type="checkbox" 
                                checked={section.isRequired}
                                onChange={(e) => handleSectionChange(section.id, "isRequired", e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                              />
                              <span className="ml-2 text-sm text-gray-700">Required section</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template Settings */}
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Template Settings</h2>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={formData.isShared}
                      onChange={(e) => handleInputChange("isShared", e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-3 text-sm text-gray-700">Make this template available to all team members</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={formData.isDefault}
                      onChange={(e) => handleInputChange("isDefault", e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-3 text-sm text-gray-700">Set as default template for this category</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      checked={formData.isFavorite}
                      onChange={(e) => handleInputChange("isFavorite", e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span className="ml-3 text-sm text-gray-700">Add to my favorites</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : (isEditing ? "Update Template" : "Create Template")}
                </button>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateEditTemplatePage;