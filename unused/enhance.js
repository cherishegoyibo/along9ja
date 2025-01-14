// Enhanced Waypoint System with Route Optimization
class EnhancedWaypointSystem {
    constructor(map, options = {}) {
        this.map = map;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.map,
            suppressMarkers: true // We'll create custom markers
        });
        
        this.waypoints = new Map();
        this.currentRoute = null;
        this.customMarkers = new Map();
        this.infoWindows = new Map();
        
        // Configuration options
        this.options = {
            optimizeWaypoints: true,
            provideRouteAlternatives: true,
            travelMode: google.maps.TravelMode.DRIVING,
            waypointRadius: 500, // meters
            notificationThreshold: 1000, // meters
            ...options
        };

        this.setupGeolocationWatching();
    }

    async setupGeolocationWatching() {
        if ('geolocation' in navigator) {
            this.watchId = navigator.geolocation.watchPosition(
                (position) => this.handleLocationUpdate(position),
                (error) => console.error('Geolocation error:', error),
                {
                    enableHighAccuracy: true,
                    maximumAge: 30000,
                    timeout: 27000
                }
            );
        }
    }

    handleLocationUpdate(position) {
        const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        this.checkWaypointProximity(currentLocation);
        this.updateRouteProgress(currentLocation);
    }

    async addWaypoint(waypointData) {
        const waypointId = `waypoint-${Date.now()}`;
        const waypoint = {
            id: waypointId,
            position: waypointData.position,
            title: waypointData.title,
            description: waypointData.description,
            priority: waypointData.priority || 'normal',
            timeWindow: waypointData.timeWindow, // { start: Date, end: Date }
            visitDuration: waypointData.visitDuration || 0, // minutes
            customActions: waypointData.customActions || [],
            requirements: waypointData.requirements || [],
            visited: false,
            ...waypointData
        };

        this.waypoints.set(waypointId, waypoint);
        this.createWaypointMarker(waypoint);
        await this.optimizeRoute();
        
        return waypointId;
    }

    createWaypointMarker(waypoint) {
        const marker = new google.maps.Marker({
            position: waypoint.position,
            map: this.map,
            title: waypoint.title,
            icon: this.getMarkerIcon(waypoint.priority)
        });

        const infoWindow = new google.maps.InfoWindow({
            content: this.createInfoWindowContent(waypoint)
        });

        marker.addListener('click', () => {
            this.closeAllInfoWindows();
            infoWindow.open(this.map, marker);
        });

        this.customMarkers.set(waypoint.id, marker);
        this.infoWindows.set(waypoint.id, infoWindow);
    }

    getMarkerIcon(priority) {
        const icons = {
            high: {
                url: 'path_to_red_icon.png',
                scaledSize: new google.maps.Size(32, 32)
            },
            normal: {
                url: 'path_to_blue_icon.png',
                scaledSize: new google.maps.Size(28, 28)
            },
            low: {
                url: 'path_to_green_icon.png',
                scaledSize: new google.maps.Size(24, 24)
            }
        };
        return icons[priority] || icons.normal;
    }

    createInfoWindowContent(waypoint) {
        const timeWindow = waypoint.timeWindow ? `
            <p>Time Window: ${this.formatTimeWindow(waypoint.timeWindow)}</p>
        ` : '';

        return `
            <div class="waypoint-info">
                <h3>${waypoint.title}</h3>
                <p>${waypoint.description}</p>
                ${timeWindow}
                <p>Duration: ${waypoint.visitDuration} minutes</p>
                <p>Priority: ${waypoint.priority}</p>
                <div class="waypoint-actions">
                    ${this.createActionButtons(waypoint)}
                </div>
            </div>
        `;
    }

    formatTimeWindow(timeWindow) {
        const formatTime = (date) => {
            return new Date(date).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        };
        return `${formatTime(timeWindow.start)} - ${formatTime(timeWindow.end)}`;
    }

    createActionButtons(waypoint) {
        return waypoint.customActions.map(action => `
            <button onclick="handleWaypointAction('${waypoint.id}', '${action.type}')">
                ${action.label}
            </button>
        `).join('');
    }

    async optimizeRoute() {
        if (this.waypoints.size < 2) return;

        const origin = this.getFirstWaypoint();
        const destination = this.getLastWaypoint();
        const intermediatePoints = this.getIntermediateWaypoints();

        const request = {
            origin: origin.position,
            destination: destination.position,
            waypoints: intermediatePoints.map(wp => ({
                location: wp.position,
                stopover: true
            })),
            optimizeWaypoints: this.options.optimizeWaypoints,
            provideRouteAlternatives: this.options.provideRouteAlternatives,
            travelMode: this.options.travelMode
        };

        try {
            const result = await this.directionsService.route(request);
            this.currentRoute = result;
            this.directionsRenderer.setDirections(result);
            this.updateWaypointOrder(result.routes[0].waypoint_order);
            return result;
        } catch (error) {
            console.error('Route optimization error:', error);
            throw error;
        }
    }

    updateWaypointOrder(waypointOrder) {
        const orderedWaypoints = new Map();
        const intermediatePoints = this.getIntermediateWaypoints();
        
        // Keep origin and destination
        const origin = this.getFirstWaypoint();
        const destination = this.getLastWaypoint();
        
        orderedWaypoints.set(origin.id, origin);
        
        // Reorder intermediate waypoints
        waypointOrder.forEach((index) => {
            const waypoint = intermediatePoints[index];
            orderedWaypoints.set(waypoint.id, waypoint);
        });
        
        orderedWaypoints.set(destination.id, destination);
        this.waypoints = orderedWaypoints;
    }

    getFirstWaypoint() {
        return Array.from(this.waypoints.values())[0];
    }

    getLastWaypoint() {
        return Array.from(this.waypoints.values())[this.waypoints.size - 1];
    }

    getIntermediateWaypoints() {
        const waypoints = Array.from(this.waypoints.values());
        return waypoints.slice(1, -1);
    }

    checkWaypointProximity(currentLocation) {
        this.waypoints.forEach((waypoint) => {
            if (waypoint.visited) return;

            const distance = this.calculateDistance(
                currentLocation,
                waypoint.position
            );

            if (distance <= this.options.notificationThreshold) {
                this.triggerWaypointNotification(waypoint, distance);
            }
        });
    }

    calculateDistance(point1, point2) {
        return google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(point1.lat, point1.lng),
            new google.maps.LatLng(point2.lat, point2.lng)
        );
    }

    triggerWaypointNotification(waypoint, distance) {
        // Create notification content
        const notification = {
            title: `Approaching: ${waypoint.title}`,
            body: `Distance: ${Math.round(distance)}m\n${waypoint.description}`,
            icon: waypoint.icon || 'default-icon.png'
        };

        // Show notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.body,
                icon: notification.icon
            });
        }

        // Trigger custom actions
        waypoint.customActions.forEach(action => {
            if (action.onApproach) {
                action.onApproach(waypoint, distance);
            }
        });
    }

    updateRouteProgress(currentLocation) {
        if (!this.currentRoute) return;

        const route = this.currentRoute.routes[0];
        const legs = route.legs;
        let totalDistance = 0;
        let totalDuration = 0;

        legs.forEach((leg, index) => {
            totalDistance += leg.distance.value;
            totalDuration += leg.duration.value;

            // Check if current location is within this leg
            const legPath = google.maps.geometry.encoding.decodePath(leg.steps[0].polyline.points);
            const distanceToLeg = this.calculateDistanceToPath(currentLocation, legPath);

            if (distanceToLeg < this.options.waypointRadius) {
                this.updateProgressUI(index, legs.length, totalDistance, totalDuration);
            }
        });
    }

    calculateDistanceToPath(point, path) {
        let minDistance = Infinity;
        for (let i = 0; i < path.length - 1; i++) {
            const distance = this.calculateDistanceToLineSegment(
                point,
                path[i],
                path[i + 1]
            );
            minDistance = Math.min(minDistance, distance);
        }
        return minDistance;
    }

    calculateDistanceToLineSegment(point, start, end) {
        return google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(point.lat, point.lng),
            new google.maps.LatLng(start.lat(), start.lng())
        );
    }

    updateProgressUI(currentLeg, totalLegs, totalDistance, totalDuration) {
        const progress = {
            currentLeg: currentLeg + 1,
            totalLegs: totalLegs,
            percentComplete: ((currentLeg + 1) / totalLegs) * 100,
            totalDistance: totalDistance,
            totalDuration: totalDuration
        };

        // Emit progress update event
        const event = new CustomEvent('routeProgressUpdate', { detail: progress });
        window.dispatchEvent(event);
    }

    cleanup() {
        if (this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
        }
        this.directionsRenderer.setMap(null);
        this.customMarkers.forEach(marker => marker.setMap(null));
        this.infoWindows.forEach(window => window.close());
    }
}

