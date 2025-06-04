import React, { useState } from 'react';

const AddSkillForm = ({ onSubmit, onCancel, type = 'technical' }) => {
  const [formData, setFormData] = useState({
    name: '',
    level: 'Beginner',
    category: type === 'technical' ? 'Programming Languages' : ''
  });

  const technicalCategories = [
    'Programming Languages',
    'Frameworks & Libraries',
    'Databases',
    'DevOps & Tools',
    'Cloud Platforms',
    'Mobile Development'
  ];

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
      setFormData({ name: '', level: 'Beginner', category: type === 'technical' ? 'Programming Languages' : '' });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {type === 'technical' ? 'Skill Name' : type === 'soft' ? 'Soft Skill' : 'Language'}
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder={type === 'technical' ? 'e.g., JavaScript, React, Python' : type === 'soft' ? 'e.g., Leadership, Communication' : 'e.g., English, Spanish'}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {type === 'technical' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {technicalCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      )}

      {(type === 'technical' || type === 'language') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {type === 'language' ? 'Proficiency Level' : 'Skill Level'}
          </label>
          <select
            value={formData.level}
            onChange={(e) => handleInputChange('level', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {type === 'language' ? 
              ['Beginner', 'Intermediate', 'Advanced', 'Native'].map(level => (
                <option key={level} value={level}>{level}</option>
              )) :
              skillLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))
            }
          </select>
        </div>
      )}

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add {type === 'technical' ? 'Skill' : type === 'soft' ? 'Soft Skill' : 'Language'}
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

export default AddSkillForm;