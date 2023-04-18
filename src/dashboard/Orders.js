import * as React from 'react';
// import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}



export default function Orders() {


    const [studies, setStudies] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://beta.clinicaltrials.gov/api/int/studies/download?format=json&query.intr=waldenstrom&aggFilters=status%3Arec&filter.geo=distance%2840.4443533%2C-79.960835%2C250mi%29"
          );
          setStudies(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
    return (
      <React.Fragment>
        <div>
        {studies.map((study, index) => (
        <div className="study" key={index}>
        <Card sx={{ minWidth:200 }} spacing={10}>
        <CardContent>
          <Typography variant="h5" component="div">
            <Link to={`/dashboard/detail`}>Trial{index+1}</Link>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <p>{study.protocolSection.descriptionModule.briefSummary}</p>
          </Typography>
          <Typography color="text.secondary">
            Location
          </Typography>
          <Typography variant="body2">
            Location1:xxx
            <br></br>
            Location2:xxx
          </Typography>
        </CardContent>
        </Card>
        <br></br>
        </div>
        ))}
        </div>
        {/* <Card sx={{ minWidth:200 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            <Link to={`/dashboard/detail`}>Trial2</Link>
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Details Information
          </Typography>
          <Typography color="text.secondary">
            Location
          </Typography>
          <Typography variant="body2">
            Location1:xxx
            <br></br>
            Location2:xxx
          </Typography>
        </CardContent>
        </Card> */}
        {/* <Title>Recent Orders</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Ship To</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell align="right">Sale Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align="right">{`$${row.amount}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
      </React.Fragment>
    );


  // return (
  //   <React.Fragment>
  //     <Card sx={{ minWidth:200 }} spacing={10}>
  //     <CardContent>
  //       <Typography variant="h5" component="div">
  //         <Link to={`/dashboard/detail`}>Trial1</Link>
  //       </Typography>
  //       <Typography sx={{ mb: 1.5 }} color="text.secondary">
  //         Details Information
  //       </Typography>
  //       <Typography color="text.secondary">
  //         Location
  //       </Typography>
  //       <Typography variant="body2">
  //         Location1:xxx
  //         <br></br>
  //         Location2:xxx
  //       </Typography>
  //     </CardContent>
  //     </Card>
  //     <br></br>
  //     <Card sx={{ minWidth:200 }}>
  //     <CardContent>
  //       <Typography variant="h5" component="div">
  //         <Link to={`/dashboard/detail`}>Trial2</Link>
  //       </Typography>
  //       <Typography sx={{ mb: 1.5 }} color="text.secondary">
  //         Details Information
  //       </Typography>
  //       <Typography color="text.secondary">
  //         Location
  //       </Typography>
  //       <Typography variant="body2">
  //         Location1:xxx
  //         <br></br>
  //         Location2:xxx
  //       </Typography>
  //     </CardContent>
  //     </Card>
  //     {/* <Title>Recent Orders</Title>
  //     <Table size="small">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Date</TableCell>
  //           <TableCell>Name</TableCell>
  //           <TableCell>Ship To</TableCell>
  //           <TableCell>Payment Method</TableCell>
  //           <TableCell align="right">Sale Amount</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {rows.map((row) => (
  //           <TableRow key={row.id}>
  //             <TableCell>{row.date}</TableCell>
  //             <TableCell>{row.name}</TableCell>
  //             <TableCell>{row.shipTo}</TableCell>
  //             <TableCell>{row.paymentMethod}</TableCell>
  //             <TableCell align="right">{`$${row.amount}`}</TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table> */}
  //   </React.Fragment>
  // );
}