// Example usage with React
const WaypointNavigator = () => {
    const mapRef = useRef(null);
    const [waypointSystem, setWaypointSystem] = useState(null);
    const [routeProgress, setRouteProgress] = useState(null);

    useEffect(() => {
        // Initialize map
        const map = new google.maps.Map(mapRef.current, {
            zoom: 12,
            center: { lat: 40.7128, lng: -74.0060 }
        });

        // Initialize waypoint system
        const system = new EnhancedWaypointSystem(map, {
            optimizeWaypoints: true,
            provideRouteAlternatives: true
        });

        setWaypointSystem(system);

        // Listen for progress updates
        window.addEventListener('routeProgressUpdate', (event) => {
            setRouteProgress(event.detail);
        });

        return () => {
            if (system) {
                system.cleanup();
            }
        };
    }, []);

    const addSampleWaypoints = async () => {
        if (!waypointSystem) return;

        // Add multiple waypoints
        await waypointSystem.addWaypoint({
            position: { lat: 40.7128, lng: -74.0060 },
            title: "Start Point",
            description: "Tour starting location",
            priority: "high",
            timeWindow: {
                start: new Date().setHours(9, 0),
                end: new Date().setHours(10, 0)
            },
            visitDuration: 15,
            customActions: [
                {
                    type: "check-in",
                    label: "Check In",
                    onApproach: (waypoint) => {
                        console.log(`Checking in at ${waypoint.title}`);
                    }
                }
            ]
        });

        // Add more waypoints...
    };

    return (
        <div className="waypoint-navigator">
            <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
            
            <div className="controls">
                <button onClick={addSampleWaypoints}>
                    Add Sample Waypoints
                </button>
            </div>

            {routeProgress && (
                <div className="progress-bar">
                    <div 
                        className="progress"
                        style={{ width: `${routeProgress.percentComplete}%` }}
                    />
                    <div className="progress-text">
                        Waypoint {routeProgress.currentLeg} of {routeProgress.totalLegs}
                    </div>
                </div>
            )}
        </div>
    );
};

export { EnhancedWaypointSystem, WaypointNavigator };