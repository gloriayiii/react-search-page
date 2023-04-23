import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import "./details.css";

const ClinicalTrials = () => {
  const [studies, setStudies] = useState([]);
  const [positions,setPositions]= useState([])
  const location = useLocation();

// function preventDefault(event) {
//   event.preventDefault();
// }
function getData(){
  const data = location.state;
  console.log("data")
  console.log(data);
  setStudies([data]);
  console.log("position")
  setPositions(data.protocolSection.contactsLocationsModule.locations)
  console.log(data.protocolSection.contactsLocationsModule.locations)
}
  useEffect(() => {
    getData();
  }, []);

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
      </div>
    ))}
  </div>
  );
};

export default ClinicalTrials;