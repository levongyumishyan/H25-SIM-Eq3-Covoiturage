// Import required libraries
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Initialize Express app
const app = express();

// Use CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Define your locations with names and coordinates
const locations = [
    { name: "Location A", lat: 40.7128, lng: -74.0060 }, // New York
    { name: "Location B", lat: 34.0522, lng: -118.2437 }, // Los Angeles
    { name: "Location C", lat: 51.5074, lng: -0.1278 },  // London
    { name: "Location D", lat: 48.8566, lng: 2.3522 }     // Paris
];

// Route to handle optimizing the route
app.post("/optimize-route", async (req, res) => {
    try {
        // Validate that all locations have valid lat/lng
        for (let i = 0; i < locations.length; i++) {
            if (!locations[i].lat || !locations[i].lng) {
                return res.status(400).json({ error: `Invalid location at index ${i}: lat or lng is missing` });
            }
        }

        // Format coordinates for the OSRM request (OSRM expects "lng,lat")
        const coordinates = locations.map(loc => `${loc.lng},${loc.lat}`).join(";");
        console.log("Coordinates for OSRM request:", coordinates);

        // Send request to OSRM for routing (optimized route calculation)
        const response = await axios.get(`http://router.project-osrm.org/trip/v1/driving/${coordinates}?source=first&destination=last&roundtrip=false&geometries=polyline6`);
        
        // If OSRM returns an error, handle it
        if (response.data.code !== "Ok") {
            return res.status(500).json({ error: "OSRM routing error" });
        }

        // Get the optimized order of waypoints (indices returned by OSRM)
        const optimizedOrderIndices = response.data.waypoints.map(wp => wp.waypoint_index);
        console.log("Optimized order indices:", optimizedOrderIndices);

        // Map the indices back to actual locations
        const optimizedLocations = optimizedOrderIndices.map(index => locations[index]);

        // Get the polyline geometry of the route
        const polyline = response.data.routes[0].geometry;
        console.log("Polyline geometry:", polyline); // Log the polyline for debugging

        // Send the optimized locations and polyline back to the frontend
        res.json({ optimizedOrder: optimizedLocations, polyline });

    } catch (error) {
        console.error("Error in optimizing route:", error);
        res.status(500).json({ error: error.message || "Server error" });
    }
});

// Set the port for the server to listen on
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
