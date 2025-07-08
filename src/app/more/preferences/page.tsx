"use client";
import React, { useState } from "react";
import { Bell, Shield, Volume2, Mail, Smartphone, Monitor } from "lucide-react";
import Sidebar from "../../../components/SIdebar";
import { useRouter } from "next/navigation";

// Define the preferences type
type PreferencesType = {
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    smsNotifications: boolean;
    meetingReminders: boolean;
    systemUpdates: boolean;
    marketingEmails: boolean;
  };
  appearance: {
    theme: string;
    language: string;
    timezone: string;
  };
  privacy: {
    profileVisibility: string;
    activityStatus: boolean;
    dataCollection: boolean;
    thirdPartySharing: boolean;
  };
  audio: {
    microphoneEnabled: boolean;
    speakerEnabled: boolean;
    noiseReduction: boolean;
    echoSuppression: boolean;
  };
};

const PreferencesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("more/preferences");
  const router = useRouter();

  // Mock preferences data
  const [preferences, setPreferences] = useState<PreferencesType>({
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      meetingReminders: true,
      systemUpdates: false,
      marketingEmails: false,
    },
    appearance: {
      theme: "light", // light, dark, auto
      language: "en",
      timezone: "UTC-5",
    },
    privacy: {
      profileVisibility: "public",
      activityStatus: true,
      dataCollection: false,
      thirdPartySharing: false,
    },
    audio: {
      microphoneEnabled: true,
      speakerEnabled: true,
      noiseReduction: true,
      echoSuppression: true,
    },
  });

  const handleNavigation = (page: string) => {
    setCurrentPage(page);

    // Handle navigation similar to account page
    if (page === "logout") {
      // Clear any stored user data/tokens
      if (typeof window !== "undefined") {
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

  const updatePreference = <
    T extends keyof PreferencesType,
    K extends keyof PreferencesType[T]
  >(
    section: T,
    key: K,
    value: PreferencesType[T][K]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const ToggleSwitch = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: (value: boolean) => void;
  }) => {
    return (
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Main Content */}
      <main className="ml-64 px-6 py-6">
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Email Notifications
                    </h3>
                    <p className="text-sm text-gray-600">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={preferences.notifications.emailNotifications}
                  onChange={(value) =>
                    updatePreference(
                      "notifications",
                      "emailNotifications",
                      value
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Push Notifications
                    </h3>
                    <p className="text-sm text-gray-600">
                      Receive push notifications in browser
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={preferences.notifications.pushNotifications}
                  onChange={(value) =>
                    updatePreference(
                      "notifications",
                      "pushNotifications",
                      value
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      SMS Notifications
                    </h3>
                    <p className="text-sm text-gray-600">
                      Receive text messages for important updates
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={preferences.notifications.smsNotifications}
                  onChange={(value) =>
                    updatePreference("notifications", "smsNotifications", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Meeting Reminders
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get reminded about upcoming meetings
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={preferences.notifications.meetingReminders}
                  onChange={(value) =>
                    updatePreference("notifications", "meetingReminders", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      System Updates
                    </h3>
                    <p className="text-sm text-gray-600">
                      Notifications about system updates and maintenance
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={preferences.notifications.systemUpdates}
                  onChange={(value) =>
                    updatePreference("notifications", "systemUpdates", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Marketing Emails
                    </h3>
                    <p className="text-sm text-gray-600">
                      Receive promotional emails and feature updates
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={preferences.notifications.marketingEmails}
                  onChange={(value) =>
                    updatePreference("notifications", "marketingEmails", value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Privacy & Security
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Profile Visibility
                </label>
                <select
                  value={preferences.privacy.profileVisibility}
                  onChange={(e) =>
                    updatePreference(
                      "privacy",
                      "profileVisibility",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="contacts">Contacts Only</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Activity Status</h3>
                  <p className="text-sm text-gray-600">
                    Show when you&apos;re online to other users
                  </p>
                </div>
                <ToggleSwitch
                  enabled={preferences.privacy.activityStatus}
                  onChange={(value) =>
                    updatePreference("privacy", "activityStatus", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Data Collection</h3>
                  <p className="text-sm text-gray-600">
                    Allow collection of usage data for improvement
                  </p>
                </div>
                <ToggleSwitch
                  enabled={preferences.privacy.dataCollection}
                  onChange={(value) =>
                    updatePreference("privacy", "dataCollection", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Third-party Sharing
                  </h3>
                  <p className="text-sm text-gray-600">
                    Share data with trusted third-party services
                  </p>
                </div>
                <ToggleSwitch
                  enabled={preferences.privacy.thirdPartySharing}
                  onChange={(value) =>
                    updatePreference("privacy", "thirdPartySharing", value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Audio Settings
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Microphone</h3>
                  <p className="text-sm text-gray-600">
                    Enable microphone for meetings
                  </p>
                </div>
                <ToggleSwitch
                  enabled={preferences.audio.microphoneEnabled}
                  onChange={(value) =>
                    updatePreference("audio", "microphoneEnabled", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Speaker</h3>
                  <p className="text-sm text-gray-600">
                    Enable speaker output for meetings
                  </p>
                </div>
                <ToggleSwitch
                  enabled={preferences.audio.speakerEnabled}
                  onChange={(value) =>
                    updatePreference("audio", "speakerEnabled", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">Noise Reduction</h3>
                  <p className="text-sm text-gray-600">
                    Filter out background noise during calls
                  </p>
                </div>
                <ToggleSwitch
                  enabled={preferences.audio.noiseReduction}
                  onChange={(value) =>
                    updatePreference("audio", "noiseReduction", value)
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Echo Suppression
                  </h3>
                  <p className="text-sm text-gray-600">
                    Reduce echo during audio calls
                  </p>
                </div>
                <ToggleSwitch
                  enabled={preferences.audio.echoSuppression}
                  onChange={(value) =>
                    updatePreference("audio", "echoSuppression", value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreferencesPage;
