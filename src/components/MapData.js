import React from "react";
import { TileLayer, Map, Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";

export const MapData = ({ countries, mapCenter }) => {
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      mult: 200,
    },
    recovered: {
      hex: "#389e0d",
      mult: 180,
    },
    deaths: {
      hex: "#5c0011",
      mult: 1800,
    },
  };
  return (
    <div className="map">
      <Map
        center={[mapCenter.lat, mapCenter.long]}
        zoom={mapCenter.zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
        />
        {countries.map((country, idx) => (
          <Circle
            key={idx}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.25}
            color={casesTypeColors[mapCenter.caseType].hex}
            radius={
              Math.sqrt(country[mapCenter.caseType]) *
              casesTypeColors[mapCenter.caseType].mult
            }
          >
            <Popup>
              <div style={{ fontSize: 13 }}>
                <div
                  className="flag"
                  style={{
                    backgroundImage: `url(${country.countryInfo.flag})`,
                  }}
                />
                <div
                  style={{ fontSize: 20, fontWeight: "bold", color: "#555" }}
                >
                  {country.country}
                </div>
                <div>Cases: {numeral(country.cases).format("0,0")}</div>
                <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
                <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
              </div>
            </Popup>
          </Circle>
        ))}
      </Map>
    </div>
  );
};
