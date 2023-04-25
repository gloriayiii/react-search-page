import { GoogleMap, MarkerF, LoadScript } from "@react-google-maps/api";
import GOOGLE_MAP_CONFIG from "../config";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

export default function Map({center: defaultCenter}){
  const location = useLocation();
  const [positions, setPositions] = useState([]);
  const [center, setCenter] = useState([]);
  const [studies, setStudies] = useState([]);

  function getData() {
    const data = location.state;
    console.log("data")
    console.log(data);
    setStudies([data]);
    setPositions(data.protocolSection.contactsLocationsModule.locations)
    console.log(data.protocolSection.contactsLocationsModule.locations)
    setCenter({
      lat: parseFloat(data.protocolSection.contactsLocationsModule.locations[0].geoPoint.lat),
      lng: parseFloat(data.protocolSection.contactsLocationsModule.locations[0].geoPoint.lon)
    })
  }

  useEffect(() => {
    getData();
    if (defaultCenter && defaultCenter.lat && defaultCenter.lng) {
      setCenter(defaultCenter);
    }
  }, [defaultCenter]);

  return (
    <LoadScript
    googleMapsApiKey = {GOOGLE_MAP_CONFIG.REACT_GOOGLE_API_KEY}
    libraries = {GOOGLE_MAP_CONFIG.LIBRARIES}
    >
    <GoogleMap
    mapContainerStyle = {mapContainerStyle}
    center = {center}
    zoom = {10}
    >
    {studies.map((study, index) => (
      <div className="study" key={index}>
      {study.protocolSection.contactsLocationsModule.locations &&
        study.protocolSection.contactsLocationsModule.locations.map((location, idx) => (
        <MarkerF key={idx} position={{
            lat: parseFloat(location.geoPoint.lat),
            lng: parseFloat(location.geoPoint.lon)
        }} />
    ))}
      </div>
    ))}

    </GoogleMap>
    </LoadScript>
  );
}
