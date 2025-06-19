// "use client"

// import { useState } from "react"
// import Sidebar from "./Sidebar"
// // import Header from "./Header"

// const Layout = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* <Header onMenuClick={() => setIsSidebarOpen(true)} /> */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
//       </div>
//     </div>
//   )
// }

// export default Layout

"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react"; // or any icon

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header with Toggle Button */}
        <div className="md:hidden p-4 bg-white border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Recruiter Portal</h1>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
