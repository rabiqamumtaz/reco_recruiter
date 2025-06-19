"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdVisibility, MdShare, MdMoreVert } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import JobPostingModal from "../components/JobPostingModal";
import JobDetailsModal from "../components/JobDetailsModal";
import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../apis/jobs";
import { formatDate } from "../utils/date";

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  const {
    data: jobs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  const navigate = useNavigate();
  const [showJobPostingModal, setShowJobPostingModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`, { state: selectedJob });
  };

  const handleShareClick = (job) => {
    setSelectedJob(job);
    setShowJobPostingModal(true);
  };

  const featuredJobs = [
    {
      id: 1,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      applications: 5,
      deadline: "Jun 15, 2024",
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studio Pro",
      applications: 8,
      deadline: "Jun 20, 2024",
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "Tech Innovations",
      applications: 14,
      deadline: "Jun 25, 2024",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    const term = searchTerm.toLowerCase().trim();
    const titleMatch = job.title?.toLowerCase().includes(term);
    const clientMatch = job.client?.companyName?.toLowerCase().includes(term);
    const statusMatch = job.status?.toLowerCase().includes(term);
    return titleMatch || clientMatch || statusMatch;
  });

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Approved Job Listings
        </h1>
        <p className="text-gray-600">
          Manage your approved job listings and track applications.
        </p>
      </div>

      {/* Featured Jobs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredJobs.map((job) => (
          <div
            onClick={() => handleJobClick(job.id)}
            key={job.id}
            className="card cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Deadline: {job.deadline}</span>
              <span>{job.applications} applications</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                2 days left
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* All Job Listings Table */}
      <div className="card">
        <div className="mb-4 flex justify-between flex-wrap items-center gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Job Listings
            </h2>
            <p className="text-sm text-gray-600">
              Complete list of your approved job listings
            </p>
          </div>

          <div className="relative w-full sm:w-auto">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <CiSearch className="text-gray-500 text-xl" />
            </span>
            <input
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                {[
                  "Job Title",
                  "Client Name",
                  "Status",
                  "Submission Deadline",
                  "Applications",
                  "Actions",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!isLoading &&
                paginatedJobs.map((job) => (
                  <tr
                    key={job.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewJob(job);
                    }}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-3 text-sm text-gray-900 font-medium">
                      {job?.title}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {job?.client?.companyName}
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {formatDate(job.deadline)}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-500">
                      {job?.applications}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewJob(job);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <MdVisibility size={18} />
                        </button>
                        <button
                          onClick={() => handleShareClick(job)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <MdShare size={18} />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MdMoreVert size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <JobDetailsModal
        goToCandidate={handleJobClick}
        isOpen={isModalOpen}
        onClose={closeModal}
        job={selectedJob}
      />
      <JobPostingModal
        isOpen={showJobPostingModal}
        onClose={() => setShowJobPostingModal(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobListings;

//  const allJobs = [
//   {
//     id: 101,
//     title: "Senior React Developer",
//     company: "InnovateTech",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     salary: "$130,000 - $160,000",
//     status: "new",
//     postedDate: "2 days ago",
//     deadline: "2025-07-11", // Approximately 1 month from postedDate
//     remote: true,
//     skills: ["React", "TypeScript", "GraphQL", "Node.js", "AWS"],
//     description:
//       "Join our innovative team as a Senior React Developer. You'll be working on cutting-edge web applications that serve millions of users worldwide. We're looking for someone passionate about creating exceptional user experiences.",
//     requirements: [
//       "5+ years of React development experience",
//       "Strong TypeScript and JavaScript skills",
//       "Experience with GraphQL and REST APIs",
//       "Knowledge of modern frontend build tools",
//       "Experience with testing frameworks (Jest, React Testing Library)",
//     ],
//     companyInfo: {
//       name: "InnovateTech",
//       industry: "Technology",
//       size: "200-500 employees",
//       description:
//         "InnovateTech is a fast-growing technology company focused on building the next generation of web applications. We value innovation, collaboration, and continuous learning.",
//     },
//     applications: 6,
//   },
//   {
//     id: 102,
//     title: "Full Stack Engineer",
//     company: "CloudSolutions",
//     location: "Remote",
//     type: "Full-time",
//     salary: "$110,000 - $140,000",
//     status: "urgent",
//     postedDate: "1 day ago",
//     deadline: "2025-07-04", // Approximately 3 weeks from postedDate
//     applications: 6,
//     remote: true,
//     skills: ["React", "Node.js", "Python", "PostgreSQL", "Docker"],
//     description:
//       "We're seeking a talented Full Stack Engineer to join our remote team. You'll work on both frontend and backend systems, contributing to our cloud-based solutions.",
//     requirements: [
//       "4+ years of full-stack development experience",
//       "Proficiency in React and Node.js",
//       "Experience with Python and PostgreSQL",
//       "Knowledge of cloud platforms (AWS, GCP, or Azure)",
//       "Strong problem-solving skills",
//     ],
//     companyInfo: {
//       name: "CloudSolutions",
//       industry: "Cloud Computing",
//       size: "100-200 employees",
//       description:
//         "CloudSolutions provides enterprise cloud infrastructure and services to businesses worldwide.",
//     },
//   },
//   {
//     id: 103,
//     title: "Frontend Developer",
//     company: "DesignStudio",
//     location: "New York, NY",
//     applications: 6,
//     type: "Full-time",
//     salary: "$90,000 - $120,000",
//     status: "new",
//     postedDate: "3 days ago",
//     deadline: "2025-07-13", // Approximately 1 month from postedDate
//     remote: false,
//     skills: ["React", "Vue.js", "CSS", "JavaScript", "Figma"],
//     description:
//       "Join our creative team as a Frontend Developer. You'll work closely with designers to bring beautiful, responsive designs to life.",
//     requirements: [
//       "3+ years of frontend development experience",
//       "Strong CSS and JavaScript skills",
//       "Experience with React or Vue.js",
//       "Understanding of responsive design principles",
//       "Familiarity with design tools like Figma",
//     ],
//     companyInfo: {
//       name: "DesignStudio",
//       industry: "Design & Creative",
//       size: "50-100 employees",
//       description:
//         "DesignStudio is a creative agency specializing in digital design and user experience.",
//     },
//   },
//   {
//     id: 104,
//     title: "Backend Engineer",
//     company: "DataFlow",
//     applications: 6,
//     location: "Austin, TX",
//     type: "Full-time",
//     salary: "$120,000 - $150,000",
//     status: "new",
//     postedDate: "1 week ago",
//     deadline: "2025-07-18", // Approximately 1 month from postedDate
//     remote: true,
//     skills: ["Python", "Django", "PostgreSQL", "Redis", "Kubernetes"],
//     description:
//       "We're looking for a Backend Engineer to help build and scale our data processing infrastructure. You'll work with large datasets and high-performance systems.",
//     requirements: [
//       "4+ years of backend development experience",
//       "Strong Python and Django skills",
//       "Experience with databases and caching systems",
//       "Knowledge of containerization and orchestration",
//       "Experience with data processing pipelines",
//     ],
//     companyInfo: {
//       name: "DataFlow",
//       industry: "Data Analytics",
//       size: "100-200 employees",
//       description:
//         "DataFlow specializes in real-time data processing and analytics solutions for enterprise clients.",
//     },
//   },
//   {
//     id: 105,
//     title: "DevOps Engineer",
//     company: "ScaleTech",
//     applications: 6,
//     location: "Seattle, WA",
//     type: "Full-time",
//     salary: "$140,000 - $170,000",
//     status: "urgent",
//     postedDate: "4 days ago",
//     deadline: "2025-07-06", // Approximately 3 weeks from postedDate
//     remote: true,
//     skills: ["AWS", "Kubernetes", "Terraform", "Docker", "Python"],
//     description:
//       "Join our DevOps team to help build and maintain our cloud infrastructure. You'll work on automation, monitoring, and scaling our systems.",
//     requirements: [
//       "5+ years of DevOps/Infrastructure experience",
//       "Strong AWS and Kubernetes knowledge",
//       "Experience with Infrastructure as Code (Terraform)",
//       "Proficiency in scripting languages (Python, Bash)",
//       "Experience with CI/CD pipelines",
//     ],
//     companyInfo: {
//       name: "ScaleTech",
//       industry: "Technology",
//       size: "500+ employees",
//       description:
//         "ScaleTech provides scalable technology solutions for enterprise clients worldwide.",
//     },
//   },
// ];
