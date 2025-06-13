"use client"

import { useState } from "react"
import { MdClose, MdAdd, MdDelete, MdUpload } from "react-icons/md"

const AddCandidateModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        location: "",
        yearsOfExperience: "",
        skills: [],
        resume: null,
    })

    const [experiences, setExperiences] = useState([
        {
            id: "1",
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
            current: false,
        },
    ])

    const [education, setEducation] = useState([
        {
            id: "1",
            degree: "",
            institution: "",
            startDate: "",
            endDate: "",
        },
    ])

    const [newSkill, setNewSkill] = useState("")

    const addSkill = () => {
        if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()],
            }))
            setNewSkill("")
        }
    }

    const removeSkill = (skillToRemove) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }))
    }

    const addExperience = () => {
        const newExp = {
            id: Date.now().toString(),
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
            current: false,
        }
        setExperiences((prev) => [...prev, newExp])
    }

    const removeExperience = (id) => {
        setExperiences((prev) => prev.filter((exp) => exp.id !== id))
    }

    const updateExperience = (id, field, value) => {
        setExperiences((prev) => prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
    }

    const addEducation = () => {
        const newEdu = {
            id: Date.now().toString(),
            degree: "",
            institution: "",
            startDate: "",
            endDate: "",
        }
        setEducation((prev) => [...prev, newEdu])
    }

    const removeEducation = (id) => {
        setEducation((prev) => prev.filter((edu) => edu.id !== id))
    }

    const updateEducation = (id, field, value) => {
        setEducation((prev) => prev.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
    }

    const handleFileUpload = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setFormData((prev) => ({ ...prev, resume: file }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Adding candidate:", { formData, experiences, education })
        // Handle form submission here
        onClose()
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addSkill()
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

            <div className="fixed inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-4xl">
                    <div className="h-full flex flex-col bg-white shadow-xl">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-medium text-gray-900">Add New Candidate</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                                    <MdClose size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">Fill in the candidate's information below</p>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                                {/* Basic Information */}
                                <div className="bg-white border border-gray-200 rounded-lg">
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                                    </div>
                                    <div className="px-4 py-4 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Email *
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                                    placeholder="eva.martinez@email.com"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                                    placeholder="+1 (555) 123-4567"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                    Location *
                                                </label>
                                                <input
                                                    id="location"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                                                    placeholder="San Francisco, CA"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                                                    Years of Experience *
                                                </label>
                                                <select
                                                    id="experience"
                                                    value={formData.yearsOfExperience}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, yearsOfExperience: e.target.value }))}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                    required
                                                >
                                                    <option value="">Select experience</option>
                                                    <option value="0-1">0-1 years</option>
                                                    <option value="1-3">1-3 years</option>
                                                    <option value="3-5">3-5 years</option>
                                                    <option value="5+">5+ years</option>
                                                    <option value="10+">10+ years</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="bg-white border border-gray-200 rounded-lg">
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                                    </div>
                                    <div className="px-4 py-4 space-y-4">
                                        <div className="flex gap-2">
                                            <input
                                                value={newSkill}
                                                onChange={(e) => setNewSkill(e.target.value)}
                                                placeholder="Add a skill"
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                onKeyPress={handleKeyPress}
                                            />
                                            <button
                                                type="button"
                                                onClick={addSkill}
                                                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <MdAdd size={20} />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                                >
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSkill(skill)}
                                                        className="ml-2 hover:text-red-600 transition-colors duration-200"
                                                    >
                                                        <MdClose size={14} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Work Experience */}
                                <div className="bg-white border border-gray-200 rounded-lg">
                                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
                                        <button
                                            type="button"
                                            onClick={addExperience}
                                            className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <MdAdd size={16} />
                                            Add Experience
                                        </button>
                                    </div>
                                    <div className="px-4 py-4 space-y-6">
                                        {experiences.map((exp, index) => (
                                            <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                                                    {experiences.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeExperience(exp.id)}
                                                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                                                        >
                                                            <MdDelete size={16} className="text-gray-500" />
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">Job Title *</label>
                                                        <input
                                                            value={exp.title}
                                                            onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                                                            placeholder="Senior DevOps Engineer"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">Company *</label>
                                                        <input
                                                            value={exp.company}
                                                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                                            placeholder="TechCorp Solutions"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                                                        <input
                                                            type="date"
                                                            value={exp.startDate}
                                                            onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                                                        <input
                                                            type="date"
                                                            value={exp.endDate}
                                                            onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            disabled={exp.current}
                                                        />
                                                        <div className="flex items-center space-x-2 mt-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`current-${exp.id}`}
                                                                checked={exp.current}
                                                                onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                                                                Currently working here
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                                    <textarea
                                                        value={exp.description}
                                                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                                        placeholder="Led infrastructure automation and managed AWS environments for multiple applications."
                                                        rows={3}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="bg-white border border-gray-200 rounded-lg">
                                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900">Education</h3>
                                        <button
                                            type="button"
                                            onClick={addEducation}
                                            className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <MdAdd size={16} />
                                            Add Education
                                        </button>
                                    </div>
                                    <div className="px-4 py-4 space-y-6">
                                        {education.map((edu, index) => (
                                            <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                                                    {education.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeEducation(edu.id)}
                                                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                                                        >
                                                            <MdDelete size={16} className="text-gray-500" />
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">Degree *</label>
                                                        <input
                                                            value={edu.degree}
                                                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                                                            placeholder="Bachelor of Science in Information Technology"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">Institution *</label>
                                                        <input
                                                            value={edu.institution}
                                                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                                                            placeholder="University of Technology"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                                                        <input
                                                            type="date"
                                                            value={edu.startDate}
                                                            onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">End Date *</label>
                                                        <input
                                                            type="date"
                                                            value={edu.endDate}
                                                            onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Resume Upload */}
                                <div className="bg-white border border-gray-200 rounded-lg">
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">Resume</h3>
                                    </div>
                                    <div className="px-4 py-4">
                                        <div className="space-y-4">
                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                                                <MdUpload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                                <div className="space-y-2">
                                                    <label
                                                        htmlFor="resume"
                                                        className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                                                    >
                                                        Click to upload resume
                                                    </label>
                                                    <p className="text-sm text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                                                    <input
                                                        id="resume"
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={handleFileUpload}
                                                        className="hidden"
                                                    />
                                                </div>
                                            </div>
                                            {formData.resume && (
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <span className="text-sm font-medium text-gray-900">{formData.resume.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData((prev) => ({ ...prev, resume: null }))}
                                                        className="p-1 hover:bg-gray-200 rounded transition-colors duration-200"
                                                    >
                                                        <MdClose size={16} className="text-gray-500" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* linkedin Url */}
                                <div className="bg-white border border-gray-200 rounded-lg">
                                    <div className="px-4 py-3 border-b border-gray-200">
                                        <h3 className="text-lg font-medium text-gray-900">LinkedIn Url</h3>
                                    </div>
                                    <div className="px-4 py-4">
                                        <div className="space-y-4">
                                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    LinkedIn Url
                                                </label>
                                                <input
                                                    id="Url"
                                                    type="Url"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                                    placeholder="Linkedin/joe/profile"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    required
                                                />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <button
                                onClick={onClose}
                                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="w-full sm:w-auto px-6 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Add Candidate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCandidateModal
