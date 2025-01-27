// First, ensure you have your Google Maps API key
const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';

async function findNearestRoadPoint(userLat, userLng, roadName, city) {
    // 1. First, geocode the road to get its coordinates
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        `${roadName}, ${city}`
    )}&key=${apiKey}`;
    
    try {
        const geocodeResponse = await fetch(geocodeUrl);
        const geocodeData = await geocodeResponse.json();
        
        if (!geocodeData.results.length) {
            throw new Error('Road not found');
        }

        // 2. Get the road's geometry
        const roadGeometry = geocodeData.results[0].geometry;
        
        // 3. Use Roads API to get multiple points along the road
        const snapToRoadUrl = `https://roads.googleapis.com/v1/snapToRoads?path=${roadGeometry.bounds.northeast.lat},${roadGeometry.bounds.northeast.lng}|${roadGeometry.bounds.southwest.lat},${roadGeometry.bounds.southwest.lng}&interpolate=true&key=${apiKey}`;
        
        const snapResponse = await fetch(snapToRoadUrl);
        const snapData = await snapResponse.json();
        
        // 4. Find the nearest point among the road points
        let nearestPoint = null;
        let shortestDistance = Infinity;
        
        snapData.snappedPoints.forEach(point => {
            const distance = calculateDistance(
                userLat,
                userLng,
                point.location.latitude,
                point.location.longitude
            );
            
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestPoint = point.location;
            }
        });
        
        // 5. Return directions to the nearest point
        return await getDirections(userLat, userLng, nearestPoint.latitude, nearestPoint.longitude);
        
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to get directions using Google Directions API
async function getDirections(startLat, startLng, endLat, endLng) {
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${endLat},${endLng}&key=${apiKey}`;
    
    const response = await fetch(directionsUrl);
    return await response.json();
}

// Example usage:
async function navigateToRoad(userLocation) {
    const roadName = "Adetokunbo Ademola Crescent";
    const city = "Wuse 2, Abuja";
    
    try {
        const directions = await findNearestRoadPoint(
            userLocation.latitude,
            userLocation.longitude,
            roadName,
            city
        );
        
        // Handle the directions response here
        return directions;
    } catch (error) {
        console.error('Navigation failed:', error);
    }
}



const express = require('express');
const { Client } = require('@googlemaps/google-maps-services-js');
require('dotenv').config();

const app = express();
app.use(express.json());
const client = new Client({});

// Configuration options
const CONFIG = {
    WAYPOINT_INTERVAL: 200, // meters between waypoints
    MAX_WAYPOINTS: 25, // maximum waypoints to check (to avoid API limits)
    MODES: ['walking', 'driving', 'bicycling', 'transit'],
    DEFAULT_MODE: 'walking'
};

async function findNearestAccessPoint(userLocation, roadCoordinates, options = {}) {
    const {
        mode = CONFIG.DEFAULT_MODE,
        maxDistance = 5000, // meters
        waypointInterval = CONFIG.WAYPOINT_INTERVAL
    } = options;

    try {
        // Validate mode
        if (!CONFIG.MODES.includes(mode)) {
            throw new Error(`Invalid mode. Must be one of: ${CONFIG.MODES.join(', ')}`);
        }

        // Generate optimized waypoints
        const waypoints = optimizeWaypoints(
            roadCoordinates,
            userLocation,
            waypointInterval,
            CONFIG.MAX_WAYPOINTS
        );

        // Batch directions requests
        const batchSize = 10;
        const results = [];

        for (let i = 0; i < waypoints.length; i += batchSize) {
            const batch = waypoints.slice(i, i + batchSize);
            const batchPromises = batch.map(waypoint =>
                client.directions({
                    params: {
                        origin: `${userLocation.lat},${userLocation.lng}`,
                        destination: `${waypoint.lat},${waypoint.lng}`,
                        mode,
                        alternatives: true,
                        key: process.env.GOOGLE_MAPS_API_KEY
                    }
                }).catch(error => ({ error }))
            );

            const batchResponses = await Promise.all(batchPromises);
            
            batchResponses.forEach((response, index) => {
                if (!response.error && response.data.routes?.length) {
                    const route = response.data.routes[0];
                    const distance = route.legs[0].distance.value;
                    
                    if (distance <= maxDistance) {
                        results.push({
                            waypoint: batch[index],
                            route,
                            distance
                        });
                    }
                }
            });
        }

        if (results.length === 0) {
            throw new Error(`No accessible points found within ${maxDistance} meters`);
        }

        // Find the best result
        const bestResult = results.reduce((min, current) => 
            current.distance < min.distance ? current : min
        );

        return {
            success: true,
            nearestPoint: bestResult.waypoint,
            distance: bestResult.route.legs[0].distance,
            duration: bestResult.route.legs[0].duration,
            route: {
                overview_polyline: bestResult.route.overview_polyline,
                bounds: bestResult.route.bounds,
                steps: bestResult.route.legs[0].steps.map(step => ({
                    instruction: step.html_instructions,
                    distance: step.distance,
                    duration: step.duration,
                    startLocation: step.start_location,
                    endLocation: step.end_location,
                    maneuver: step.maneuver || null,
                    polyline: step.polyline
                }))
            },
            alternativePoints: results
                .filter(r => r !== bestResult)
                .slice(0, 2) // Return top 3 alternatives
                .map(r => ({
                    location: r.waypoint,
                    distance: r.route.legs[0].distance,
                    duration: r.route.legs[0].duration
                }))
        };
    } catch (error) {
        console.error('Error finding nearest access point:', error);
        throw error;
    }
}

// Optimize waypoint selection based on user location
function optimizeWaypoints(roadCoordinates, userLocation, interval, maxPoints) {
    // Calculate rough distances to each road segment
    const segments = [];
    for (let i = 0; i < roadCoordinates.length - 1; i++) {
        const start = roadCoordinates[i];
        const end = roadCoordinates[i + 1];
        const midpoint = {
            lat: (start.lat + end.lat) / 2,
            lng: (start.lng + end.lng) / 2
        };
        
        segments.push({
            start,
            end,
            distance: calculateDistance(userLocation, midpoint),
            length: calculateDistance(start, end)
        });
    }

    // Sort segments by distance from user
    segments.sort((a, b) => a.distance - b.distance);

    // Generate more waypoints for closer segments
    const waypoints = [];
    let remainingPoints = maxPoints;

    segments.forEach(segment => {
        const pointsForSegment = Math.max(
            2,
            Math.floor((1 - segment.distance / segments[0].distance) * remainingPoints)
        );
        
        const segmentWaypoints = generateWaypointsForSegment(
            segment.start,
            segment.end,
            Math.min(interval, segment.length / pointsForSegment)
        );

        waypoints.push(...segmentWaypoints);
        remainingPoints -= segmentWaypoints.length;
    });

    return waypoints.slice(0, maxPoints);
}

// API endpoints
app.post('/api/v1/nearest-access', async (req, res) => {
    try {
        const { userLocation, roadCoordinates, options } = req.body;
        
        if (!userLocation?.lat || !userLocation?.lng || !Array.isArray(roadCoordinates)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid request parameters'
            });
        }

        const result = await findNearestAccessPoint(userLocation, roadCoordinates, options);
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});