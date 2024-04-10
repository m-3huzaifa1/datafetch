import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import this to use the "toHaveTextContent" matcher

import App from "./App";

test("1) - Test for data fetching", async () => {
  render(<App />);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const heading = await screen.findAllByRole("heading");
  // const jobCards = screen.getAllByTestId("job-card");
  expect(heading).toHaveLength(2 || 1);
  // expect(jobCards).toHaveLength(2);
});

test("2) - Test for the heading data", async () => {
  render(<App />);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const jobName1 = await screen.findByText("Software Engineer");
  const jobName2 = await screen.findByText("MERN Stack Developer");
  expect(jobName1).toBeInTheDocument();
  expect(jobName2).toBeInTheDocument();
});

test("3) - renders data analyst jobs on filter", async () => {
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

test("4) - renders 60000 salary on filter", async () => {
  render(<App />);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const searchInput = screen.getByTestId("salary");
  const filterButton = screen.getByText("Apply Filters");

  // Type "Data Analyst" in the search input
  fireEvent.change(searchInput, { target: { value: "80000" } });

  // Click the apply filters button
  fireEvent.click(filterButton);

  // Wait for the data to be fetched and filtered (if applicable)
  await new Promise((resolve) => setTimeout(resolve, 0));

  // Assert that there are two elements with data-testid="job-heading" containing "Data Analyst"
  const jobHeadings = screen.getAllByTestId("job-heading");
  expect(jobHeadings?.length).toBe(2);
  expect(jobHeadings[0]?.textContent).toContain("Software Engineer");
  expect(jobHeadings[1]?.textContent).toContain("MERN Stack Developer");
});

test("5) - renders location on filter", async () => {
  render(<App />);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const searchInput = screen.getByTestId("search-location");
  const filterButton = screen.getByText("Apply Filters");

  // Type "Data Analyst" in the search input
  fireEvent.change(searchInput, { target: { value: "Pune, Maharashtra" } });

  // Click the apply filters button
  fireEvent.click(filterButton);

  // Wait for the data to be fetched and filtered (if applicable)
  await new Promise((resolve) => setTimeout(resolve, 0));

  // Assert that there are two elements with data-testid="job-heading" containing "Data Analyst"
  const jobHeadings = screen.getAllByTestId("location");
  expect(jobHeadings?.length).toBe(1);
  expect(jobHeadings[0].textContent)?.toContain("Pune, Maharashtra");
});
