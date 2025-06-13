"use client"

import { MdAdd, MdSchedule, MdFileDownload, MdGroup, MdEmail, MdAnalytics } from "react-icons/md"

const QuickActionsDropdown = ({ onClose }) => {
  const actions = [
    { icon: MdAdd, label: "Add New Job", action: () => console.log("Add New Job") },
    { icon: MdSchedule, label: "Add Urgent Deadlines", action: () => console.log("Add Urgent Deadlines") },
    { icon: MdFileDownload, label: "Export Report", action: () => console.log("Export Report") },
    { icon: MdGroup, label: "Bulk Submit Candidates", action: () => console.log("Bulk Submit Candidates") },
    { icon: MdEmail, label: "Send Follow-up Email", action: () => console.log("Send Follow-up Email") },
    { icon: MdAnalytics, label: "View Analytics", action: () => console.log("View Analytics") },
  ]

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
        <div className="py-1">
          <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">Quick Actions</div>
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.action()
                onClose()
              }}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <action.icon className="mr-3" size={16} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default QuickActionsDropdown
