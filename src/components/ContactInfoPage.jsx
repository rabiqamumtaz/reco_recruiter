import React, { useState } from 'react';
import SlideModal from './SlideModal';
import EditContactForm from '../forms/EditContactForm';

const ContactInfoPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [contactData, setContactData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    portfolio: 'johndoe.dev'
  });
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: true,
    showPhone: true,
    showLocation: true,
    openToRelocation: true,
    receiveJobAlerts: true
  });
  const [contactNotes, setContactNotes] = useState(
    'I prefer to be contacted via email first. Available for calls between 2 PM - 5 PM PST on weekdays.'
  );

  const togglePrivacySetting = (setting) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleEditContact = () => {
    setShowEditModal(true);
  };

  const handleSaveContact = (updatedData) => {
    setContactData(updatedData);
    setShowEditModal(false);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-black' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Contact Information</h1>
          <button 
            onClick={handleEditContact}
            className="flex items-center space-x-2 px-4 py-2 bg-black rounded-md text-sm font-medium text-white hover:bg-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            <span>Edit profile</span>
          </button>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h2>
          <p className="text-gray-600 mb-6">Update your personal contact details</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name:</label>
              <p className="text-gray-900">{contactData.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number:</label>
              <p className="text-gray-900">{contactData.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address:</label>
              <p className="text-gray-900">{contactData.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location:</label>
              <p className="text-gray-900">{contactData.location}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile:</label>
              <p className="text-gray-900">{contactData.linkedin}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Website:</label>
              <p className="text-gray-900">{contactData.portfolio}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Privacy Settings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Privacy Settings</h2>
            <p className="text-gray-600 mb-6">Control what information is visible to employers</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Show Email Address</h3>
                  <p className="text-sm text-gray-500">Allow employers to see your email</p>
                </div>
                <ToggleSwitch 
                  enabled={privacySettings.showEmail}
                  onChange={() => togglePrivacySetting('showEmail')}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Show Phone Number</h3>
                  <p className="text-sm text-gray-500">Allow employers to call you directly</p>
                </div>
                <ToggleSwitch 
                  enabled={privacySettings.showPhone}
                  onChange={() => togglePrivacySetting('showPhone')}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Show Current Location</h3>
                  <p className="text-sm text-gray-500">Display your current city and state</p>
                </div>
                <ToggleSwitch 
                  enabled={privacySettings.showLocation}
                  onChange={() => togglePrivacySetting('showLocation')}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Open to Relocation</h3>
                  <p className="text-sm text-gray-500">Indicate willingness to relocate</p>
                </div>
                <ToggleSwitch 
                  enabled={privacySettings.openToRelocation}
                  onChange={() => togglePrivacySetting('openToRelocation')}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Receive Job Alerts</h3>
                  <p className="text-sm text-gray-500">Get notified about new job opportunities</p>
                </div>
                <ToggleSwitch 
                  enabled={privacySettings.receiveJobAlerts}
                  onChange={() => togglePrivacySetting('receiveJobAlerts')}
                />
              </div>
            </div>
          </div>

          {/* Additional Contact Notes */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Additional Contact Notes</h2>
            <p className="text-gray-600 mb-6">Add any additional information for recruiters</p>
            
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                {contactNotes}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Contact Modal */}
        <SlideModal
          isOpen={showEditModal}
          onClose={handleCloseModal}
          title="Edit Contact Information"
        >
          <EditContactForm
            initialData={contactData}
            onSubmit={handleSaveContact}
            onCancel={handleCloseModal}
          />
        </SlideModal>
      </div>
    </div>
  );
};

export default ContactInfoPage;