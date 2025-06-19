"use client";

import { useState } from "react";
import { MdWork, MdPeople, MdSend, MdThumbUp } from "react-icons/md";
import { Users, Database, TrendingUp, Activity, Settings } from "lucide-react";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [drawerType, setDrawerType] = useState(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const stats = [
    {
      title: "Active Jobs",
      value: "5",
      subtitle: "Currently posting",
      icon: MdWork,
      color: "text-[#78c5d8]",
    },
    {
      title: "Total Applications",
      value: "6",
      subtitle: "All candidates",
      icon: MdPeople,
      color: "text-[#f0b484]",
    },
    {
      title: "Submissions",
      value: "0",
      subtitle: "To account managers",
      icon: MdSend,
      color: "text-[#73b386]",
    },
    {
      title: "Positive Feedback",
      value: "2",
      subtitle: "From clients",
      icon: MdThumbUp,
      color: "text-[#a98fc3]",
    },
  ];

  const recentJobs = [
    {
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      status: "Active",
      applications: 5,
    },
    {
      title: "UX Designer",
      company: "Design Studio Pro",
      status: "Active",
      applications: 12,
    },
    {
      title: "Senior Software Engineer",
      company: "TechCorp Inc",
      status: "Active",
      applications: 8,
    },
    {
      title: "Product Manager",
      company: "Innovation Labs",
      status: "Active",
      applications: 15,
    },
    {
      title: "Data Scientist",
      company: "Analytics Corp",
      status: "Active",
      applications: 6,
    },
  ];

  const urgentDeadlines = [
    { title: "Marketing Manager", company: "Creative USA", deadline: "Today" },
    {
      title: "Product Manager",
      company: "Innovation Labs",
      deadline: "Tomorrow",
    },
  ];

  const quickStats = [
    { label: "Jobs This Month", value: "5" },
    { label: "Applications This Week", value: "3" },
    { label: "Avg. Response Time", value: "2.1 days" },
    { label: "Success Rate", value: "20%" },
  ];

  const metrics = [
    { label: "Submission Rate", value: 65, color: "bg-blue-500" },
    { label: "Positive Feedback Rate", value: 80, color: "bg-green-500" },
    { label: "Job Fill Rate", value: 45, color: "bg-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Recruiter Dashboard
            </h1>
            <p className="text-sm text-gray-600">
              Welcome back! Here's an overview of your recruitment activities.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 text-sm"
            >
              <Settings className="w-4 h-4" />
              Quick Actions
            </button>

            {isDropdownOpen && (
              <div className="absolute z-50 mt-2 w-56 sm:right-0 bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="py-2 text-sm text-gray-700">
                  <p className="px-4 py-2 font-semibold text-gray-900">
                    Quick Actions
                  </p>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setDrawerType("createUser")}
                  >
                    <Users className="w-4 h-4" /> Create New User
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setDrawerType("systemBackup")}
                  >
                    <Database className="w-4 h-4" /> System Backup
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Export Platform Data
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    onClick={() => setIsAnalyticsOpen(true)}
                  >
                    <Activity className="w-4 h-4" /> View Analytics
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white text-gray-900 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm opacity-70 mb-1">{stat.title}</p>
                    <p className="text-xl sm:text-2xl font-bold">
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Job Listings & Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Recent Jobs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Job Listings
              </h3>
              <p className="text-sm text-gray-600">
                Latest roles you're actively hiring for
              </p>
            </div>
            <div className="space-y-4">
              {recentJobs.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 rounded-lg bg-gray-50 shadow-sm p-3 hover:shadow-md transition"
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-gray-900">
                      {job.title}
                    </p>
                    <p className="text-xs text-gray-500">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                      {job.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {job.applications} applications
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Urgent Deadlines */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Urgent Deadlines
              </h3>
              <p className="text-sm text-gray-600">
                Upcoming job deadlines requiring immediate attention
              </p>
            </div>
            <div className="space-y-2">
              {urgentDeadlines.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600">{item.company}</p>
                  </div>
                  <span className="text-xs font-medium bg-red-100 text-red-800 px-3 py-1 rounded-full">
                    {item.deadline}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Performance Metrics
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Metrics based on recent recruiting activity
            </p>
            <div className="space-y-4">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{metric.label}</span>
                    <span>{metric.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${metric.color} h-2 rounded-full transition-all`}
                      style={{ width: `${metric.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Stats
              </h3>
              <p className="text-sm text-gray-600">
                Key metrics and performance indicators
              </p>
            </div>
            <div className="space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">{stat.label}</span>
                  <span className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
