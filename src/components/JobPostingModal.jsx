"use client"

import { useState } from "react"
import RightSideModal from "./RightSideModal"
import { MdContentCopy, MdOpenInNew } from "react-icons/md"

const JobPostingModal = ({ isOpen, onClose, job }) => {
  const [activeTab, setActiveTab] = useState("Public Link")

  const tabs = ["Public Link", "Direct Apply", "Referral Link"]

  const getTabContent = () => {
    switch (activeTab) {
      case "Public Link":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Public Job Posting Link</label>
              <div className="flex">
                <input
                  type="text"
                  value="https://careers.company.com/jobs/job-5"
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                />
                <button className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <MdContentCopy size={16} />
                </button>
                <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
                  <MdOpenInNew size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Share this link on job boards, social media, or with potential candidates.
            </p>
          </div>
        )
      case "Direct Apply":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Direct Application Link</label>
              <div className="flex">
                <input
                  type="text"
                  value="https://careers.company.com/apply/job-5"
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                />
                <button className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <MdContentCopy size={16} />
                </button>
                <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
                  <MdOpenInNew size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">This link takes candidates directly to the application form.</p>
          </div>
        )
      case "Referral Link":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Referral Tracking Link</label>
              <div className="flex">
                <input
                  type="text"
                  value="https://careers.company.com/referral/job-5?ref=recruiter"
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50"
                />
                <button className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100">
                  <MdContentCopy size={16} />
                </button>
                <button className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
                  <MdOpenInNew size={16} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Use this link to track applications that come through your referrals.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <RightSideModal isOpen={isOpen} onClose={onClose} title="Job Posting Links">
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-6">
          Generate and share links for DevOps Engineer at CloudTech Solutions.
        </p>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {getTabContent()}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button onClick={onClose} className="w-full btn-primary">
            Close
          </button>
        </div>
      </div>
    </RightSideModal>
  )
}

export default JobPostingModal
