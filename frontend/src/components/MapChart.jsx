import React from "react";
import * as Maps from "react-simple-maps";
const { ComposableMap, Geographies, Geography, Marker } = Maps;

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const data = [
  { name: "USA", coordinates: [-99.1332, 38.8951] },
  { name: "Europe", coordinates: [10.4515, 51.1657] },
  { name: "Australia", coordinates: [133.7751, -25.2744] },
  { name: "Asia", coordinates: [105.3188, 34.0479] },
  { name: "Africa", coordinates: [21.0936, 7.1881] },
];

const MapChart = () => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg w-full">
      <h2 className="text-xl font-semibold">Active Users</h2>
      <p className="text-blue-500 text-sm mb-2">8.06% vs previous month</p>

      <div className="overflow-hidden">
        <ComposableMap projectionConfig={{ scale: 140 }} className="w-full">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEA" stroke="#D6D6D6" />
              ))
            }
          </Geographies>
          {data.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={4} fill="#007bff" />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      <div className="mt-4">
        <p className="text-lg font-bold">23,214</p>
        <p className="text-gray-500 text-sm">Total Active Users</p>
      </div>
    </div>
  );
};

export default MapChart;
