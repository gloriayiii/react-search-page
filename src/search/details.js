import React, { useState, useEffect } from "react";
import axios from "axios";
import "./details.css";

const ClinicalTrials = () => {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://beta.clinicaltrials.gov/api/int/studies/download?format=json&query.intr=waldenstrom&aggFilters=status%3Arec&filter.geo=distance%2840.4443533%2C-79.960835%2C250mi%29"
        );
        setStudies(response.data);
        console.log(studies)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
    {studies.map((study, index) => (
      <div className="study" key={index}>
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
          <p>{study.protocolSection.contactsLocationsModule.centralContacts.name}</p>
            {/* {study.protocolSection.contactsLocationsModule.centralContacts.map((contact, idx) => (
              <p key={idx}>
                <li>{contact.name}</li>
                <li>{contact.phone}</li>
              </p>
            ))}
          </ul> */} 
          {/* <li>{study.protocolSection.contactsLocationsModule.centralContacts.name}</li>
          <li>{study.protocolSection.contactsLocationsModule.centralContacts.phone}</li>
          <li>{study.protocolSection.contactsLocationsModule.centralContacts.email}</li> */}

        </div>
      </div>
    ))}
  </div>
  );
};

export default ClinicalTrials;