"use client"

import { useEffect } from "react"

const JobDetailModal = ({ isOpen, onClose, job }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !job) return null

  const getStatusBadge = (status) => {
    const statusConfig = {
      submitted: { bg: "bg-blue-100", text: "text-blue-800", label: "Submitted" },
      "under-review": { bg: "bg-orange-100", text: "text-orange-800", label: "Under Review" },
      interview: { bg: "bg-green-100", text: "text-green-800", label: "Interview" },
      rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
    }

    const config = statusConfig[status] || statusConfig["submitted"]

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      {/* Slide panel */}
      <div
        className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
        style={{ animation: "slideIn 0.3s ease-out forwards" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
              {getStatusBadge(job.status)}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-md hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{job.company}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{job.location}</span>
                  <span className="ml-2 text-gray-500">Remote Available</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{job.type}</span>
                  <span className="ml-2 text-gray-500">Employment Type</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                  <span className="font-semibold text-gray-900">{job.salary}</span>
                  <span className="ml-2 text-gray-500">Annual Salary</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z"
                    />
                  </svg>
                  <span>{job.appliedDate}</span>
                  <span className="ml-2 text-gray-500">Applied Date</span>
                </div>
              </div>
            </div>

            {/* About this role */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">About this role</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{job.description}</p>
            </div>

            {/* Job Requirements */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">Job Requirements</h4>
              <p className="text-sm text-gray-600 mb-3">What we're looking for in the ideal candidate</p>
              <ul className="space-y-2">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {requirement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Info */}
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">Company Info</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="font-medium text-gray-900">{job.companyInfo.name}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Company Information</p>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Industry</p>
                    <p className="text-sm text-gray-600">{job.companyInfo.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Company Size</p>
                    <p className="text-sm text-gray-600">{job.companyInfo.size}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-700 mb-1">About the Company</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{job.companyInfo.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              <span>View Original Job Post</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}

export default JobDetailModal
