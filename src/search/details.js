import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./details.css";
import Map from '../search/map';
/* global google */
// const mapContainerStyle = {
//   width: "100%",
//   height: "100%",
// }
export default function ClinicalTrials(){
  const [studies, setStudies] = useState([]);
  const [positions, setPositions] = useState([])
  const location = useLocation();
  const [center, setCenter] = useState([]); // change Google map center location
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(null);  // change selected <li> color

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  function getData() {
    const data = location.state;
    console.log("data")
    console.log(data);
    setStudies([data]);
    console.log("position")
    setPositions(data.protocolSection.contactsLocationsModule.locations)
    console.log(data.protocolSection.contactsLocationsModule.locations)
    setCenter({
      lat: parseFloat(data.protocolSection.contactsLocationsModule.locations[0].geoPoint.lat),
      lng: parseFloat(data.protocolSection.contactsLocationsModule.locations[0].geoPoint.lon)
    })
  }

  useEffect(() => {
    getData();
  }, []);


  const handleLiClick = (locationIndex, location) => {  // <li> click function
    setCenter({
      lat: parseFloat(location.geoPoint.lat),
      lng: parseFloat(location.geoPoint.lon)
    });
    setSelectedLocationIndex(locationIndex);
  };


  function addLineBreaks(str) {
    const substrings = str.split(/(\s\d+\.\s+)/).filter(Boolean);
    return (
      <li>
        {substrings.map((substring, i) =>
          substring.match(/^\s\d+\.\s+/) ? (
            <React.Fragment key={i}>
              <br />
              <br />
              {i > 0 && <br />}
              {substring}
            </React.Fragment>
          ) : (
            <React.Fragment key={i}>{substring}</React.Fragment>
          )
        )}
      </li>
    );
  }
  return (
    <div>
      <button onClick={handleGoBack}>Back to previous page</button>
      {studies.map((study, index) => (
        <div className="study" key={index}>
          <div className="table">
            <h1>{study.protocolSection.identificationModule.officialTitle}</h1>
          </div>
          <div className="table">
            <h3>Study Overview</h3>
            <p>
              {study.protocolSection.descriptionModule.briefSummary.split("*").map((item, index) => {
                if (item.includes(':')) {
                  const splitItem = item.split(':');
                  return (
                    <React.Fragment key={index}>
                      {index > 0 && <><br /><br /></>} {/* add 2 line break after the first item */}
                      <strong>{splitItem[0]}:</strong> {splitItem[1].trim()} {/* Bold the first item and remove any leading or trailing whitespace from the second item */}
                    </React.Fragment>
                  )
                } else {
                  return (
                    <React.Fragment key={index}>
                      {index > 0 && <br />} {/* Only add a line break after the first item */}
                      {item.trim()} {/* Remove any leading or trailing whitespace */}
                    </React.Fragment>
                  )
                }
              })}
            </p>
          </div>
          <div className="table">
            <h3>Participation Criteria</h3>
            <p>{study.protocolSection.identificationModule.OfficialTitle}</p>
            <ul>
              {study.protocolSection.armsInterventionsModule.armGroups.map((arm, idx) => (
                <p key={idx}>
                  <li>{arm.label}</li>
                  <li>{arm.description}</li>
                </p>
              ))}
            </ul>
            <h3>Eligibility Criteria</h3>
            <p>{addLineBreaks(study.protocolSection.eligibilityModule.eligibilityCriteria)}</p>

          </div>
          <div className="table">
            <h3>Trail contact</h3>
            {study.protocolSection.contactsLocationsModule.centralContacts &&
              study.protocolSection.contactsLocationsModule.centralContacts.map((contact, idx) => (
                <p key={idx}>
                  <li>{contact.name}</li>
                  <li>{contact.phone}</li>
                  <li>{contact.email}</li>
                </p>
              ))}
          </div>
          <div className="table">
            <h3>Location</h3>
            <div className="row">
              <div className="columnleft">
                <div className="container">
                  <div className="slider">
                    {study.protocolSection.contactsLocationsModule.locations &&
                      study.protocolSection.contactsLocationsModule.locations.map((location, idx) => (
                        <p key={idx}>
                          <li
                            onClick={() => handleLiClick(idx, location)}
                            className={selectedLocationIndex === idx ? "selected" : ""}
                          >
                            {`# ${idx + 1} ${location.city}, ${location.country}, ${location.zip}`}
                          </li>
                        </p>
                      ))}
                  </div>
                </div>
              </div>
              <div className="columnright">
                <Map />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
