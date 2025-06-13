"use client"

import { MdClose } from "react-icons/md"

const RightSideModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-full sm:max-w-md md:max-w-lg lg:max-w-[50vw] lg:min-w-[700px] ">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                  <MdClose size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSideModal
