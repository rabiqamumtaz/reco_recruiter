import React, { useState } from 'react';

const SoftSkillsTab = ({ newSkills = [], onAdd }) => {
  const defaultSkills = [
    'Team Leadership',
    'Problem Solving',
    'Communication',
    'Time Management',
    'Critical Thinking',
    'Adaptability',
    'Creativity',
    'Teamwork',
    'Conflict Resolution',
    'Emotional Intelligence'
  ];

  const [skills, setSkills] = useState([...defaultSkills, ...newSkills.map(skill => skill.name)]);

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Soft Skills</h2>
          <p className="text-gray-600">Personal attributes that enable you to interact effectively with others</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Soft Skill</span>
        </button>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 group"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SoftSkillsTab;