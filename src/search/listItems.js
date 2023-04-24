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
import Box from '@mui/material/Box';

import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import apiKey from '../config';
import { useForm } from "react-hook-form";
import axios from "axios";

const distances = [
  {label:'20 miles'},
  {label:'50 miles'},
  {label:'100 miles'},
  {label:'200 miles'}
];

//URL parse part

//parameters

const leftSquareBracket = '%5B';
const rightSquareBracket = '%5D';
const leftBracket = '%28';
const righBracket = '%29';
const spaceRep = '%20';
const comma = '%2C';
const colon = '%3A';
const LOCATIONSECTION = 'Location';
const LocationCountry = 'LocationCountry';
const LocationState = 'LocationState';
const LocationCity = 'LocationCity';
const LocationZip = 'LocationZip';
const LocationStatus = 'LocationStatus';

//URL headers
const API_QUERY_ADDRESS_HEADER = 'https://beta.clinicaltrials.gov/api/int/studies/download?format=json';

var resultData = {
  value : '',
  address : '',
  country : '',
  countryHTML : '',
  intervention : '',
  status : '' ,
  data : [],
  long : Number,
  lat : Number
}

function AND() {
  return spaceRep+'AND'+spaceRep;
}

function SEARCH(subSection, condition){
  return 'SEARCH' + leftSquareBracket + subSection + rightSquareBracket + leftBracket + condition + righBracket;
}

function AREA(subSubSection, target){
  return 'AREA' + leftSquareBracket + subSubSection + rightSquareBracket + spaceRep + target;
}

function DISTANCE(lat, long, distance) {
  return 'distance' + leftBracket + lat + comma + long + comma + distance + righBracket; //distance should also end with a mi for miles, for example '250mi'
}

function STATUS(status) {
  return 'status' + colon + status; //rec for recruiting
}



//URL componnet functions

/**
 * This function is aim to create expression string for invention
 * @param {String} expression 
 * @returns URL part for inventury
 * for example pthe expreesion is Waldenstrom
 * 
 */

function inventionFilter(expression) {
  expression = expression.trim();
  if(expression == '') return '';
  return '&query.intr=' + expression;
}

function aggFilter(expression) {
  expression = expression.trim();
  if(expression == '') return '';
  return '&aggFilters=' + expression;
}

function advanceFilter(expression) {
  expression = expression.trim();
  if(expression == '') return '';
  return '&filter.advanced=' + expression;
}

function geoFilter(expression) {
  expression = expression.trim();
  if(expression == '') return '';
  return '&filter.geo=' + expression;
}

/**
 * for the expr grammer see the API reference:
 * https://clinicaltrials.gov/api/gui/ref/syntax#searchExpr
 * Main objective is to use the search context operator in clinical trial API, references can be found at:
 * https://clinicaltrials.gov/api/gui/ref/expr#searchOp
 * @param {String} country 
 * the country that you will search at, if information not found use empty string
 * @param {String} state 
 * the state that you will search at, if information not found use empty string
 * @param {String} city 
 * the city that you will search at, if information not found use empty string
 * @param {String} zip 
 * the ZIP that you will search at, if information not found use empty string
 * @param {String} status
 * @returns 
 * a parsed URL component that can be used in API URL,
 * for example when we are going to search in Bethesda in maryland the expression will be 
 * SEARCH[Location](AREA[LocationCity] Bethesda AND AREA[LocationState] Maryland)
 * the result will be 
 * SEARCH%5BLocation%5D%28AREA%5BLocationCity%5D+Bethesda+AND+AREA%5BLocationState%5D+Maryland%29
 * 
 * @TODO
 * test it
 */
function createSearchEXP(country,state,city, zip) {
  var expressiongURL = '';
  var added = false;
  var ANDLength = AND().length;
  if(!country == ''){
    expressiongURL += AREA(LocationCountry,country);
    expressiongURL += AND();
    added = true;
  }
  if(!state == ''){
    expressiongURL += AREA(LocationState,state);
    expressiongURL += AND();
    added = true;
  }
  if(!city == ''){
    expressiongURL += AREA(LocationCity,city);
    expressiongURL += AND();
    added = true;
  }
  if(!zip == ''){
    expressiongURL += AREA(LocationZip,zip);
    expressiongURL += AND();
    added = true;
  }
  if(added){
    expressiongURL = expressiongURL.substring(0,expressiongURL.length - ANDLength);
  }
  //console.log(expressiongURL);
  return SEARCH(LOCATIONSECTION,expressiongURL);
}

function searchUseMiles(long, lat, miles, status, invention){
  //pre-parse

  // miles
  miles = miles.substring(0, miles.length - 6 ) + 'mi';

  //status
  if(status == 'Recruiting'){
    status = 'rec'
  }

  //expression
  return API_QUERY_ADDRESS_HEADER + inventionFilter(invention) + aggFilter(STATUS(status)) + geoFilter(DISTANCE(long,lat,miles));
}

