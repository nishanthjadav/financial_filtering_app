// File: fetchData.js
// Date Created: 2025-01-08
// Description: This module defines a function `fetchData` that sends an HTTP request to a Flask backend API
// to fetch filtered and sorted data. It constructs query parameters from the filters and sort criteria, 
// sends the request, and processes the response.

const API_URL = "https://financial-backend-sigma.vercel.app/fetch_data"; // Flask backend endpoint

// Fetches data from the backend with the specified filters and sorting criteria
export const fetchData = async (filters, sortBy) => {
    try {
        // Construct the query parameters from the filters object and sortBy string
        const queryParams = new URLSearchParams(filters);
        queryParams.set('sortBy', sortBy); // Append the sorting criteria to the query parameters

        // Send GET request to the API endpoint with the query parameters
        const response = await fetch(`${API_URL}?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'no-cors', // Ensure CORS mode is enabled
        });
        // If the response is not OK (status code not in the range 200-299), throw an error
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        // Parse the JSON data from the response and return it
        const data = await response.json();
        return data;
    } catch (error) {
        // Log any errors that occur and return an empty array
        console.error(error);
        return [];
    }
};
