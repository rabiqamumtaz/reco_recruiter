"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import ProfileSummary from "./components/ProfileSummary"
import ProfileCompletion from "./components/ProfileCompletion"
import ApplicationSummary from "./components/ApplicationSummary"
import ResumePage from "./components/ResumePage"
import SkillsPage from "./components/SkillsPage"
import ContactInfoPage from "./components/ContactInfoPage"
import AppliedJobsPage from "./components/AppliedJobsPage"
import InterviewInvitesPage from "./components/InterviewInvitesPage"
import FeedbackPage from "./components/FeedbackPage"
import "./App.css"

function App() {
  const [activeItem, setActiveItem] = useState("profile")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileData, setProfileData] = useState(null)

  // Render the appropriate content based on the active item
  const renderContent = () => {
    switch (activeItem) {
      case "profile":
        return (
          <div className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <ProfileSummary onProfileUpdate={setProfileData} />
                </div>
                <div>
                  <ProfileCompletion profileData={profileData} />
                </div>
              </div>
              <ApplicationSummary />
            </div>
          </div>
        )
      case "resume":
        return <ResumePage />
      case "skills":
        return <SkillsPage />
      case "contact":
        return <ContactInfoPage />
      case "applied-jobs":
        return <AppliedJobsPage />
      case "interview-invites":
        return <InterviewInvitesPage />
      case "feedback":
        return <FeedbackPage />
      case "dashboard":
        return (
          <div className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-gray-600">
                  Welcome to your dashboard! Navigate through the sidebar to access different sections.
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)}
              </h1>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-gray-600">This section is under development.</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Page content */}
        {renderContent()}
      </div>
    </div>
  )
}

export default App
