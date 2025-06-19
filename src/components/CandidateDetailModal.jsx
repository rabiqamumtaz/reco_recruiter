"use client"

import { formatDate } from "../utils/date"
import RightSideModal from "./RightSideModal"
import { MdDownload, MdEmail } from "react-icons/md"

const CandidateDetailModal = ({ isOpen, onClose, candidate, job }) => {
  if (!candidate) return null

  const c = candidate?.applicantId

  return (
    <RightSideModal isOpen={isOpen} onClose={onClose} title="Candidate Details">
      <div className="p-6 space-y-6 pb-8">
        {/* Basic Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">{c?.name}</h3>
          <p className="text-sm text-gray-600 mb-4">Candidate for {job?.title}</p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span>{c?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span>{c?.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span>{c?.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Experience Level:</span>
              <span>{c?.experienceLevel}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="font-medium mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {c?.skills?.length > 0 ? (
              c.skills.map((skill, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {skill.skillName} ({skill.skillLevel})
                </span>
              ))
            ) : (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">No Skills</span>
            )}
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <h4 className="font-medium mb-2">Work Experience</h4>
          <div className="space-y-3">
            {c?.experiences?.length > 0 ? (
              c.experiences.map((exp, i) => (
                <div key={i} className="border-l-2 border-gray-200 pl-4">
                  <h5 className="font-medium">{exp?.jobTitle}</h5>
                  <p className="text-sm text-gray-600">{exp?.company}</p>
                  <p className="text-xs text-gray-500">
                    {formatDate(exp.startDate).split(",")[1]} - {formatDate(exp.endDate).split(",")[1]}
                  </p>
                  <p className="text-sm mt-1">{exp?.description}</p>
                </div>
              ))
            ) : (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">No Work Experience</span>
            )}
          </div>
        </div>

        {/* Education */}
        <div>
          <h4 className="font-medium mb-2">Education</h4>
          {c?.educations?.length > 0 ? (
            c.educations.map((edu, i) => (
              <div key={i} className="mb-3 border-l-2 border-gray-200 pl-4">
                <h5 className="font-medium">{edu.degree}</h5>
                <p className="text-sm text-gray-600">{edu.institute}</p>
                <p className="text-xs text-gray-500">
                  {formatDate(edu.startDate).split(",")[1]} - {formatDate(edu.endDate).split(",")[1]}
                </p>
                <p className="text-sm">{edu.description}</p>
              </div>
            ))
          ) : (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">No Education Info</span>
          )}
        </div>

        {/* Resume */}
        <div>
          <h4 className="font-medium mb-2">Resume</h4>
          {c?.resumes?.length > 0 ? (
            <div className="flex items-center space-x-2">
              <a
                href={c.resumes[0].filePath}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
              >
                <MdDownload size={16} />
                <span className="text-sm">Download</span>
              </a>
              <span className="text-sm text-gray-500">{c.resumes[0].fileName}</span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">No resume uploaded.</span>
          )}
        </div>

        {/* Certifications */}
        {c?.certifications?.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Certifications</h4>
            <div className="space-y-3">
              {c.certifications.map((cert, i) => (
                <div key={i} className="border-l-2 border-gray-200 pl-4">
                  <h5 className="font-medium">{cert.title}</h5>
                  <p className="text-sm text-gray-600">{cert.institution}</p>
                  <p className="text-xs text-gray-500">
                    Issued: {formatDate(cert.issueDate).split(",")[1]} • Expires: {formatDate(cert.expiryDate).split(",")[1]}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      View Credential
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optional buttons */}
        {/* 
        <div className="pt-6 border-t border-gray-200 space-y-3">
          <button className="w-full btn-primary">Submit Candidate</button>
          <button className="w-full btn-secondary flex items-center justify-center space-x-2">
            <MdEmail size={16} />
            <span>Contact Candidate</span>
          </button>
        </div>
        */}
      </div>
    </RightSideModal>
  )
}

export default CandidateDetailModal
