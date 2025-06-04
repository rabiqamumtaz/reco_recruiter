import React, { useState } from 'react';

const EditProfileForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    location: 'San Francisco, CA',
    title: 'Full Stack Developer',
    experience: '5+ Years Experience',
    aboutMe: 'Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Looking for challenging opportunities to leverage my skills in a forward-thinking company.',
    careerObjective: 'Seeking a Senior Developer position where I can utilize my technical expertise and leadership skills to drive innovation and deliver exceptional software solutions.',
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Python'],
    profileImage: null
  });

  const [skillInput, setSkillInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, profileImage: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture</label>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {formData.profileImage ? (
              <img src={formData.profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-semibold text-gray-600">
                {formData.fullName.split(' ').map(n => n[0]).join('')}
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
              className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Upload Photo
            </label>
          </div>
        </div>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="e.g., San Francisco, CA"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Professional Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Full Stack Developer"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
        <select
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Entry Level">Entry Level</option>
          <option value="1-2 Years Experience">1-2 Years Experience</option>
          <option value="3-5 Years Experience">3-5 Years Experience</option>
          <option value="5+ Years Experience">5+ Years Experience</option>
          <option value="10+ Years Experience">10+ Years Experience</option>
          <option value="Senior Level">Senior Level</option>
        </select>
      </div>

      {/* About Me */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">About Me</label>
        <textarea
          value={formData.aboutMe}
          onChange={(e) => handleInputChange('aboutMe', e.target.value)}
          placeholder="Tell us about yourself, your experience, and what makes you unique..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Career Objective */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Career Objective</label>
        <textarea
          value={formData.careerObjective}
          onChange={(e) => handleInputChange('careerObjective', e.target.value)}
          placeholder="Describe your career goals and what you're looking for in your next role..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Key Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Key Skills</label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a skill and press Enter"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex space-x-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;