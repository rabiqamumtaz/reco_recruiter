import React from 'react';

const EducationTab = ({ newEducation = [], onAdd }) => {
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

  const defaultEducation = [
    {
      institution: 'Stanford University',
      period: '2018 - 2020',
      description: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with honors. GPA: 3.8/4.0'
    },
    {
      degree: 'Bachelor of Science in Computer Engineering',
      institution: 'University of California, Berkeley',
      period: '2014 - 2018',
      description: "Dean's List for all semesters. Participated in ACM programming competitions. Senior project: Developed an IoT-based smart home system."
    }
  ];

  const allEducation = [...defaultEducation, ...newEducation];

  const formatPeriod = (education) => {
    if (education.period) return education.period;
    if (education.startYear || education.endYear) {
      const start = education.startYear || '';
      const end = education.current ? 'Present' : (education.endYear || '');
      return `${start} - ${end}`;
    }
    return '';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        <button 
          onClick={onAdd}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <PlusIcon />
          <span>Add Education</span>
        </button>
      </div>

      <div className="space-y-8">
        {allEducation.map((edu, index) => (
          <div key={index} className="pb-8 border-b border-gray-200 last:border-b-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {edu.degree && (
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{edu.degree}</h3>
                )}
                <h4 className="text-base font-medium text-gray-800">{edu.institution}</h4>
                <p className="text-sm text-gray-500 mb-4">{formatPeriod(edu)}</p>
                {edu.gpa && (
                  <p className="text-sm text-gray-600 mb-2">GPA: {edu.gpa}</p>
                )}
                <p className="text-sm text-gray-600 leading-relaxed">{edu.description}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-4">
                <EditIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationTab;