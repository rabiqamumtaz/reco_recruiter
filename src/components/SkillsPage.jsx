import React, { useState } from 'react';
import TechnicalSkillsTab from './TechnicalSkillsTab';
import SoftSkillsTab from './SoftSkillsTab';
import LanguagesTab from './LanguagesTab';
import SlideModal from './SlideModal';
import AddSkillForm from '../forms/AddSkillForm';

const SkillsPage = () => {
  const [activeTab, setActiveTab] = useState('Technical Skills');
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState({
    technical: [],
    soft: [],
    languages: []
  });

  const tabs = ['Technical Skills', 'Soft Skills', 'Languages'];

  const getButtonText = () => {
    switch (activeTab) {
      case 'Technical Skills':
        return 'Add Skill';
      case 'Soft Skills':
        return 'Add Soft';
      case 'Languages':
        return 'Add Languages';
      default:
        return 'Add Skill';
    }
  };

  const getModalTitle = () => {
    switch (activeTab) {
      case 'Technical Skills':
        return 'Add Technical Skill';
      case 'Soft Skills':
        return 'Add Soft Skill';
      case 'Languages':
        return 'Add Language';
      default:
        return 'Add Skill';
    }
  };

  const getSkillType = () => {
    switch (activeTab) {
      case 'Technical Skills':
        return 'technical';
      case 'Soft Skills':
        return 'soft';
      case 'Languages':
        return 'language';
      default:
        return 'technical';
    }
  };

  const handleAddSkill = (skillData) => {
    const skillType = getSkillType();
    setSkills(prev => ({
      ...prev,
      [skillType]: [...prev[skillType], skillData]
    }));
    setShowModal(false);
  };

  const handleOpenModal = () => {
    console.log('Opening modal for:', activeTab); // Debug log
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log('Closing modal'); // Debug log
    setShowModal(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Technical Skills':
        return <TechnicalSkillsTab newSkills={skills.technical} onAdd={handleOpenModal} />;
      case 'Soft Skills':
        return <SoftSkillsTab newSkills={skills.soft} onAdd={handleOpenModal} />;
      case 'Languages':
        return <LanguagesTab newSkills={skills.languages} onAdd={handleOpenModal} />;
      default:
        return <TechnicalSkillsTab newSkills={skills.technical} onAdd={handleOpenModal} />;
    }
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Skills</h1>
          <button 
            onClick={handleOpenModal}
            className="flex items-center space-x-2 px-4 py-2 bg-black rounded-md text-sm font-medium text-white hover:bg-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>{getButtonText()}</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? 'text-gray-900 border-b-2 border-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        {renderTabContent()}

        {/* Add Skill Modal */}
        <SlideModal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={getModalTitle()}
        >
          <AddSkillForm
            type={getSkillType()}
            onSubmit={handleAddSkill}
            onCancel={handleCloseModal}
          />
        </SlideModal>
      </div>
    </div>
  );
};

export default SkillsPage;