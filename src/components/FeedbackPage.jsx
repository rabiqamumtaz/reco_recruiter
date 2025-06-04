"use client"

import { useState } from "react"

const FeedbackPage = () => {
  const [activeTab, setActiveTab] = useState("provide")
  const [selectedCompany, setSelectedCompany] = useState("")
  const [rating, setRating] = useState(0)
  const [wentWell, setWentWell] = useState("")
  const [improvements, setImprovements] = useState("")
  const [additionalComments, setAdditionalComments] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  // Sample feedback data
  const feedbacks = [
    {
      id: 1,
      company: "TechGlobal Inc.",
      position: "Senior Frontend Developer",
      date: "May 28, 2025",
      status: "positive",
      rating: 4,
      interviewer: "Sarah Johnson",
      feedback:
        "Great technical skills and problem-solving approach. Strong React knowledge and good communication. Would benefit from more system design experience.",
      strengths: ["Technical expertise", "Problem-solving", "Communication"],
      improvements: ["System design", "Leadership experience"],
    },
    {
      id: 2,
      company: "StartupCorp",
      position: "Full Stack Engineer",
      date: "May 25, 2025",
      status: "neutral",
      rating: 3,
      interviewer: "Mike Chen",
      feedback: "Solid technical foundation but needs more experience with our tech stack. Cultural fit seems good.",
      strengths: ["Cultural fit", "Learning attitude"],
      improvements: ["Tech stack familiarity", "Project experience"],
    },
    {
      id: 3,
      company: "WebSolutions",
      position: "React Developer",
      date: "May 22, 2025",
      status: "negative",
      rating: 2,
      interviewer: "Lisa Wang",
      feedback: "Technical skills need improvement. Struggled with advanced React concepts and coding challenges.",
      strengths: ["Enthusiasm", "Willingness to learn"],
      improvements: ["Advanced React", "Algorithm knowledge", "Code optimization"],
    },
  ]

  const companies = [
    { id: 1, name: "InnovateSoft" },
    { id: 2, name: "TechGlobal Inc." },
    { id: 3, name: "DataSystems Corp." },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      company: selectedCompany,
      rating,
      wentWell,
      improvements,
      additionalComments,
      isAnonymous,
    })

    // Reset form
    setSelectedCompany("")
    setRating(0)
    setWentWell("")
    setImprovements("")
    setAdditionalComments("")
    setIsAnonymous(false)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      positive: { bg: "bg-green-100", text: "text-green-800", label: "Positive" },
      neutral: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Neutral" },
      negative: { bg: "bg-red-100", text: "text-red-800", label: "Needs Improvement" },
    }

    const config = statusConfig[status] || statusConfig["neutral"]

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
      >
        {config.label}
      </span>
    )
  }

  const renderStars = (count, interactive = false) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => setRating(star) : undefined}
            className={interactive ? "focus:outline-none" : undefined}
          >
            <svg
              className={`w-6 h-6 ${star <= (interactive ? rating : count) ? "text-yellow-400" : "text-gray-300"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        {!interactive && <span className="ml-2 text-sm text-gray-600">({count}/5)</span>}
      </div>
    )
  }

  const renderProvideFeedback = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Provide Interview Feedback</h2>
        <p className="text-gray-600 mb-6">Share your experience with the interview process</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Company</label>
              <div className="flex flex-wrap gap-2">
                {companies.map((company) => (
                  <button
                    key={company.id}
                    type="button"
                    onClick={() => setSelectedCompany(company.name)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      selectedCompany === company.name
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {company.name}
                  </button>
                ))}
                <button
                  type="button"
                  className="px-4 py-2 rounded-md text-sm bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Company
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rate Your Experience</label>
              {renderStars(rating, true)}
            </div>

            <div>
              <label htmlFor="wentWell" className="block text-sm font-medium text-gray-700 mb-2">
                What went well?
              </label>
              <textarea
                id="wentWell"
                value={wentWell}
                onChange={(e) => setWentWell(e.target.value)}
                placeholder="Share what you liked about the interview process..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              ></textarea>
            </div>

            <div>
              <label htmlFor="improvements" className="block text-sm font-medium text-gray-700 mb-2">
                What could be improved?
              </label>
              <textarea
                id="improvements"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                placeholder="Share any suggestions for improvement..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              ></textarea>
            </div>

            <div>
              <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments
              </label>
              <textarea
                id="additionalComments"
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                placeholder="Any other thoughts you'd like to share..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                id="anonymous"
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Submit feedback anonymously
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Submit Feedback
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  const renderReceivedFeedback = () => {
    if (feedbacks.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback available</h3>
          <p className="text-gray-600">You haven't received any interview feedback yet.</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {feedbacks.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{feedback.position}</h3>
                  {getStatusBadge(feedback.status)}
                </div>
                <p className="text-gray-600 mb-2">{feedback.company}</p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>Interviewed by {feedback.interviewer}</span>
                  <span className="mx-2">•</span>
                  <span>{feedback.date}</span>
                </div>
                {renderStars(feedback.rating)}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Feedback</h4>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-lg p-3">{feedback.feedback}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-800 mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center text-sm text-green-700">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-orange-800 mb-2">Areas for Improvement</h4>
                  <ul className="space-y-1">
                    {feedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-center text-sm text-orange-700">
                        <svg className="w-4 h-4 mr-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Feedback</h1>
        <p className="text-gray-600 mb-6">Give your interview feedback here</p>

        <div className="bg-gray-100 rounded-lg mb-6 flex overflow-hidden">
          <button
            onClick={() => setActiveTab("provide")}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "provide" ? "bg-white text-gray-900" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Provide Feedback
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === "received" ? "bg-white text-gray-900" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Received Feedback
          </button>
        </div>

        {activeTab === "provide" ? renderProvideFeedback() : renderReceivedFeedback()}
      </div>
    </div>
  )
}

export default FeedbackPage
