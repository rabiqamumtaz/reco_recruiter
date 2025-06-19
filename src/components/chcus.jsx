import { useState } from "react"
import { Upload, X, Plus, Paperclip, Download, Eye, Trash2 } from "lucide-react"
import SlideModal from "../components/SlideModal"
import { toast } from "react-toastify"
import api from "../axios"
 
const EditProfileForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() => ({
    name: initialData?.name || "",
    location: initialData?.location || "",
    title: initialData?.title || "",
    experienceLevel: initialData?.experienceLevel || "",
    aboutMe: initialData?.aboutMe || "",
    careerObjective: initialData?.careerObjective || "",
    keySkills: initialData?.skills || [],
    profileImage: initialData?.profileImage || null,
    resumes: initialData?.resumes || []
  }))
 
  const [skillInput, setSkillInput] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    file: null,
  })
 
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
 
  const addSkill = () => {
    if (skillInput.trim() && !formData.keySkills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        keySkills: [...prev.keySkills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }
 
  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      keySkills: prev.keySkills.filter((skill) => skill !== skillToRemove),
    }))
  }
 
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }
 
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file })) // Use File object
    }
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("location", formData.location);
      data.append("title", formData.title);
      data.append("experienceLevel", formData.experienceLevel);
      data.append("aboutMe", formData.aboutMe);
      data.append("careerObjective", formData.careerObjective);
 
      formData.keySkills.forEach(skill => {
        data.append("keySkills", skill);
      });
 
      if (formData.profileImage instanceof File) {
        data.append("picture", formData.profileImage);
      }
 
      if (formData.newResume instanceof File) {
        data.append("resume", formData.newResume);
        data.append("resumeTitle", formData.resumeTitle);
      }
 
      const response = await api.put("/candidates/candidate/profile/update", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
 
      toast.success("Profile updated successfully!");
     
      // Create updated profile data to pass back
      const updatedProfileData = {
        ...response.data,
        keySkills: formData.keySkills,
        resumes: formData.resumes,
        picture: formData.profileImage instanceof File ? URL.createObjectURL(formData.profileImage) : formData.profileImage
      };
     
      if (onSubmit) onSubmit(updatedProfileData);
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.error("Failed to update profile");
    }
  };
 
  const handleUploadResume = (resumeData) => {
    const newResume = {
      id: Date.now(),
      ...resumeData,
      lastUpdated: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      applications: 0,
    }
    setFormData(prev => ({
      ...prev,
      resumes: [...prev.resumes, newResume]
    }))
    setShowUploadModal(false)
    setUploadData({
      title: "",
      description: "",
      file: null,
    })
  }
 
  const handleDeleteResume = async (id) => {
    try {
      // If it's a new resume (only exists locally), just remove from state
      if (typeof id === 'number') {
        setFormData(prev => ({
          ...prev,
          resumes: prev.resumes.filter(resume => resume.id !== id)
        }))
        toast.success("Resume removed successfully!");
        return;
      }
 
      // If it's an existing resume from server, call API to delete
      await api.delete(`/candidates/candidate/resume/${id}`);
     
      setFormData(prev => ({
        ...prev,
        resumes: prev.resumes.filter(resume => resume.id !== id)
      }))
     
      toast.success("Resume deleted successfully!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Failed to delete resume");
    }
  }
 
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Profile Picture
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage instanceof File ? URL.createObjectURL(formData.profileImage) : formData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-semibold text-gray-600">
                  {formData.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>
            <div>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="profileImage"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-blue-300 rounded-xl text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </label>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG up to 5MB
              </p>
            </div>
          </div>
        </div>
 
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., San Francisco, CA"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Professional Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Full Stack Developer"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Experience Level
            </label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select experience level</option>
              <option value="Entry Level">Entry Level</option>
              <option value="1-2 Years Experience">1-2 Years Experience</option>
              <option value="3-5 Years Experience">3-5 Years Experience</option>
              <option value="5+ Years Experience">5+ Years Experience</option>
              <option value="10+ Years Experience">10+ Years Experience</option>
              <option value="Senior Level">Senior Level</option>
            </select>
          </div>
        </div>
 
        {/* About Me & Objective */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            About Me
          </label>
          <textarea
            value={formData.aboutMe}
            onChange={(e) => handleInputChange("aboutMe", e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Career Objective
          </label>
          <textarea
            value={formData.careerObjective}
            onChange={(e) => handleInputChange("careerObjective", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>
 
        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Key Skills
          </label>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a skill and press Enter"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.keySkills ? formData.keySkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            )) : null}
          </div>
        </div>
 
        {/* Resumes Section */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Resumes
          </label>
 
          {/* Existing Resumes */}
          {formData.resumes.length > 0 && (
            <div className="space-y-4 mb-6">
              {formData.resumes.map((resume) => (
                <div key={resume.id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{resume.title}</h3>
                      <p className="text-xs text-gray-500">Last updated: {new Date(resume.lastUpdated).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-500">Views: {resume.views || 0}</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this resume?')) {
                            handleDeleteResume(resume._id);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <Paperclip className="w-4 h-4 mr-2" />
                    <span>{resume.fileName}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
 
          {/* New Resume Upload */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              {formData.resumes.length > 0 ? 'Upload Another Resume' : 'Upload Resume'}
            </label>
           
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Resume Title</label>
                <input
                  type="text"
                  value={formData.resumeTitle || ''}
                  onChange={(e) => setFormData(prev => ({...prev, resumeTitle: e.target.value}))}
                  placeholder="e.g., Full Stack Developer Resume"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                />
              </div>
 
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your resume</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop your resume here, or click to browse files
                </p>
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setFormData(prev => ({
                        ...prev,
                        newResume: e.target.files[0],
                        resumeFileName: e.target.files[0].name
                      }));
                    }
                  }}
                />
                <label
                  htmlFor="resume-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </label>
                <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
                {formData.resumeFileName && (
                  <p className="text-sm text-green-600 mt-2 truncate max-w-full">
                    Selected: {formData.resumeFileName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
 
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
 
export default EditProfileForm
 
 