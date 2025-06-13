import { useState } from "react"
import { MdWork, MdPeople, MdSend, MdThumbUp } from "react-icons/md"

const Dashboard = () => {
  const stats = [
    { title: "Active Jobs", value: "5", subtitle: "Currently posting", icon: MdWork, color: "bg-blue-500" },
    { title: "Total Applications", value: "6", subtitle: "All candidates", icon: MdPeople, color: "bg-green-500" },
    { title: "Submissions", value: "0", subtitle: "To account managers", icon: MdSend, color: "bg-purple-500" },
    { title: "Positive Feedback", value: "2", subtitle: "From clients", icon: MdThumbUp, color: "bg-orange-500" },
  ]
    
  const recentJobs = [
    { title: "DevOps Engineer", company: "CloudTech Solutions", status: "Active", applications: 5 },
    { title: "UX Designer", company: "Design Studio Pro", status: "Active", applications: 12 },
    { title: "Senior Software Engineer", company: "TechCorp Inc", status: "Active", applications: 8 },
    { title: "Product Manager", company: "Innovation Labs", status: "Active", applications: 15 },
    { title: "Data Scientist", company: "Analytics Corp", status: "Active", applications: 6 },
  ]
  
  const urgentDeadlines = [
    { title: "Marketing Manager", company: "Creative USA", deadline: "Today" },
    { title: "Product Manager", company: "Innovation Labs", deadline: "Tomorrow" },
  ]

  const quickStats = [
    { label: "Jobs This Month", value: "5" },
    { label: "Applications This Week", value: "3" },
    { label: "Avg. Response Time", value: "2.1 days" },
    { label: "Success Rate", value: "20%" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recruiter Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your recruitment activities.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Job Listings */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recent Job Listings</h3>
          <div className="space-y-3">
            {recentJobs.map((job, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                    {job.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{job.applications} applications</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Deadlines */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Urgent Deadlines</h3>
          <div className="space-y-3">
            {urgentDeadlines.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.company}</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {item.deadline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Submission Rate</span>
                <span>65%</span>
              </div>
              <div className="mt-1 progress-bar">
                <div className="progress-fill bg-blue-500" style={{ width: "65%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Positive Feedback Rate</span>
                <span>80%</span>
              </div>
              <div className="mt-1 progress-bar">
                <div className="progress-fill bg-green-500" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>Job Fill Rate</span>
                <span>45%</span>
              </div>
              <div className="mt-1 progress-bar">
                <div className="progress-fill bg-orange-500" style={{ width: "45%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span className="text-lg font-bold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>   
    </div>
  )
}

export default Dashboard
