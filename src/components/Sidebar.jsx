"use client"

import { NavLink } from "react-router-dom"
import { MdDashboard, MdWork, MdFeedback, MdClose } from "react-icons/md"

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { path: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { path: "/job-listings", icon: MdWork, label: "Job Listings" },
    { path: "/feedback", icon: MdFeedback, label: "Feedback" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">rec</span>
            </div>
            <span className="font-semibold text-gray-900">Recruiter Portal</span>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
            <MdClose size={24} />
          </button>
        </div>

        <nav className="mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 ${
                  isActive ? "bg-gray-100 text-gray-900 border-r-2 border-black" : ""
                }`
              }
              onClick={() => onClose()}
            >
              <item.icon className="mr-3" size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  )
}

export default Sidebar
