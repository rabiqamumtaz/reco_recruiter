"use client"

import { useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { MdDownload, MdVisibility } from "react-icons/md"
import StatusDropdown from "../components/StatusDropdown"
import CandidateDetailModal from "../components/CandidateDetailModal"
import SubmitCandidateModal from "../components/SubmitCandidateModal"
// import AddCandidateModal from "../components/AddCandidateModal"
import { HiOutlineDocumentText } from "react-icons/hi"
import { FiPlusCircle } from "react-icons/fi"
import { MdVerified } from "react-icons/md"
import { BiSend } from "react-icons/bi"
import { useQuery } from "@tanstack/react-query"
import { fetchApplicationsByJobId } from "../apis/jobs"
import { formatDate } from "../utils/date"
import { Spin } from "antd"

const JobDetail = () => {
  const { id } = useParams()
  const { state: job } = useLocation()
   const { data: applications, isLoading, error } = useQuery({
    queryKey: ["applications", job._id],
    queryFn: ({ queryKey }) => fetchApplicationsByJobId(queryKey[1]),
    enabled: !!job._id,
  })

  const [showCandidateModal, setShowCandidateModal] = useState(false)
  const [addCandidateModal, setAddCandidateModal] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
// console.log(applications.length)
  const stats = [
    { title: "Total Applications", value: '5', icon: HiOutlineDocumentText, color: "bg-blue-500" },
    { title: "New", value: "1", icon: FiPlusCircle, color: "bg-green-500" },
    { title: "Qualified", value: "0", icon: MdVerified, color: "bg-purple-500" },
    { title: "Submitted", value: "0", icon: BiSend, color: "bg-orange-500" },
  ]

  const statusOptions = ["New", "Screening", "Qualified", "Rejected"]

  const handleStatusChange = (candidateId, newStatus) => {
    // You can extend this to update backend
    console.log(`Update ${candidateId} to status: ${newStatus}`)
  }

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate)
    setShowCandidateModal(true)
  }

 

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
        <p className="text-gray-600">
          {job?.client?.companyName} • {job?.applications} applications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Applications</h3>
          <button
            className="text-sm bg-blue-500 px-4 py-2 rounded-lg text-white"
            onClick={() => setAddCandidateModal(true)}
          >
            Add Candidate
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">Review and manage candidate applications for this position.</p>

        {isLoading ? (
          <div className="py-10 text-center">
            <Spin tip="Loading applications..." size="large" />
          </div>
        ) : error ? (
          <div className="py-10 text-center text-red-500">Failed to load applications. Please try again.</div>
        ) : applications?.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            <p>No applications have been submitted for this job yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Screening Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resume
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
  {Array.isArray(applications) &&
    applications.map((candidate) => (
      <tr key={candidate._id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div>
            <div className="font-medium text-gray-900">
              {candidate?.applicantId?.name || "N/A"}
            </div>
            <div className="text-sm text-gray-500">
              {candidate?.applicantId?.email || "N/A"}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(candidate.submittedDate)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="w-32">
            <StatusDropdown
              value={candidate.status}
              onChange={(newStatus) =>
                handleStatusChange(candidate._id, newStatus)
              }
              options={statusOptions}
            />
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
            <MdDownload size={16} />
            <span className="text-sm">Download</span>
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCandidateClick(candidate)}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 px-2 py-1 rounded border border-gray-300 hover:bg-gray-50"
            >
              <MdVisibility size={16} />
              <span className="text-sm">View</span>
            </button>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </td>
      </tr>
    ))}
</tbody>

            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <CandidateDetailModal
        isOpen={showCandidateModal}
        job={job}
        onClose={() => setShowCandidateModal(false)}
        candidate={selectedCandidate}
      />
      <SubmitCandidateModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        candidate={selectedCandidate}
        jobTitle={job.title}
        company={job?.client?.companyName}
      />
      {/* <AddCandidateModal
        jobId={job._id}
        isOpen={addCandidateModal}
        onClose={() => setAddCandidateModal(false)}
        jobTitle={job.title}
        company={job?.client?.companyName}
      /> */}
    </div>
  )
}

export default JobDetail
