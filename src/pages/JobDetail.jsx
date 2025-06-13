"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import { MdDownload, MdVisibility } from "react-icons/md"
import StatusDropdown from "../components/StatusDropdown"
import CandidateDetailModal from "../components/CandidateDetailModal"
import SubmitCandidateModal from "../components/SubmitCandidateModal"
import AddCandidateModal from "../components/AddCandidateModal"
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiPlusCircle } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { BiSend } from "react-icons/bi";





const JobDetail = () => {
  const { id } = useParams()
  const [showCandidateModal, setShowCandidateModal] = useState(false)
  const [addCandidateModal, setAddCandidateModal] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Eva Martinez",
      email: "eva.martinez@email.com",
      appliedDate: "May 28, 2025",
      status: "Qualified",
      resume: "eva_martinez_resume.pdf",
    },
  ])

  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const stats = [
    { title: "Total Applications", value: "1",icon:HiOutlineDocumentText, color: "bg-blue-500"  },
    { title: "New", value: "1",icon:FiPlusCircle , color: "bg-green-500" },
    { title: "Qualified", value: "0",icon:MdVerified, color: "bg-purple-500" },
    { title: "Submitted", value: "0",icon:BiSend , color: "bg-orange-500"},
  ]

  const statusOptions = ["New", "Screening", "Qualified", "Rejected"]

  const handleStatusChange = (candidateId, newStatus) => {
    setCandidates(
      candidates.map((candidate) => (candidate.id === candidateId ? { ...candidate, status: newStatus } : candidate)),
    )
  }

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate)
    setShowCandidateModal(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">DevOps Engineer</h1>
        <p className="text-gray-600">CloudTech Solutions • 1 applications</p>
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
                {/* <p className="text-xs text-gray-500">{stat.subtitle}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold ">Applications</h3>
            <button className="text-sm bg-blue-500 px-4 py-2 rounded-lg text-white" onClick={()=>{setAddCandidateModal(true)}}>Add Candidate</button>
        </div>
        <p className="text-sm text-gray-600 mb-4">Review and manage candidate applications for this position.</p>

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
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-32">
                      <StatusDropdown
                        value={candidate.status}
                        onChange={(newStatus) => handleStatusChange(candidate.id, newStatus)}
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
      </div>

      <CandidateDetailModal
        isOpen={showCandidateModal}
        onClose={() => setShowCandidateModal(false)}
        candidate={selectedCandidate}
      />
      <SubmitCandidateModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        candidate={selectedCandidate}
        jobTitle="DevOps Engineer"
        company="CloudTech Solutions"
      />
      <AddCandidateModal
        isOpen={addCandidateModal}
        onClose={() => setAddCandidateModal(false)}
        candidate={selectedCandidate}
        jobTitle="DevOps Engineer"
        company="CloudTech Solutions"
      />

    </div>
  )
}

export default JobDetail