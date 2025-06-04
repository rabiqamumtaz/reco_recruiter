import React from 'react';

const ExperienceTab = ({ newExperiences = [], onAdd }) => {
  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );

  const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );

  const defaultExperiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      skills: ['React', 'TypeScript']
    },
    {
      title: 'Full Stack Developer',
      company: 'InnovateSoft',
      period: 'Mar 2020 - Dec 2022 • Remote',
      skills: ['React', 'TypeScript']
    }
  ];

  const allExperiences = [...defaultExperiences, ...newExperiences];

  const formatPeriod = (experience) => {
    if (experience.period) return experience.period;
    if (experience.startDate || experience.endDate) {
      const start = experience.startDate ? new Date(experience.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
      const end = experience.current ? 'Present' : (experience.endDate ? new Date(experience.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '');
      const location = experience.location ? ` • ${experience.location}` : '';
      return `${start} - ${end}${location}`;
    }
    return '';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
        <button 
          onClick={onAdd}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <PlusIcon />
          <span>Add Experience</span>
        </button>
      </div>

      <div className="space-y-8">
        {allExperiences.map((exp, index) => (
          <div key={index} className="pb-8 border-b border-gray-200 last:border-b-0">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
                {formatPeriod(exp) && (
                  <p className="text-sm text-gray-500 mb-4">{formatPeriod(exp)}</p>
                )}
                {exp.description && (
                  <p className="text-sm text-gray-600 mb-4">{exp.description}</p>
                )}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <EditIcon />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(exp.skills || []).map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTab;