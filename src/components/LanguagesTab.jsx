import React from 'react';

const LanguagesTab = ({ newSkills = [], onAdd }) => {
  const defaultLanguages = [
    { name: 'English', level: 'Native', progress: 100, color: 'bg-green-100 text-green-800' },
    { name: 'Spanish', level: 'Advanced', progress: 80, color: 'bg-blue-100 text-blue-800' },
    { name: 'French', level: 'Intermediate', progress: 60, color: 'bg-yellow-100 text-yellow-800' }
  ];

  // Add new languages
  const newLanguages = newSkills.map(skill => {
    const progress = skill.level === 'Native' ? 100 : skill.level === 'Advanced' ? 80 : skill.level === 'Intermediate' ? 60 : 40;
    const color = skill.level === 'Native' ? 'bg-green-100 text-green-800' : 
                  skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800';
    return {
      name: skill.name,
      level: skill.level,
      progress,
      color
    };
  });

  const languages = [...defaultLanguages, ...newLanguages];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Languages</h2>
          <p className="text-gray-600">Languages you can communicate in</p>
        </div>
        <button 
          onClick={onAdd}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Add Language</span>
        </button>
      </div>
      
      <div className="space-y-6">
        {languages.map((language, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">{language.name}</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${language.color}`}>
                {language.level}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{ width: `${language.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesTab;