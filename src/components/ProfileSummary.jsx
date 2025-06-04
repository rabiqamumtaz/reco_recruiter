import React, { useState, useEffect } from 'react';
import SlideModal from './SlideModal';
import EditProfileForm from '../forms/EditProfileForm';

const ProfileSummary = ({ onProfileUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    location: 'San Francisco, CA',
    title: 'Full Stack Developer',
    experience: '5+ Years Experience',
    aboutMe: 'Passionate Full Stack Developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Looking for challenging opportunities to leverage my skills in a forward-thinking company.',
    careerObjective: 'Seeking a Senior Developer position where I can utilize my technical expertise and leadership skills to drive innovation and deliver exceptional software solutions.',
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'Python'],
    profileImage: null
  });

  // Pass profile data to parent component
  useEffect(() => {
    if (onProfileUpdate) {
      onProfileUpdate(profileData);
    }
  }, [profileData, onProfileUpdate]);

  // Define icons as simple SVG components
  const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
  );
  
  const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = (updatedData) => {
    setProfileData(updatedData);
    setShowEditModal(false);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Profile Summary</h2>
          <button 
            onClick={handleEditProfile}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <PencilIcon />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {profileData.profileImage ? (
              <img src={profileData.profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-semibold text-gray-600">
                {profileData.fullName.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{profileData.fullName}</h3>
            <div className="flex items-center text-gray-600 mb-3">
              <MapPinIcon />
              <span className="text-sm ml-1">{profileData.location}</span>
            </div>
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {profileData.title}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {profileData.experience}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">About Me</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {profileData.aboutMe}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Career Objective</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {profileData.careerObjective}
            </p>
          </div>

          {profileData.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
                {profileData.skills.length > 5 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                    +{profileData.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <SlideModal
        isOpen={showEditModal}
        onClose={handleCloseModal}
        title="Edit Profile"
      >
        <EditProfileForm
          onSubmit={handleSaveProfile}
          onCancel={handleCloseModal}
        />
      </SlideModal>
    </>
  );
};

export default ProfileSummary;