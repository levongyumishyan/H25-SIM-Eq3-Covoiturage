// Import required libraries
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Initialize Express app
const app = express();

// Use CORS and JSON parsing middleware
app.use(cors());  // Enable CORS for all origins
app.use(express.json());  // Use express middleware to parse JSON requests

// Route to handle optimizing the route
app.post("/optimize-route", async (req, res) => {
    try {
        const locations = req.body.locations; // Get locations from the request body
        console.log("Received locations:", locations);

        // Check if locations array is valid
        if (!locations || locations.length < 2) {
            return res.status(400).json({ error: "At least two locations are required." });
        }

        // Format coordinates for the OSRM request (OSRM expects "lng,lat")
        const coordinates = locations.map(loc => `${loc.lng},${loc.lat}`).join(";");
        console.log("Coordinates for OSRM request:", coordinates);

        // Send request to OSRM for routing (optimized route calculation)
        const response = await axios.get(`http://router.project-osrm.org/trip/v1/driving/${coordinates}?source=first&destination=last&roundtrip=false&geometries=polyline6`);

        // Log the entire response for debugging
        console.log("OSRM response:", response.data);

        // Check if routes exist in the response
        if (!response.data.routes || response.data.routes.length === 0) {
            return res.status(500).json({ error: "OSRM did not return a valid route." });
        }

        // Get the optimized order of waypoints (indices returned by OSRM)
        const optimizedOrderIndices = response.data.waypoints.map(wp => wp.waypoint_index);
        console.log("Optimized order indices:", optimizedOrderIndices);

        // Map the indices back to actual locations
        const optimizedLocations = optimizedOrderIndices.map(index => locations[index]);
        console.log("Optimized locations:", optimizedLocations);

        // Get the polyline geometry of the route
        const polyline = response.data.routes[0].geometry;
        console.log("Polyline geometry:", polyline); // Check this in your console

        // Send the optimized locations and polyline back to the frontend
        res.json({ optimizedOrder: optimizedLocations, polyline });

    } catch (error) {
        console.error("Error in optimizing route:", error);
        res.status(500).json({ error: error.message || "Server error" });
    }
});

// Set the port for the server to listen on
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
