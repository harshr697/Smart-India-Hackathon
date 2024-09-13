import { useRef, useEffect, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import { services } from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import "./busRoutes.css";

const API_KEY = "AAv37wtfby7vWvEa9O06sY7cX7EHDapE";
const DELHI_COORDINATES = [77.1025, 28.7041]; // Delhi coordinates

function App() {
  const mapElement = useRef();
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);

  // Initialize the map
  useEffect(() => {
    const map = tt.map({
      key: API_KEY,
      container: mapElement.current,
      center: DELHI_COORDINATES, 
      zoom: 12
    });
    setMap(map);
    return () => map.remove();
  }, []);

  // Add marker to the map on click
  useEffect(() => {
    if (map) {
      map.on("click", addMarker);
    }
    return () => {
      if (map) {
        map.off("click", addMarker);
      }
    };
  }, [map, markers]);
  
  const addMarker = (event) => {
    console.log("Map clicked at:", event.lngLat); // Log where you clicked
    if (markers.length < 2) {
      const marker = new tt.Marker().setLngLat(event.lngLat).addTo(map);
      console.log("Marker added at:", event.lngLat); // Log where the marker was added
      setMarkers((markers) => [...markers, marker]);
    }
  };
  
  
console.log("Coordinates before initializing map:", DELHI_COORDINATES);
console.log("Markers for route:", markers.map(marker => marker.getLngLat()));

useEffect(() => {
  console.log("Markers state updated:", markers); // Check when markers are added
}, [markers]);


  // Clear markers and routes
  const clear = () => {
    markers.forEach((marker) => marker.remove());
    setMarkers([]);

    // Safely remove routes with checks
    removeRoute("green");
    removeRoute("red");
  };

  const locations = markers.map((marker) => marker.getLngLat());
if (!locations || locations.some(location => location === null)) {
  console.error("Invalid route locations", locations);
  return;
}


  // Plot the route between markers
  const route = () => {
    if (markers.length < 2) {
      console.log("Not enough markers to calculate a route"); // Log when there's an issue
      return;
    }
    const key = API_KEY;
    const locations = markers.map((marker) => marker.getLngLat());

    // Calculate normal route
    calculateRoute("green", {
      key,
      locations
    });

    // Calculate hazardous truck route
    calculateRoute("red", {
      key,
      locations,
      travelMode: "truck",
      vehicleLoadType: "otherHazmatExplosive",
      vehicleWeight: 8000
    });
  };

  // Calculate the route
  const calculateRoute = async (color, routeOptions) => {
    try {
      const response = await services.calculateRoute(routeOptions);
      const geojson = response.toGeoJson();

      // Safely add route to map
      if (!map.getLayer(color)) {
        map.addLayer({
          id: color,
          type: "line",
          source: {
            type: "geojson",
            data: geojson
          },
          paint: {
            "line-color": color,
            "line-width": 6
          }
        });
      }
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  };

  // Safely remove routes from map
  const removeRoute = (id) => {
    if (map.getLayer(id)) {
      map.removeLayer(id);
    }
    if (map.getSource(id)) {
      map.removeSource(id);
    }
  };

  return (
    <div className="App">
      <div ref={mapElement} className="mapDiv">
        <button className="clearButton" onClick={clear}>
          Clear
        </button>
        <button className="routeButton" onClick={route}>
          Route
        </button>
      </div>
    </div>
  );
}

export default App;
