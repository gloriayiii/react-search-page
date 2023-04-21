import * as React from 'react';
import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { useNavigate,useLocation } from 'react-router-dom';
import { useRef } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import apiKey from '../config';

const distances = [
  {label:'20 miles'},
  {label:'50 miles'},
  {label:'100 miles'},
  {label:'200 miles'}
];


export default function Filters() {
  const location = useLocation();
  const data=location.state;
  console.log(data);
  const [value, setValue] = React.useState(data.value);
  const [distance, setDistance] = React.useState(data.distance);
  const [address, setAddress] = React.useState(data.address);
  const [status, setStatus] = React.useState(data.status);
  const [country, setCountry] = React.useState(data.country);

  let navigate = useNavigate();
  const goBack = () => {
  let path='../';
  navigate(path);
  };

  const inputRef = useRef();
  const handlePlaceChanged = () => { 

      const [ place ] = inputRef.current.getPlaces();
      if(place) { 
          console.log(place.formatted_address)
          console.log(place.geometry.location.lat())
          console.log(place.geometry.location.lng())
      } 
  }

  const test = () => {
    console.log(address);
  }

  return(  
  <Container fixed maxWidth="xs">
  <React.Fragment>
      <div style={{marginLeft:"20px",marginTop:"20px",marginRight:"20px"}}>
      <br></br>
      <Button variant="text">Condition or diease</Button>
      <Grid container item xs={12}>
          <TextField
            required
            id="Intervention"
            name="Intervention"
            label="Condition or diease"
            fullWidth
            variant="outlined"
          />
        </Grid>
        {/* </div>

      <div style={{marginLeft:"20px"}}> */}
      <br></br>
      <Button variant="text">Location</Button>
      <Grid container spacing={2}>
      
      <Grid item xs={12} sm={3}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={(e)=>setValue(e.currentTarget.value)}
        >
        <FormControlLabel value="within" control={<Radio />} label="Within" />
        </RadioGroup>
        </FormControl>
        </Grid>

        <Grid item xs={12} sm={9}>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={distances}
            // sx={{ width: 100 }}
            renderInput={(params) => <TextField {...params} label="Distance" />}
            onChange={(event,value)=>setDistance(value)}
            value={distance}
        />
        </Grid>

        <Grid item xs={12}>
        <LoadScript googleMapsApiKey = {apiKey.REACT_GOOGLE_API_KEY} libraries={["places"]}>
        <StandaloneSearchBox
        onLoad={ref => inputRef.current = ref}
        onPlacesChanged={handlePlaceChanged}>                   
        <TextField
            required
            id="Address"
            name="Address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            value={address}
            onChange={(event)=>setAddress(event.currentTarget.value)}
          />
        </StandaloneSearchBox>
        </LoadScript>
        </Grid>

        </Grid>
        {/* </div>

      <div style={{marginLeft:"20px"}}> */}
      <br></br>
      <Button variant="text">In Country, State or City</Button>
      <Grid container spacing={2}>
      <Grid item xs={12}>
      <LoadScript googleMapsApiKey = {apiKey.REACT_GOOGLE_API_KEY} libraries={["places"]}>
        <StandaloneSearchBox
        onLoad={ref => inputRef.current = ref}
        onPlacesChanged={handlePlaceChanged}>  
        <TextField
            required
            id="Country"
            name="Country"
            label="Country"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            onChange={(event)=>setCountry(event.currentTarget.value)}
            value={country}
          />
        </StandaloneSearchBox>
        </LoadScript>
        </Grid>
      <br></br>
      {/* <Grid item xs={12} sm={6}>
        <TextField
            required
            id="Zipcode"
            name="Zipcode"
            label="Zipcode"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
          />
        </Grid> */}
        </Grid>

      <br></br>
      <div>
      <div>
        <Button variant='contained' size='large' style={{float:'left'}} onClick={goBack}>Back</Button>
        {/* <Button variant='contained' size='large' style={{marginRight:'10px'}}>Update</Button> */}
        {/* <Button variant='contained' size='large' marginLeft='100px'>Update</Button> */}
      </div>
      {/* <div style={{marginRight:'0px'}}> */}
      <div>
        <Button variant='contained' size='large' style={{float:'right'}} onClick={test}>Update</Button>
      </div>
      </div>
      </div>

   <br></br>  
  </React.Fragment>
  </Container>
  );
};



