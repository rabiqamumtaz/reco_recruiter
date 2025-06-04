import React from 'react';

const CertificationTab = ({ newCertifications = [], onAdd }) => {
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

  const defaultCertifications = [
    {
      title: 'React Native development',
      institution: 'Stanford University',
      description: 'Certificate for completion or Reach Native course.'
    },
    {
      title: 'JS Coder',
      institution: 'Stanford University',
      description: 'Certificate for completion or Reach Native course.'
    }
  ];

  const allCertifications = [...defaultCertifications, ...newCertifications];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Certification</h2>
        <button 
          onClick={onAdd}
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <PlusIcon />
          <span>Add Certificates</span>
        </button>
      </div>

      <div className="space-y-6">
        {allCertifications.map((cert, index) => (
          <div key={index} className="flex items-start space-x-4 pb-6 border-b border-gray-200 last:border-b-0">
            <div className="w-24 h-16 bg-gray-300 rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cert.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{cert.institution}</p>
                  {(cert.issueDate || cert.expiryDate) && (
                    <p className="text-sm text-gray-500 mb-3">
                      {cert.issueDate && `Issued: ${formatDate(cert.issueDate)}`}
                      {cert.expiryDate && ` • Expires: ${formatDate(cert.expiryDate)}`}
                    </p>
                  )}
                  {cert.credentialId && (
                    <p className="text-sm text-gray-500 mb-3">Credential ID: {cert.credentialId}</p>
                  )}
                  <p className="text-sm text-gray-600">{cert.description}</p>
                  {cert.credentialUrl && (
                    <a 
                      href={cert.credentialUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
                    >
                      View Credential
                    </a>
                  )}
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <EditIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationTab;