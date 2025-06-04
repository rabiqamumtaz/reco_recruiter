import React, { useState } from 'react';
import JobCard from './JobCard';
import JobDetailModal from './JobDetailModal';

const AppliedJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'All Types',
    location: 'All Locations',
    salary: 'All Salaries',
    skills: 'Skills'
  });
  const [activeTab, setActiveTab] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetail, setShowJobDetail] = useState(false);

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechGlobal Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      status: 'under-review',
      appliedDate: 'May 23, 2025',
      skills: ['React', 'TypeScript', 'Next.js'],
      description: 'We are looking for a Senior Frontend Developer to join our growing team...',
      requirements: [
        '5+ years React experience',
        'TypeScript proficiency',
        'Team leadership experience'
      ],
      companyInfo: {
        name: 'TechGlobal Inc.',
        industry: 'Technology',
        size: '500-1000 employees',
        description: 'TechGlobal Inc. is a leading company in the technology space, committed to innovation and excellence. We\'re building the future of technology with a team of passionate professionals.'
      }
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'TechGlobal Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      status: 'interview',
      appliedDate: 'May 20, 2025',
      skills: ['React', 'TypeScript', 'Next.js'],
      description: 'Join our team as a Full Stack Engineer and work on cutting-edge projects...',
      requirements: [
        '4+ years full-stack experience',
        'Node.js proficiency',
        'Database design experience'
      ],
      companyInfo: {
        name: 'TechGlobal Inc.',
        industry: 'Technology',
        size: '500-1000 employees',
        description: 'TechGlobal Inc. is a leading company in the technology space, committed to innovation and excellence.'
      }
    },
    {
      id: 3,
      title: 'Backend Developer',
      company: 'StartupCorp',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      status: 'submitted',
      appliedDate: 'May 18, 2025',
      skills: ['Node.js', 'Python', 'AWS'],
      description: 'We need a talented Backend Developer to build scalable systems...',
      requirements: [
        '3+ years backend experience',
        'Cloud platform experience',
        'API design skills'
      ],
      companyInfo: {
        name: 'StartupCorp',
        industry: 'Technology',
        size: '50-100 employees',
        description: 'A fast-growing startup focused on innovative solutions.'
      }
    },
    {
      id: 4,
      title: 'React Developer',
      company: 'WebSolutions',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$80,000 - $100,000',
      status: 'rejected',
      appliedDate: 'May 15, 2025',
      skills: ['React', 'JavaScript', 'CSS'],
      description: 'Looking for a React Developer to work on client projects...',
      requirements: [
        '3+ years React experience',
        'Strong CSS skills',
        'Client communication skills'
      ],
      companyInfo: {
        name: 'WebSolutions',
        industry: 'Web Development',
        size: '10-50 employees',
        description: 'A web development agency serving clients worldwide.'
      }
    }
  ];

  const getStatusCounts = () => {
    const counts = {
      all: jobs.length,
      submitted: jobs.filter(job => job.status === 'submitted').length,
      'under-review': jobs.filter(job => job.status === 'under-review').length,
      interview: jobs.filter(job => job.status === 'interview').length,
      rejected: jobs.filter(job => job.status === 'rejected').length
    };
    return counts;
  };

  const getFilteredJobs = () => {
    let filtered = jobs;

    if (activeTab !== 'all') {
      filtered = filtered.filter(job => job.status === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowJobDetail(true);
  };

  const handleCloseJobDetail = () => {
    setShowJobDetail(false);
    setSelectedJob(null);
  };

  const statusCounts = getStatusCounts();
  const filteredJobs = getFilteredJobs();

  const tabs = [
    { key: 'all', label: `All (${statusCounts.all})` },
    { key: 'submitted', label: `Submitted (${statusCounts.submitted})` },
    { key: 'under-review', label: `Under Review (${statusCounts['under-review']})` },
    { key: 'interview', label: `Interview (${statusCounts.interview})` },
    { key: 'rejected', label: `Rejected (${statusCounts.rejected})` }
  ];

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Applied Jobs</h1>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <button className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 lg:w-auto">
            Clear Filters
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(selectedFilters).map(([key, value]) => (
            <div key={key} className="relative">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={value}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, [key]: e.target.value }))}
              >
                <option value={value}>{value}</option>
              </select>
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          ))}
        </div>

        {/* Status Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onClick={() => handleJobClick(job)}
            />
          ))}
          
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search or filters to find more jobs.</p>
            </div>
          )}
        </div>

        {/* Job Detail Modal */}
        <JobDetailModal
          isOpen={showJobDetail}
          onClose={handleCloseJobDetail}
          job={selectedJob}
        />
      </div>
    </div>
  );
};

export default AppliedJobsPage;
