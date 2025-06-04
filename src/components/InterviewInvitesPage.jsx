"use client"

import { useState } from "react"
import SlideModal from "./SlideModal"
import RescheduleInterviewForm from "../forms/RescheduleInterviewForm"

const InterviewInvitesPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [viewMode, setViewMode] = useState("list") // list or calendar
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [selectedInterview, setSelectedInterview] = useState(null)

  // Sample interview data
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      title: "Technical Interview - Full Stack Engineer",
      company: "InnovateSoft",
      date: "May 24, 2025",
      time: "10:00 AM - 11:30 AM (PST)",
      platform: "Zoom Meeting",
      duration: "90 minutes",
      status: "upcoming",
      timeIndicator: "Tomorrow",
      details:
        "Technical interview with the engineering team. Be prepared to discuss your experience with Node.js, React, and MongoDB. There will be a live coding session.",
      interviewer: "Sarah Johnson (Engineering Manager)",
      location: "Remote Interview",
      meetingNote: "Meeting link will be sent 30 minutes before",
    },
    {
      id: 2,
      title: "Initial Screening - Senior Frontend Developer",
      company: "TechGlobal Inc.",
      date: "May 27, 2025",
      time: "2:00 PM - 3:00 PM (PST)",
      platform: "Google Meet",
      duration: "90 minutes",
      status: "upcoming",
      timeIndicator: "Next Week",
      details:
        "Initial screening call with the HR team to discuss your experience, skills, and expectations. Please have your resume handy.",
      location: "Remote Interview",
      meetingNote: "Meeting link will be sent 30 minutes before",
    },
    {
      id: 3,
      title: "Technical Assessment - Backend Developer",
      company: "DataSystems Corp.",
      date: "May 12, 2025",
      time: "11:00 AM - 12:30 PM (PST)",
      platform: "Microsoft Teams",
      duration: "90 minutes",
      status: "completed",
      details:
        "Technical assessment focused on database design, API development, and system architecture. Feedback expected within 5 business days.",
      feedbackStatus: "Awaiting Feedback",
    },
  ])

  // Filter interviews based on active tab
  const filteredInterviews = interviews.filter((interview) => interview.status === activeTab)

  // Calendar data for the calendar view
  const calendarData = {
    month: "May",
    year: 2025,
    days: [
      // This would be dynamically generated in a real app
      { date: 1, interviews: [] },
      // ... other days
      {
        date: 15,
        interviews: [{ time: "1:00 PM", title: "Culture fit interview", color: "green" }],
      },
      {
        date: 20,
        interviews: [{ time: "11:00 AM", title: "Technical Assessment", color: "blue" }],
      },
      {
        date: 22,
        interviews: [{ time: "2:00 PM", title: "Interview", color: "purple" }],
      },
      // ... other days
    ],
  }

  // Platform icons
  const getPlatformIcon = (platform) => {
    if (platform.includes("Zoom")) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12L11 15L16 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    } else if (platform.includes("Google")) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.5455 9.92543C15.9195 9.26103 16.2313 8.66151 16.2313 7.88446C16.2313 6.58446 15.3716 5.27648 13.7883 5.27648C12.8582 5.27648 12.0179 5.72448 11.6334 6.38889H11.6001V5.49097H9.50052V14.418H11.6001V10.2394C11.6001 9.26103 12.1552 8.63954 13.0854 8.63954C14.0156 8.63954 14.3373 9.32594 14.3373 10.2394V14.418H16.4369V10.1078C16.4369 10.0446 16.4369 9.98149 16.4313 9.92543H15.5455Z"
            fill="currentColor"
          />
          <path d="M6.81592 5.49097H8.91649V14.418H6.81592V5.49097Z" fill="currentColor" />
          <path
            d="M7.86601 2C7.13058 2 6.53333 2.59695 6.53333 3.33333C6.53333 4.0697 7.13058 4.66667 7.86601 4.66667C8.60174 4.66667 9.19899 4.0697 9.19899 3.33333C9.19899 2.59695 8.60174 2 7.86601 2Z"
            fill="currentColor"
          />
        </svg>
      )
    } else if (platform.includes("Microsoft")) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="8" height="8" fill="currentColor" />
          <rect x="13" y="3" width="8" height="8" fill="currentColor" />
          <rect x="3" y="13" width="8" height="8" fill="currentColor" />
          <rect x="13" y="13" width="8" height="8" fill="currentColor" />
        </svg>
      )
    }
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    )
  }

  const handleReschedule = (interview) => {
    setSelectedInterview(interview)
    setShowRescheduleModal(true)
  }

  const handleRescheduleSubmit = (rescheduleData) => {
    // Update the interview with new date/time
    setInterviews((prev) =>
      prev.map((interview) =>
        interview.id === rescheduleData.interviewId
          ? {
              ...interview,
              date: new Date(rescheduleData.newDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              time: rescheduleData.newTime,
            }
          : interview,
      ),
    )

    setShowRescheduleModal(false)
    setSelectedInterview(null)

    // Show success message (you could use a toast notification here)
    alert("Interview rescheduled successfully!")
  }

  const handleCancelInterview = (interviewId) => {
    if (window.confirm("Are you sure you want to cancel this interview?")) {
      setInterviews((prev) =>
        prev.map((interview) => (interview.id === interviewId ? { ...interview, status: "cancelled" } : interview)),
      )
    }
  }

  const renderListView = () => {
    if (filteredInterviews.length === 0) {
      return (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No {activeTab} Interviews</h3>
          <p className="text-gray-600">You don't have any {activeTab} interviews at the moment.</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {filteredInterviews.map((interview) => (
          <div key={interview.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{interview.title}</h3>
                  {interview.timeIndicator && (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        interview.timeIndicator === "Tomorrow"
                          ? "bg-green-100 text-green-800"
                          : interview.timeIndicator === "Next Week"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {interview.timeIndicator}
                    </span>
                  )}
                  {interview.status === "completed" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Completed
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{interview.company}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z"
                  />
                </svg>
                <span>{interview.date}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{interview.time}</span>
              </div>
              {interview.platform && (
                <div className="flex items-center text-gray-600">
                  {getPlatformIcon(interview.platform)}
                  <span className="ml-2">{interview.platform}</span>
                </div>
              )}
              {interview.location && (
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <span>{interview.location}</span>
                </div>
              )}
              {interview.duration && (
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Duration: {interview.duration}</span>
                </div>
              )}
            </div>

            {interview.meetingNote && <div className="text-sm text-gray-600 mb-4">{interview.meetingNote}</div>}

            {interview.details && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Interview {activeTab === "completed" ? "Summary" : "Details"}:
                </h4>
                <p className="text-sm text-gray-600">{interview.details}</p>
              </div>
            )}

            {interview.interviewer && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">Interviewer: {interview.interviewer}</p>
              </div>
            )}

            {interview.feedbackStatus && (
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Status: {interview.feedbackStatus}</span>
                <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  View Notes
                </button>
              </div>
            )}

            {interview.status === "upcoming" && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleReschedule(interview)}
                  className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
                >
                  Reschedule
                </button>
                <button
                  onClick={() => handleCancelInterview(interview.id)}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50"
                >
                  Cancel Interview
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const renderCalendarView = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <button className="p-1 rounded-md hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Today</button>
          <h3 className="text-lg font-medium">
            {calendarData.month} {calendarData.year}
          </h3>
          <div className="flex space-x-2">
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option>All interviews</option>
              <option>Upcoming</option>
              <option>Completed</option>
            </select>
            <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option>Month</option>
              <option>Week</option>
              <option>Day</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-t border-gray-200">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-2 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
          {Array.from({ length: 35 }).map((_, index) => {
            const day = calendarData.days.find((d) => d.date === index + 1)
            return (
              <div key={index} className="border-b border-r border-gray-200 p-1 overflow-hidden">
                {day && (
                  <>
                    <div className="text-xs text-gray-500 mb-1">{day.date}</div>
                    {day.interviews.map((interview, i) => (
                      <div
                        key={i}
                        className={`text-xs p-1 mb-1 rounded truncate ${
                          interview.color === "green"
                            ? "bg-green-100 text-green-800"
                            : interview.color === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {interview.time}
                        <div className="truncate">{interview.title}</div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Interview Invites</h1>
          <button
            onClick={() => setViewMode(viewMode === "list" ? "calendar" : "list")}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {viewMode === "list" ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h3a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h3z"
                  />
                </svg>
                <span>Calendar View</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                <span>List View</span>
              </>
            )}
          </button>
        </div>

        {viewMode === "list" ? (
          <>
            <div className="bg-gray-100 rounded-lg mb-6 flex overflow-hidden">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "upcoming" ? "bg-white text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "completed" ? "bg-white text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab("cancelled")}
                className={`flex-1 py-3 text-center font-medium ${
                  activeTab === "cancelled" ? "bg-white text-gray-900" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Cancelled
              </button>
            </div>
            {renderListView()}
          </>
        ) : (
          renderCalendarView()
        )}

        {/* Reschedule Modal */}
        <SlideModal
          isOpen={showRescheduleModal}
          onClose={() => {
            setShowRescheduleModal(false)
            setSelectedInterview(null)
          }}
          title="Reschedule Interview"
        >
          {selectedInterview && (
            <RescheduleInterviewForm
              interview={selectedInterview}
              onSubmit={handleRescheduleSubmit}
              onCancel={() => {
                setShowRescheduleModal(false)
                setSelectedInterview(null)
              }}
            />
          )}
        </SlideModal>
      </div>
    </div>
  )
}

export default InterviewInvitesPage
