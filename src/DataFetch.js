import React, { useState, useEffect } from "react";

const DummyApiUrl = "https://dev.internbazr.com/candidate/test/data";

const JobListingApp = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(2);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(DummyApiUrl);
        const data = await response?.json();
        console.log(data?.data);
        setJobs(data?.data);
        setFilteredJobs(data?.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobs();
  }, []);
  // console.log(jobs, filteredJobs);
  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  // console.log(indexOfFirstJob, indexOfLastJob, filteredJobs);
  const currentJobs = filteredJobs?.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter jobs
  const handleFilter = () => {
    let filtered = jobs?.filter(
      (job) =>
        job?.title.toLowerCase().includes(searchKeyword?.toLowerCase()) &&
        job?.location.toLowerCase().includes(locationFilter?.toLowerCase()) &&
        (salaryFilter === "" ||
          parseInt(job?.minSalary) >= parseInt(salaryFilter))
    );
    setFilteredJobs(filtered);
  };

  return (
    <div>
      {/* Search and Filter Controls */}
      <input
        type="text"
        placeholder="Search jobs"
        data-testid="search-title"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        data-testid="search-location"
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Minimum Salary"
        value={salaryFilter}
        data-testid="salary"
        onChange={(e) => setSalaryFilter(e.target.value)}
      />
      <button onClick={handleFilter}>Apply Filters</button>
      {/* <p data-testid="job-card">Job card</p> */}
      {/* Job Cards */}
      {currentJobs?.map((job) => (
        <div
          data-testid="job-card"
          key={job?.id}
          style={{
            border: "1px solid black",
            borderRadius: "20px",
            padding: "10px",
            margin: "10px",
          }}
        >
          <h2 data-testid="job-heading">{job.title}</h2>
          <p>{job?.company}</p>
          <p>{job?.location}</p>
          <p>minSalary : {job?.minSalary}</p>
        </div>
      ))}

      {/* Pagination */}
      <ul style={{ display: "flex", listStyle: "None", flexDirection: "row" }}>
        {Array.from(
          { length: Math.ceil(filteredJobs.length / jobsPerPage) },
          (_, i) => (
            <li key={i}>
              <button onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default JobListingApp;