function searchUseAddress(address, status, invention){
  //pre-parse

  //TODO: address
  var country, state, city, zip = '';
  country = "United States";
  country = country.replace(' ', spaceRep);
  state = 'Maryland';
  //status
  if(status == 'Recruiting'){
    status = 'rec'
  }

  //expression
  return API_QUERY_ADDRESS_HEADER + inventionFilter(invention) + aggFilter(STATUS(status)) + advanceFilter(createSearchEXP(country,state,city,zip));
}

export default function Filters() {
  const location = useLocation();
  const data=location.state;
  console.log(data);
  const [value, setValue] = React.useState(data.value);
  const [distance, setDistance] = React.useState(data.distance);
  const [address, setAddress] = React.useState(data.address);
  const [status, setStatus] = React.useState(data.status);
  const [country, setCountry] = React.useState(data.country);
  const [intervention, setIntervention] = React.useState(data.intervention);
  const [formattedCountry, setFormattedCountry] =  React.useState('');
  const [place , setPlace] = React.useState();
  const [long, setLong] = React.useState(data.long);
  const [lat, setLat] = React.useState(data.lat);

  const PlaceinputRef = useRef('');
  const CountryinputRef = useRef();

  const { register, handleSubmit } = useForm();
  const [ addressError,setAddressError ] = React.useState('');
  const [ countryError,setcountryError ] = React.useState('');

  const navigate = useNavigate();

  async function handleSearchURL() {
    //console.log(value, distance.label, address,country,zip,intervention,status);
    var searchURL;
    resultData.value = value;
    // resultData.address = address;
    if(value == 'within'){
      console.log(place);
      resultData.distance = distance;
      if(!place || place == undefined){
        console.log('no place check');
        // var long = data.long;
        // var lat = data.lat;
        resultData.address = address;
        // resultData.long = long;
        // resultData.lat = lat;
        searchURL = searchUseMiles(long,lat,distance.label,status,intervention);
        // setAddressError('Address is required!');
        // return false;
      }
      //DONE: set up long and lat from address
      if(place){
      var curLong = place.geometry.location.lat();
      var curLat = place.geometry.location.lng();
      setLat(curLat);
      setLong(curLong);
      searchURL = searchUseMiles(curLong,curLat,distance.label,status,intervention);
      resultData.address = place.formatted_address;
      }
      resultData.long = long;
      resultData.lat = lat;
      // resultData.distance = distance;
      // resultData.address = place.formatted_address;
      resultData.status = status;
      resultData.intervention = intervention;
    }

    if(value == 'Country'){
      if(!country){
        setcountryError('Country is required!');
        return false;
      }
      searchURL = searchUseAddress(country,status,intervention);
      resultData.country = formattedCountry;
      resultData.countryHTML = country;
      resultData.intervention = intervention;
      resultData.status = status;
    }
  
    var response = [];
    console.log(resultData);
    try {
      response = await axios.get(searchURL);
      resultData.data = response.data;
      console.log(resultData);
  
      // let path = `../dashboard`; 
      // navigate(location.pathname,{state : resultData});
      // window.location.reload();

      
    } catch (error) {
      console.error(error);
    }
  };

  const goBack = () => {
  let path='../';
  navigate(path);
  };


  const handleRadioChanged = (event) => {
    setValue(event.currentTarget.value);
    console.log(value);
  }

  const handlePlaceChanged = () => { 
    const [ place ] = PlaceinputRef.current.getPlaces();
    if(place) { 
        console.log(place.formatted_address);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
        setPlace(place);
        setAddress(place.formatted_address);
    }       
}

const handleCountryChanged = () => { 
    const [ country ] = CountryinputRef.current.getPlaces();
    if(country){
      console.log(country.formatted_address);
      setCountry(country.formatted_address);
    }
     
    
}

  return(  
  <Container fixed maxWidth="xs">
  <Box component="form" onSubmit={handleSubmit(handleSearchURL)}>
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
            value={intervention}
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
            onChange={handleRadioChanged}
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
        onLoad={ref => PlaceinputRef.current = ref}
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
            // {...register('address')}
            // error={addressError&&addressError.length ? true:false}
            // helperText={addressError}
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
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={handleRadioChanged}
        >
        <FormControlLabel value="Country" control={<Radio />} label="In Country, State, or City" />
        </RadioGroup>
        </FormControl>
        </Grid>
      <Grid item xs={12}>
      <LoadScript googleMapsApiKey = {apiKey.REACT_GOOGLE_API_KEY} libraries={["places"]}>
        <StandaloneSearchBox
        onLoad={ref => CountryinputRef.current = ref}
        onPlacesChanged={handleCountryChanged}>  
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
        <Button variant='contained' size='large' style={{float:'right'}} onClick={handleSearchURL}>Update</Button>
      </div>
      </div>
      </div>

   <br></br>  
  </React.Fragment>
  </Box>
  </Container>
  );
};



