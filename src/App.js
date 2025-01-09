// File: App.js
// Date Created: 2025-01-07
// Date Modified: 2025-01-08
// Description: This is the main component for the Apple Financial Data app. 
// It fetches data from an API, applies filtering and sorting, and displays the data in a table.

import React, { useState, useEffect } from "react";
import { fetchData } from "./services/apiService.js"; // Service for fetching data from API
import DataTable from "./components/DataTable.js"; // Component for displaying data in a table
import FilterControls from "./components/FilterControls.js"; // Component for filtering and sorting controls

const App = () => {
  // State to hold the original data fetched from the API
  const [data, setData] = useState([]);

  // State to hold the filtered and sorted data displayed in the table
  const [filteredData, setFilteredData] = useState([]);

  // useEffect to fetch data from the API when the component mounts
  // Date Created: 2025-01-07
  // Date Modified: 2025-01-08
  useEffect(() => {
    const loadData = async () => {
      const apiData = await fetchData(); // Fetch data from API
      setData(apiData); // Store the original data
      setFilteredData(apiData); // Initialize filtered data with the original data
    };
    loadData();
  }, []); // Dependency array ensures this runs only on mount

  // Function to handle filter changes
  // Applies multiple filters to the data and updates the filtered state
  // Date Created: 2025-01-07
  // Date Modified: 2025-01-08
  const handleFilterChange = (filters) => {
    let updatedData = [...data]; // Make a copy of the original data

    // Apply start date filter
    if (filters.startDate) {
      updatedData = updatedData.filter((item) => item.date >= filters.startDate);
    }

    // Apply end date filter
    if (filters.endDate) {
      updatedData = updatedData.filter((item) => item.date <= filters.endDate);
    }

    // Apply minimum revenue filter
    if (filters.minRevenue) {
      updatedData = updatedData.filter((item) => item.revenue >= filters.minRevenue);
    }

    // Apply maximum revenue filter
    if (filters.maxRevenue) {
      updatedData = updatedData.filter((item) => item.revenue <= filters.maxRevenue);
    }

    // Apply minimum net income filter
    if (filters.minNetIncome) {
      updatedData = updatedData.filter((item) => item.netIncome >= filters.minNetIncome);
    }

    // Apply maximum net income filter
    if (filters.maxNetIncome) {
      updatedData = updatedData.filter((item) => item.netIncome <= filters.maxNetIncome);
    }

    setFilteredData(updatedData); // Update the filtered data state
  };

  // Function to handle sorting changes
  // Sorts the filtered data based on the selected field
  // Date Created: 2025-01-08
  const handleSortChange = (field) => {
    const sortedData = [...filteredData].sort((a, b) =>
      a[field] > b[field] ? 1 : -1
    );
    setFilteredData(sortedData); // Update the filtered data state with sorted data
  };

  // Main render function
  // Date Created: 2025-01-07
  // Date Modified: 2025-01-08
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Apple Financial Data</h1>

      {/* Filter and Sort Controls */}
      <FilterControls onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

      {/* Data Table */}
      <DataTable data={filteredData} />
    </div>
  );
};

export default App;
