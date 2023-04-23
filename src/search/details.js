import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import "./details.css";

const ClinicalTrials = () => {
  const [studies, setStudies] = useState([]);
  const location = useLocation();

// function preventDefault(event) {
//   event.preventDefault();
// }
function getData(){
  const data = location.state;
  console.log("data")
  console.log(data);
  setStudies([data]);
}
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
    {studies.map((study, index) => (
      <div className="study" key={index}>
        <div className="table">
          <h3>Titiel</h3>
          <p>{study.protocolSection.identificationModule.officialTitle}</p>
        </div>
        <div className="table">
          <h3>Study Overview</h3>
          <p>{study.protocolSection.descriptionModule.briefSummary}</p>
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
          <li>{study.protocolSection.eligibilityModule.eligibilityCriteria}</li>
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