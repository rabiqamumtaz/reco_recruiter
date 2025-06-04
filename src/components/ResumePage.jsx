import React, { useState } from 'react';
import CertificationTab from './CertificationTab';
import ExperienceTab from './ExperienceTab';
import EducationTab from './EducationTab';
import ResumeViewHistory from './ResumeViewHistory';
import SlideModal from './SlideModal';
import AddExperienceForm from '../forms/AddExperienceFrom';
import AddEducationForm from '../forms/AddEducationForm';
import AddCertificationForm from '../forms/AddCertificationForm';

const ResumePage = () => {
  const [activeTab, setActiveTab] = useState('Resume');
  const [showViewHistory, setShowViewHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [data, setData] = useState({
    experiences: [],
    education: [],
    certifications: []
  });
  
  // Define icons as simple SVG components
  const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
  
  const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );
  
  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
  
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
  
  const PaperclipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
    </svg>
  );
  
  const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-500">
      <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
    </svg>
  );

  const EditProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );

  const tabs = ['Resume', 'Experience', 'Education', 'Certification'];
  
  const resumeItems = [
    {
      title: 'Full stack developer resume',
      lastUpdated: 'May 15, 2025',
      fileName: 'John_Doe_Resume.pdf',
      pages: 2,
      size: '420 KB',
      format: 'Pdf Format',
      applications: 12
    },
    {
      title: 'Front end developer resume',
      lastUpdated: 'May 15, 2025',
      fileName: 'John_Doe_Resume.pdf',
      pages: 2,
      size: '420 KB',
      format: 'Pdf Format',
      applications: 12
    }
  ];

  const handleViewHistory = () => {
    setShowViewHistory(true);
    setActiveTab('ViewHistory');
  };

  const handleAddItem = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleSubmitForm = (formData) => {
    setData(prev => ({
      ...prev,
      [modalType]: [...prev[modalType], formData]
    }));
    setShowModal(false);
    setModalType('');
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'experiences':
        return 'Add Experience';
      case 'education':
        return 'Add Education';
      case 'certifications':
        return 'Add Certification';
      default:
        return 'Add Item';
    }
  };

  const renderModalForm = () => {
    switch (modalType) {
      case 'experiences':
        return (
          <AddExperienceForm
            onSubmit={handleSubmitForm}
            onCancel={() => setShowModal(false)}
          />
        );
      case 'education':
        return (
          <AddEducationForm
            onSubmit={handleSubmitForm}
            onCancel={() => setShowModal(false)}
          />
        );
      case 'certifications':
        return (
          <AddCertificationForm
            onSubmit={handleSubmitForm}
            onCancel={() => setShowModal(false)}
          />
        );
      default:
        return null;
    }
  };

  const renderTabContent = () => {
    if (showViewHistory) {
      return <ResumeViewHistory />;
    }

    switch (activeTab) {
      case 'Resume':
        return (
          <div className="space-y-6">
            {resumeItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-sm text-gray-500">Last updated on {item.lastUpdated}</p>
                  </div>
                  <button className="mt-3 sm:mt-0 flex items-center space-x-2 px-4 py-2 bg-black rounded-md text-sm font-medium text-white hover:bg-gray-800">
                    <DownloadIcon />
                    <span>Download</span>
                  </button>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <PaperclipIcon />
                    <span className="ml-2 font-medium">{item.fileName}</span>
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span>{item.pages} pages</span>
                    <span className="mx-2">•</span>
                    <span>{item.size}</span>
                    <span className="mx-2">•</span>
                    <span>{item.format}</span>
                  </div>
                  <div className="flex justify-end">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <EyeIcon />
                      <span>View</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <span className="text-gray-600">This resume has been used in {item.applications} applications</span>
                  <button 
                    onClick={handleViewHistory}
                    className="ml-2 flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full hover:bg-green-200"
                  >
                    <span>View History</span>
                    <LeafIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'Experience':
        return <ExperienceTab newExperiences={data.experiences} onAdd={() => handleAddItem('experiences')} />;
      case 'Education':
        return <EducationTab newEducation={data.education} onAdd={() => handleAddItem('education')} />;
      case 'Certification':
        return <CertificationTab newCertifications={data.certifications} onAdd={() => handleAddItem('certifications')} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Resume</h1>
          <div className="flex space-x-3">
            {!showViewHistory && (
              <>
                <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <PlusIcon />
                  <span>Create new category</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-black border border-black rounded-md text-sm font-medium text-white hover:bg-gray-800">
                  <UploadIcon />
                  <span>Upload Resume</span>
                </button>
              </>
            )}
            {showViewHistory && (
              <button className="flex items-center space-x-2 px-3 py-2 bg-black border border-black rounded-md text-sm font-medium text-white hover:bg-gray-800">
                <EditProfileIcon />
                <span>Edit profile</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab && !showViewHistory
                    ? 'text-gray-900 border-b-2 border-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setShowViewHistory(false);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        {renderTabContent()}

        {/* Add Item Modal */}
        <SlideModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={getModalTitle()}
        >
          {renderModalForm()}
        </SlideModal>
      </div>
    </div>
  );
};

export default ResumePage;