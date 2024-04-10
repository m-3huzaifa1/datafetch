import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this to use the "toHaveTextContent" matcher

// import JobListingApp from "./DataFetch";
import App from "./App";

test("Test for data fetching", async () => {
  render(<App />);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // await screen.findAllByRole("heading");
  const heading = await screen.findAllByRole("heading");
  // Get all job cards
  // const jobCards = screen.getAllByTestId("job-card");

  // Assert the length of job cards
  expect(heading).toHaveLength(2);
  // expect(jobCards).toHaveLength(2);
});
test("Test for the heading data", async () => {
  render(<App />);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const jobName1 = await screen.findByText("Software Engineer");
  const jobName2 = await screen.findByText("MERN Stack Developer");
  expect(jobName1).toBeInTheDocument();
  expect(jobName2).toBeInTheDocument();
});
// test("Test for the input field", async () => {
//   render(<App />);
//   fireEvent.change(getByTestId("search-title"), {
//     target: { value: "Data Analyst" },
//   });
//   fireEvent.click(getByText("Apply Filters"));

//   // Wait for the component to re-render with filtered jobs
//   await waitFor(() => {
//     // Get all job titles after applying filters
//     const jobHeadings = getAllByTestId("job-heading");

//     // Check if the job titles containing "Data Analyst" are rendered
//     const dataAnalystJobs = jobHeadings.filter((heading) =>
//       heading.textContent.includes("Data Analyst")
//     );

//     // Assert that there are exactly two job titles containing "Data Analyst"
//     expect(dataAnalystJobs.length).toBe(2);
//   });
// });
test("renders data analyst jobs on filter", async () => {
  render(<App />);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const searchInput = screen.getByTestId("search-title");
  const filterButton = screen.getByText("Apply Filters");

  // Type "Data Analyst" in the search input
  fireEvent.change(searchInput, { target: { value: "Data Analyst" } });

  // Click the apply filters button
  fireEvent.click(filterButton);

  // Wait for the data to be fetched and filtered (if applicable)
  await new Promise((resolve) => setTimeout(resolve, 0));

  // Assert that there are two elements with data-testid="job-heading" containing "Data Analyst"
  const jobHeadings = screen.getAllByTestId("job-heading");
  expect(jobHeadings?.length).toBe(2);
  expect(jobHeadings[0]?.textContent).toContain("Data Analyst");
  expect(jobHeadings[1]?.textContent).toContain("Data Analyst");
});
