import React, { useState, useEffect } from 'react';

const DummyApiUrl = 'https://dev.internbazr.com/candidate/test/data';

const JobListingApp = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  useEffect(() => {
    const fetchJobs = async () => {
        try {
          const response = await fetch(DummyApiUrl);
          const data = await response.json();
          console.log(data?.data)
          setJobs(data?.data);
          setFilteredJobs(data?.data);
        } catch (error) {
          console.error('Error fetching job data:', error);
        }
    };
    fetchJobs();
  }, []);
console.log(jobs,filteredJobs)
  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  console.log(indexOfFirstJob, indexOfLastJob, filteredJobs)
  const currentJobs = filteredJobs?.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Filter jobs
  const handleFilter = () => {
    let filtered = jobs?.filter(job =>
      job.title.toLowerCase().includes(searchKeyword?.toLowerCase())
      && job.location.toLowerCase().includes(locationFilter?.toLowerCase())
      && (salaryFilter === '' || job.salary >= salaryFilter)
    );
    setFilteredJobs(filtered);
  };

  return (
    <div>
      {/* Search and Filter Controls */}
      <input
        type="text"
        placeholder="Search jobs"
        value={searchKeyword}
        onChange={e => setSearchKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={locationFilter}
        onChange={e => setLocationFilter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Minimum Salary"
        value={salaryFilter}
        onChange={e => setSalaryFilter(e.target.value)}
      />
      <button onClick={handleFilter}>Apply Filters</button>

      {/* Job Cards */}
      {currentJobs?.map(job => (
        <div key={job.id} style={{border: "1px solid black", borderRadius:"20px", padding:"10px", margin:"10px"}}>
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
        </div>
      ))}

      {/* Pagination */}
      <ul>
        {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }, (_, i) => (
          <li key={i}>
            <button onClick={() => paginate(i + 1)}>{i + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobListingApp;
