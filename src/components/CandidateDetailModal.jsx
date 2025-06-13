"use client"

import RightSideModal from "./RightSideModal"
import { MdDownload, MdEmail } from "react-icons/md"

const CandidateDetailModal = ({ isOpen, onClose, candidate }) => {
  if (!candidate) return null

  return (
    <RightSideModal isOpen={isOpen} onClose={onClose} title="Candidate Details">
      <div className="p-6 space-y-6 pb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Eva Martinez</h3>
          <p className="text-sm text-gray-600 mb-4">Candidate for DevOps Engineer</p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span>eva.martinez@email.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span>San Francisco, CA</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Years of Experience:</span>
              <span>5+ years</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {["Docker", "Kubernetes", "AWS", "Jenkins", "Python", "Terraform"].map((skill) => (
              <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Work Experience</h4>
          <div className="space-y-3">
            <div className="border-l-2 border-gray-200 pl-4">
              <h5 className="font-medium">Senior DevOps Engineer</h5>
              <p className="text-sm text-gray-600">TechCorp Solutions</p>
              <p className="text-xs text-gray-500">2021 - Present</p>
              <p className="text-sm mt-1">
                Led infrastructure automation and managed AWS environments for multiple applications.
              </p>
            </div>
            <div className="border-l-2 border-gray-200 pl-4">
              <h5 className="font-medium">DevOps Engineer</h5>
              <p className="text-sm text-gray-600">StartupXYZ</p>
              <p className="text-xs text-gray-500">2019 - 2021</p>
              <p className="text-sm mt-1">Implemented CI/CD pipelines and containerization strategies.</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">System Architecture</h4>
          <div className="bg-gray-50 p-3 rounded text-sm">
            <p className="text-gray-700">
              Experienced in designing and implementing scalable cloud infrastructure using microservices architecture.
              Proficient in container orchestration and automated deployment strategies.
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Education</h4>
          <div>
            <h5 className="font-medium">Bachelor of Science in Information Technology</h5>
            <p className="text-sm text-gray-600">University of Technology</p>
            <p className="text-xs text-gray-500">2015 - 2019</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Resume</h4>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <MdDownload size={16} />
              <span className="text-sm">Download</span>
            </button>
            <span className="text-sm text-gray-500">eva_martinez_resume.pdf</span>
          </div>
        </div>

        {/* <div className="pt-6 border-t border-gray-200 space-y-3">
          <button className="w-full btn-primary">Submit Candidate</button>
          <button className="w-full btn-secondary flex items-center justify-center space-x-2">
            <MdEmail size={16} />
            <span>Contact Candidate</span>
          </button>
        </div> */}
      </div>
    </RightSideModal>
  )
}

export default CandidateDetailModal
