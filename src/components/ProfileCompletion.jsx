import React from 'react';

const ProfileCompletion = ({ profileData }) => {
  // Define icons as simple SVG components
  const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500">
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
  
  const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-500">
      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
    </svg>
  );

  // Calculate completion based on profile data
  const calculateCompletion = () => {
    if (!profileData) {
      return {
        resume: true,
        skills: true,
        contactInfo: true,
        portfolio: false
      };
    }

    const hasBasicInfo = profileData.fullName && profileData.location;
    const hasAboutMe = profileData.aboutMe && profileData.aboutMe.length > 50;
    const hasCareerObjective = profileData.careerObjective && profileData.careerObjective.length > 30;
    const hasSkills = profileData.skills && profileData.skills.length >= 3;

    return {
      resume: hasBasicInfo && hasAboutMe,
      skills: hasSkills,
      contactInfo: hasBasicInfo,
      portfolio: hasCareerObjective && profileData.profileImage
    };
  };

  const completion = calculateCompletion();
  const completedItems = Object.values(completion).filter(Boolean).length;
  const totalItems = Object.keys(completion).length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  const completionItems = [
    { label: 'Resume', status: completion.resume },
    { label: 'Skills', status: completion.skills },
    { label: 'Contact Info', status: completion.contactInfo },
    { label: 'Portfolio', status: completion.portfolio },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Completion</span>
          <span className="text-sm font-semibold text-gray-900">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gray-900 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {completionItems.map((item, index) => (
          <div key={index} className="completion-item">
            <span className="text-sm text-gray-700">{item.label}</span>
            <div className="flex items-center">
              {item.status ? (
                <>
                  <CheckCircleIcon />
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                    Complete
                  </span>
                </>
              ) : (
                <>
                  <XCircleIcon />
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 ml-2">
                    Incomplete
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCompletion;