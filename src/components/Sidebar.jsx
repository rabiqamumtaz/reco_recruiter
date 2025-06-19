"use client";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdWork, MdFeedback, MdClose } from "react-icons/md";
import { X } from "lucide-react";
import { ShieldUser } from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const navItems = [
    { path: "/dashboard", icon: MdDashboard, label: "Dashboard" },
    { path: "/job-listings", icon: MdWork, label: "Job Listings" },
    { path: "/feedback", icon: MdFeedback, label: "Feedback" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-semibold text-gray-900">reco</span>
          </div>
          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <div className=" flex gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              <ShieldUser />
              <span className="p-1">Recruitar Portal</span>
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                onClick={() => onClose()}
              >
                <item.icon className="mr-3" size={20} />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
