// "use client"

// import { useState } from "react"
// import { MdMenu, MdSearch, MdAdd } from "react-icons/md"
// // import QuickActionsDropdown from "./QuickActionsDropdown"

// const Header = ({ onMenuClick }) => {
//   const [showQuickActions, setShowQuickActions] = useState(false)

//   return (
//     <header className="bg-white border-b border-gray-200 px-4 py-3">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <button onClick={onMenuClick} className="md:hidden text-gray-500 hover:text-gray-700">
//             <MdMenu size={24} />
//           </button>

//           {/* <div className="relative">
//             <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="Search Leads..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
//             />
//           </div> */}
//         </div>

//         <div className="relative">
//           <button
//             onClick={() => setShowQuickActions(!showQuickActions)}
//             className="flex items-center space-x-1 btn-primary"
//           >
//             <span className="text-xs sm:text-base md:text-xs">
//     <MdAdd />
//   </span>
//             <span className="text-clip text-xs">Quick Action</span>
//           </button>

//           {showQuickActions && <QuickActionsDropdown onClose={() => setShowQuickActions(false)} />}
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Header
