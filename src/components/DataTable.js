// File: DataTable.js
// Date Created: 2025-01-07
// Date Modified: 2025-01-08
// Description: This component displays financial data in a table format with sorting functionality.
// It uses React's state and memoization to manage and optimize sorting operations.

import React, { useState } from "react";

// Utility function to format a number as currency in USD
// Date Created: 2025-01-07
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

const DataTable = ({ data }) => {
    // State to manage the current sorting configuration
    // `key` represents the column being sorted, and `direction` is the sort order (asc/desc)
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Function to handle sorting when a column header is clicked
    // Toggles the sort direction and updates the `sortConfig` state
    // Date Created: 2025-01-07
    // Date Modified: 2025-01-08
    const handleSort = (key) => {
        const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        setSortConfig({ key, direction });
    };

    // Memoized function to compute sorted data based on `sortConfig`
    // Ensures sorting is only recalculated when `data` or `sortConfig` changes
    // Date Created: 2025-01-07
    const sortedData = React.useMemo(() => {
        if (sortConfig.key) {
            return [...data].sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [data, sortConfig]);

    // Function to render the sort icon for a column header
    // Displays an ascending or descending arrow based on the current sort direction
    // Date Created: 2025-01-07
    const renderSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return '▲▼';
    };

    // Render function for the table
    // Displays sorted data and enables sorting via column headers
    // Date Created: 2025-01-07
    // Date Modified: 2025-01-08
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead className="bg-gray-200">
                    <tr>
                        <th
                            className="px-4 py-2 text-left text-sm font-medium text-gray-600 cursor-pointer"
                            onClick={() => handleSort("date")}
                        >
                            Date {renderSortIcon("date")}
                        </th>
                        <th
                            className="px-4 py-2 text-left text-sm font-medium text-gray-600 cursor-pointer"
                            onClick={() => handleSort("revenue")}
                        >
                            Revenue {renderSortIcon("revenue")}
                        </th>
                        <th
                            className="px-4 py-2 text-left text-sm font-medium text-gray-600 cursor-pointer"
                            onClick={() => handleSort("netIncome")}
                        >
                            Net Income {renderSortIcon("netIncome")}
                        </th>
                        <th
                            className="px-4 py-2 text-left text-sm font-medium text-gray-600 cursor-pointer"
                            onClick={() => handleSort("grossProfit")}
                        >
                            Gross Profit {renderSortIcon("grossProfit")}
                        </th>
                        <th
                            className="px-4 py-2 text-left text-sm font-medium text-gray-600 cursor-pointer"
                            onClick={() => handleSort("eps")}
                        >
                            EPS {renderSortIcon("eps")}
                        </th>
                        <th
                            className="px-4 py-2 text-left text-sm font-medium text-gray-600 cursor-pointer"
                            onClick={() => handleSort("operatingIncome")}
                        >
                            Operating Income {renderSortIcon("operatingIncome")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((item, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                        >
                            <td className="px-4 py-2 text-sm text-gray-600">{item.date}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{formatCurrency(item.revenue)}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{formatCurrency(item.netIncome)}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{formatCurrency(item.grossProfit)}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{item.eps}</td>
                            <td className="px-4 py-2 text-sm text-gray-600">{formatCurrency(item.operatingIncome)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
