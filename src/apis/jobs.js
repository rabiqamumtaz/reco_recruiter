import api from "../axios";

export const fetchJobs = async () => {
    try{
  const response = await api.get('/recruiters/job');
    const jobs = response?.data?.data?.jobs;

    if (!Array.isArray(jobs)) {
      throw new Error('Unexpected response structure');
    }
    console.log(jobs)
    return jobs;
   } catch (err) {
    console.error('Fetch failed:', err);
    throw err; // 🔁 Re-throw so React Query sets `error`
  }
};

 // getting applications for a specific job
export const fetchApplicationsByJobId = async (jobId) => {
  console.log(jobId,"from api call")
  try {
    const response = await api.get('/recruiters/application/getById/'+jobId);
    console.log(response.data.applications)
    return response.data.applications;
  } catch (error) {
    console.error('Error fetching applications:', error.response.data);
    throw error.response?.data?.error || 'Something went wrong';
  }
};


export const fetchUserByRole = async () => {
  try {
    console.log("getting managers")
    const response = await api.get('/recruiters/getManagers?role=Account Manager');
    // console.log(response.data,"from sfsdf")
    return response.data.users;
  } catch (error) {
    console.error('Error fetching applications:', error.response.data);
    throw error.response?.data?.error || 'Something went wrong';
  }
};
