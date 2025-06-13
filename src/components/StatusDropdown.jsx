"use client"

import { useState, useRef, useEffect } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

const StatusDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState({})
  const buttonRef = useRef(null)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-black text-white"
      case "screening":
        return "bg-blue-500 text-white"
      case "qualified":
        return "bg-green-500 text-white"
      case "rejected":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const dropdownHeight = options.length * 40 + 8 // Approximate height
      const viewportHeight = window.innerHeight
      
      // Check if there's enough space below
      const spaceBelow = viewportHeight - rect.bottom
      const shouldShowAbove = spaceBelow < dropdownHeight && rect.top > dropdownHeight

      setDropdownStyle({
        position: 'fixed',
        left: rect.left,
        top: shouldShowAbove ? rect.top - dropdownHeight : rect.bottom + 2,
        width: rect.width,
        zIndex: 9999
      })
    }
  }, [isOpen, options.length])

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-1 rounded-full text-xs font-medium flex items-center justify-between ${getStatusColor(value)} hover:opacity-90 transition-opacity`}
      >
        <span>{value}</span>
        <MdKeyboardArrowDown size={14} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div 
            className="bg-white border border-gray-200 rounded-md shadow-lg"
            style={dropdownStyle}
          >
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center"
                >
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(option)}`}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default StatusDropdown