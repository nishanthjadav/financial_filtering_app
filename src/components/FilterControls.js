// File: FilterControls.js
// Date Created: 2025-01-07
// Date Modified: 2025-01-08
// Description: This component provides a set of controls for filtering data by date range, revenue range, 
// and net income range. The component uses React's state management to track filter values 
// and updates the parent component via callback functions.

import React, { useState } from "react";

const FilterControls = ({ onFilterChange, onSortChange }) => {
    // State to track filter input values
    const [filters, setFilters] = useState({
        startDate: "",      // Start year for date range filtering
        endDate: "",        // End year for date range filtering
        minRevenue: "",     // Minimum revenue for filtering
        maxRevenue: "",     // Maximum revenue for filtering
        minNetIncome: "",   // Minimum net income for filtering
        maxNetIncome: "",   // Maximum net income for filtering
    });

    // Handler for updating filters when input values change
    const handleFilterChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event
        const updatedFilters = { ...filters, [name]: value }; // Update the corresponding filter
        setFilters(updatedFilters); // Update local state
        onFilterChange(updatedFilters); // Notify parent component of the updated filters
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Filters</h3>

            {/* Date Range Filters */}
            <div className="flex space-x-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Start Year</label>
                    <input
                        type="text"
                        name="startDate"
                        placeholder="e.g., 2020"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">End Year</label>
                    <input
                        type="text"
                        name="endDate"
                        placeholder="e.g., 2024"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            {/* Revenue Range Filters */}
            <div className="flex space-x-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Min Revenue</label>
                    <input
                        type="number"
                        name="minRevenue"
                        placeholder="Min"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Max Revenue</label>
                    <input
                        type="number"
                        name="maxRevenue"
                        placeholder="Max"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            {/* Net Income Range Filters */}
            <div className="flex space-x-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Min Net Income</label>
                    <input
                        type="number"
                        name="minNetIncome"
                        placeholder="Min"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-600">Max Net Income</label>
                    <input
                        type="number"
                        name="maxNetIncome"
                        placeholder="Max"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterControls;
