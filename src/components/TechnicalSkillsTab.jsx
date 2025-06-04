import React from 'react';

const TechnicalSkillsTab = ({ newSkills = [], onAdd }) => {
  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );

  const defaultSkillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 'Expert', progress: 90 },
        { name: 'TypeScript', level: 'Expert', progress: 90 },
        { name: 'Python', level: 'Advanced', progress: 75 },
        { name: 'Java', level: 'Advanced', progress: 70 }
      ]
    },
    {
      title: 'Frameworks & Libraries',
      skills: [
        { name: 'React', level: 'Expert', progress: 95 },
        { name: 'Next.js', level: 'Expert', progress: 90 },
        { name: 'Next.js', level: 'Advanced', progress: 75 },
        { name: 'Express', level: 'Advanced', progress: 80 }
      ]
    },
    {
      title: 'Databases',
      skills: [
        { name: 'MongoDB', level: 'Advanced', progress: 80 },
        { name: 'PostgreSQL', level: 'Advanced', progress: 75 },
        { name: 'MySQL', level: 'Intermediate', progress: 60 }
      ]
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Git', level: 'Expert', progress: 95 },
        { name: 'Docker', level: 'Advanced', progress: 75 },
        { name: 'AWS', level: 'Advanced', progress: 70 },
        { name: 'CI/CD', level: 'Advanced', progress: 75 }
      ]
    }
  ];

  // Add new skills to appropriate categories
  const skillCategories = [...defaultSkillCategories];
  newSkills.forEach(skill => {
    const categoryIndex = skillCategories.findIndex(cat => cat.title === skill.category);
    if (categoryIndex !== -1) {
      const progress = skill.level === 'Expert' ? 90 : skill.level === 'Advanced' ? 75 : skill.level === 'Intermediate' ? 60 : 40;
      skillCategories[categoryIndex].skills.push({
        name: skill.name,
        level: skill.level,
        progress
      });
    }
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'bg-green-100 text-green-800';
      case 'Advanced':
        return 'bg-blue-100 text-blue-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="flex space-x-3">
        <input
          type="text"
          placeholder="Search skills..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button className="px-6 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          Search
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
              <button 
                onClick={onAdd}
                className="text-gray-400 hover:text-gray-600"
              >
                <PlusIcon />
              </button>
            </div>
            
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-black h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSkillsTab;