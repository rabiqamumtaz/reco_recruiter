import React from 'react';

const ApplicationSummary = () => {
  const stats = [
    { label: 'Total Applications', value: 12, color: 'text-green-600' },
    { label: 'Under Review', value: 5, color: 'text-blue-600' },
    { label: 'Interview Invites', value: 3, color: 'text-yellow-600' },
    { label: 'Rejected', value: 4, color: 'text-red-600' },
  ]

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Application Summary</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-sm font-medium text-gray-700">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApplicationSummary