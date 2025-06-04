import React from 'react';

const ResumeViewHistory = () => {
  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  );

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );

  const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );

  const viewHistory = [
    {
      company: 'TechGlobal Inc.',
      position: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      views: 3,
      duration: '4 minutes',
      timestamp: 'May 23, 2025, 07:30 PM',
      daysAgo: '3 days ago',
      viewedBy: 'Michael Chen (Senior Recruiter)'
    },
    {
      company: 'InnovateSoft',
      position: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      views: 3,
      duration: '4 minutes',
      timestamp: 'May 23, 2025, 07:30 PM',
      daysAgo: '3 days ago',
      viewedBy: 'Michael Chen (Senior Recruiter)'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Resume View History</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <option>View All</option>
            </select>
            <ChevronDownIcon />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <SearchIcon />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium">
          Timeline View
        </button>
      </div>

      <div className="space-y-6">
        {viewHistory.map((item, index) => (
          <div key={index} className="flex items-start space-x-4 pb-6 border-b border-gray-200 last:border-b-0">
            <div className="w-16 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.company}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.position}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                    <div className="flex items-center">
                      <MapPinIcon />
                      <span className="ml-1">{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <EyeIcon />
                      <span className="ml-1">{item.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon />
                      <span className="ml-1">{item.duration}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Viewed by {item.viewedBy}</p>
                </div>
                <div className="text-right text-xs text-gray-500">
                  <p>{item.timestamp}</p>
                  <p>{item.daysAgo}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeViewHistory;