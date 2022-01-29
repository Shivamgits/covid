import React from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import { showDataOnMap } from "../utils";
import "./Map.css";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom}>
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>{" "}
        contributors'
        {/* <Marker position={[51.505, -0.09]}>
        </Marker> */}
        {/* loop through all countries and make circle */}
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
