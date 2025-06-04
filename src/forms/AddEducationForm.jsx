import React, { useState } from 'react';

const AddEducationForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    startYear: '',
    endYear: '',
    current: false,
    gpa: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.institution.trim()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
        <input
          type="text"
          value={formData.degree}
          onChange={(e) => handleInputChange('degree', e.target.value)}
          placeholder="e.g., Bachelor of Science in Computer Science"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
        <input
          type="text"
          value={formData.institution}
          onChange={(e) => handleInputChange('institution', e.target.value)}
          placeholder="e.g., Stanford University"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="e.g., Stanford, CA"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
          <input
            type="number"
            value={formData.startYear}
            onChange={(e) => handleInputChange('startYear', e.target.value)}
            placeholder="2018"
            min="1950"
            max="2030"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
          <input
            type="number"
            value={formData.endYear}
            onChange={(e) => handleInputChange('endYear', e.target.value)}
            placeholder="2022"
            min="1950"
            max="2030"
            disabled={formData.current}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="currentEducation"
          checked={formData.current}
          onChange={(e) => handleInputChange('current', e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="currentEducation" className="ml-2 block text-sm text-gray-700">
          I currently study here
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
        <input
          type="text"
          value={formData.gpa}
          onChange={(e) => handleInputChange('gpa', e.target.value)}
          placeholder="e.g., 3.8/4.0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your studies, achievements, projects..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Education
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

export default AddEducationForm;