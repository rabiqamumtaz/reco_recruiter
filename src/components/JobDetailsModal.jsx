"use client"
import { MdClose, MdLocationOn, MdWork, MdAttachMoney, MdSchedule, MdBusiness } from "react-icons/md"

// Job details modal component
const JobDetailsModal = ({ isOpen, onClose, job, goToCandidate }) => {
  console.log(job)
  if (!isOpen || !job) return null

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    switch (status) {
      case "urgent":
        return `${baseClasses} bg-red-100 text-red-800`
      case "new":
        return `${baseClasses} bg-green-100 text-green-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  return (
    // Fixed overlay container covering entire viewport
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Semi-transparent backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal container positioned on the right */}
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        {/* 🔥 RESPONSIVE MODAL WIDTH - Key Change #1 */}
        <div className="relative w-screen max-w-full sm:max-w-md md:max-w-lg lg:max-w-[50vw] lg:min-w-[700px]">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* HEADER SECTION */}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
              {/* 🔥 RESPONSIVE HEADER LAYOUT - Key Change #2 */}
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  {/* Job title */}
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">{job.title}</h2>
                  {/* Company name */}
                  <p className="text-base sm:text-lg text-gray-600 mt-1 truncate">{job.company}</p>
                </div>
                {/* Status badge and close button */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-shrink-0">
                  <span className={getStatusBadge(job.status)}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  {/* Close button */}
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-500 p-1">
                    <MdClose size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT SECTION */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
              <div className="space-y-4 sm:space-y-6">
                {/* 🔥 RESPONSIVE GRID LAYOUT - Key Change #3 */}
                {/* JOB OVERVIEW SECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Location */}
                  <div className="flex items-start space-x-2 p-3 sm:p-0">
                    <MdLocationOn className="text-gray-400 mt-0.5 flex-shrink-0" size={20} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-600 break-words">{job.location}</p>
                      {job.remote && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                          Remote Available
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Job Type */}
                  <div className="flex items-start space-x-2 p-3 sm:p-0">
                    <MdWork className="text-gray-400 mt-0.5 flex-shrink-0" size={20} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Job Type</p>
                      <p className="text-sm text-gray-600">{job.type}</p>
                    </div>
                  </div>

                  {/* Salary */}
                  <div className="flex items-start space-x-2 p-3 sm:p-0">
                    <MdAttachMoney className="text-gray-400 mt-0.5 flex-shrink-0" size={20} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Salary</p>
                      <p className="text-sm text-gray-600 break-words">{job.salary}</p>
                    </div>
                  </div>

                  {/* Posted Date */}
                  <div className="flex items-start space-x-2 p-3 sm:p-0">
                    <MdSchedule className="text-gray-400 mt-0.5 flex-shrink-0" size={20} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">Posted</p>
                      <p className="text-sm text-gray-600">{job.postedDate}</p>
                    </div>
                  </div>
                </div>

                {/* JOB DESCRIPTION SECTION */}
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Job Description</h3>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <p className="text-sm text-gray-700 leading-relaxed">{job.description}</p>
                  </div>
                </div>

                {/* REQUIRED SKILLS SECTION */}
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Required Skills</h3>
                  {/* 🔥 RESPONSIVE SKILLS LAYOUT - Key Change #4 */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* REQUIREMENTS SECTION */}
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">Requirements</h3>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <ul className="space-y-2">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-500 mt-1 flex-shrink-0">•</span>
                          <span className="text-sm text-gray-700 break-words">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* COMPANY INFORMATION SECTION */}
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3">About the Company</h3>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-3">
                    {/* Company header */}
                    <div className="flex items-center space-x-2">
                      <MdBusiness className="text-gray-400 flex-shrink-0" size={20} />
                      <h4 className="font-medium text-gray-900 truncate">{job.companyInfo.name}</h4>
                    </div>

                    {/* 🔥 RESPONSIVE COMPANY DETAILS - Key Change #5 */}
                    {/* Company details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                      <div className="break-words">
                        <span className="font-medium text-gray-900">Industry:</span>
                        <span className="text-gray-600 ml-2">{job.companyInfo.industry}</span>
                      </div>
                      <div className="break-words">
                        <span className="font-medium text-gray-900">Company Size:</span>
                        <span className="text-gray-600 ml-2">{job.companyInfo.size}</span>
                      </div>
                    </div>

                    {/* Company description */}
                    <p className="text-sm text-gray-700 leading-relaxed break-words">{job.companyInfo.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 🔥 RESPONSIVE FOOTER - Key Change #6 */}
            {/* FOOTER SECTION */}
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
              {/* Close button */}
              <button
                onClick={onClose}
                className="w-full sm:w-auto z-50 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none order-2 sm:order-1"
              >
                Close
              </button>
              {/* Apply button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  console.log("Applying to job:", job.id)
                  goToCandidate(job.id)
                  // Handle job application logic here
                }}
                className="w-full z-50 sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none order-1 sm:order-2"
              >
                Candidates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsModal
