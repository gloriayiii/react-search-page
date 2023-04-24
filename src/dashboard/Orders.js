import * as React from 'react';
// import Link from '@mui/material/Link';
import { useNavigate,useLocation } from 'react-router-dom';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { SelectUnstyled } from '@mui/base';


// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }


export default function Orders() {
const [studies, setStudies] = React.useState([]);
const location = useLocation();
let navigate = useNavigate();

// function preventDefault(event) {
//   event.preventDefault();
// }
function getData(){
  const data=location.state;
  console.log(data['data']);
  setStudies(data['data']);
}

function navigateToDetailPage(study) {
  // const history = useHistory();
  // const data = JSON.stringify(study);
  // history.push(`/dashboard/detail?data=${data}`);
  console.log(study);
  const path =  '/dashboard/detail'
  navigate(path,{state : study});
}

const getFirst150Words = (text) => {
  return text.split(' ').slice(0, 150).join(' ');
};


useEffect(() => {
    getData();
}, []);

  return (
    <React.Fragment>
      <div>
      {studies.map((study, index) => (
      <div className="study" key={index}>
      <Card sx={{ minWidth:200 }} spacing={10}>
      <CardContent>
        <Typography variant="h5" component="div">
          {/* <Link to={{ pathname: '/dashboard/detail', state: study }}>Trial{index+1}</Link> */}
          <a onClick={() => navigateToDetailPage(study)}>{study.protocolSection.identificationModule.briefTitle}</a>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <p>{getFirst150Words(study.protocolSection.descriptionModule.briefSummary)}</p>
        </Typography>
        <Typography color="text.secondary">
          Location
        </Typography>
        <Typography variant="body2">
          {study.protocolSection.contactsLocationsModule.locations &&
                study.protocolSection.contactsLocationsModule.locations.slice(0, 5).map((location, idx) => (
                <p key={idx}>
                    <li>Location{idx+1} :{location.city},{location.state},{location.country}</li>
                    <br></br>
                </p>
                ))}
          <br></br>
        </Typography>
      </CardContent>
      </Card>
      <br></br>
      </div>
      ))}
      </div>
    </React.Fragment>
  );
}
