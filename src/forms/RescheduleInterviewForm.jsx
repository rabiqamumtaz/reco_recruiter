"use client"

import { useState } from "react"

const RescheduleInterviewForm = ({ interview, onSubmit, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [reason, setReason] = useState("")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Available time slots
  const timeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time")
      return
    }

    onSubmit({
      interviewId: interview.id,
      newDate: selectedDate,
      newTime: selectedTime,
      reason: reason,
    })
  }

  // Calendar logic
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const today = new Date()
      const isToday = date.toDateString() === today.toDateString()
      const isPast = date < today && !isToday
      const isSelected = selectedDate === date.toISOString().split("T")[0]

      days.push({
        day,
        date,
        isToday,
        isPast,
        isSelected,
        dateString: date.toISOString().split("T")[0],
      })
    }

    return days
  }

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const days = getDaysInMonth(currentMonth)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Interview Details */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Current Interview</h3>
        <p className="text-sm text-gray-600 mb-1">{interview.title}</p>
        <p className="text-sm text-gray-600 mb-1">{interview.company}</p>
        <p className="text-sm text-gray-600">
          {interview.date} at {interview.time}
        </p>
      </div>

      {/* Calendar */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Select New Date</label>
        <div className="bg-white border border-gray-200 rounded-lg">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <button type="button" onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-lg font-medium">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button type="button" onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => (
              <div key={index} className="aspect-square border-r border-b border-gray-100 last:border-r-0">
                {day && (
                  <button
                    type="button"
                    onClick={() => !day.isPast && setSelectedDate(day.dateString)}
                    disabled={day.isPast}
                    className={`w-full h-full flex items-center justify-center text-sm transition-colors ${
                      day.isPast
                        ? "text-gray-300 cursor-not-allowed"
                        : day.isSelected
                          ? "bg-black text-white"
                          : day.isToday
                            ? "bg-blue-100 text-blue-900 font-medium"
                            : "text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {day.day}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`p-2 text-sm border rounded-md transition-colors ${
                  selectedTime === time
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reason */}
      <div>
        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
          Reason for Rescheduling (Optional)
        </label>
        <textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Please provide a brief reason for rescheduling..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">New Interview Schedule</h4>
          <p className="text-sm text-blue-800">
            {new Date(selectedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at {selectedTime}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!selectedDate || !selectedTime}
          className="flex-1 px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Reschedule Interview
        </button>
      </div>
    </form>
  )
}

export default RescheduleInterviewForm
