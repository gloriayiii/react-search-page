import React, { useState, useEffect } from "react";
import axios from "axios";
import "./details.css";

const ClinicalTrials = () => {
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://clinicaltrials.gov/api/query/full_studies?expr=waldenstrom&min_rnk=1&max_rnk=&fmt=json"
        );
        setStudies(response.data.FullStudiesResponse.FullStudies);
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
          <p>{study.Study.ProtocolSection.DescriptionModule.BriefSummary}</p>
        </div>
        <div className="table">
          <h3>Participation Criteria</h3>
          <p>{study.Study.ProtocolSection.IdentificationModule.OfficialTitle}</p>
          <ul>
            {study.Study.ProtocolSection.ArmsInterventionsModule.ArmGroupList.ArmGroup.map((arm, idx) => (
              <p key={idx}>
                <li>{arm.ArmGroupLabel}</li>
                <li>{arm.ArmGroupType}</li>
                <li>{arm.ArmGroupDescription}</li>
              </p>
            ))}
          </ul>
          <h3>Eligibility Criteria</h3>
          <li>{study.Study.ProtocolSection.EligibilityModule.EligibilityCriteria}</li>
        </div>
        <div className="table">
          <h3>Trail contact</h3>
          <li>{study.Study.ResultsSection.MoreInfoModule.PointOfContact.PointOfContactTitle}</li>
          <li>{study.Study.ResultsSection.MoreInfoModule.PointOfContact.PointOfContactOrganization}</li>
          <li>{study.Study.ResultsSection.MoreInfoModule.PointOfContact.PointOfContactEMail}</li>
          <li>{study.Study.ResultsSection.MoreInfoModule.PointOfContact.PointOfContactPhone}</li>
        </div>
      </div>
    ))}
  </div>
  );
};

export default ClinicalTrials;