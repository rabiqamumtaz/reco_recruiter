"use client"

import { useState } from "react"
import { MdClose, MdKeyboardArrowDown } from "react-icons/md"

const SubmitCandidateModal = ({ isOpen, onClose, candidate, jobTitle, company }) => {
  const [selectedAccountManager, setSelectedAccountManager] = useState("Sarah Johnson")
  const [notes, setNotes] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)

  const accountManagers = ["Sarah Johnson", "Mike Chen", "Lisa Rodriguez", "John Martinez"]

  const handleSubmit = () => {
    console.log("Submitting candidate:", {
      candidate,
      accountManager: selectedAccountManager,
      notes,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-[50vw] min-w-[600px]">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Submit Candidate to Account Manager</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                  <MdClose size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              <p className="text-sm text-gray-600">
                Select Eva Martinez for {jobTitle} at {company}
              </p>

              {/* Candidate Summary */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Candidate Summary</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-gray-900">Eva Martinez</h4>
                  <p className="text-sm text-gray-600">eva.martinez@email.com</p>
                  <p className="text-sm text-gray-500">5+ years experience</p>
                </div>
              </div>

              {/* Account Manager Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Account Manager</label>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <span>{selectedAccountManager}</span>
                    <MdKeyboardArrowDown size={20} />
                  </button>

                  {showDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        <div className="py-1">
                          {accountManagers.map((manager) => (
                            <button
                              key={manager}
                              onClick={() => {
                                setSelectedAccountManager(manager)
                                setShowDropdown(false)
                              }}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 focus:outline-none"
                            >
                              {manager}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Notes for Account Manager</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any relevant notes about the candidate's qualifications, interview feedback, or special considerations..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none"
              >
                Submit Candidate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmitCandidateModal
