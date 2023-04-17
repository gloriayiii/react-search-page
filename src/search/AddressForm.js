import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Divider, Skeleton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
// import { useJsApiLoader } from '@react-google-maps/api';
// import { Autocomplete } from "react-google-autocomplete";
// import { usePlacesWidget } from "react-google-autocomplete";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import data from '../config';
import axios from "axios";


const theme = createTheme();

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


// LOGICAL and grammer expressions
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




export default function AddressForm() {
let navigate = useNavigate();
const routeChange = () =>{ 
  // console.log(value);
  let path = `dashboard`; 
  navigate(path,{state : address});
};

const [value, setValue] = React.useState('within');
const [distance, setDistance] = React.useState('');
const [address, setAddress] = React.useState('');
const [country,setCountry] = React.useState('');
const [zip,setZipcode] = React.useState('');
const [intervention,setIntervention] = React.useState('waldenstrom');
const [status,setStatus] = React.useState('rec');
const [place , setPlace] = React.useState();

//create address info
const handleSearch = () =>{
  //console.log(value, distance.label, address,country,zip,intervention,status);
  var searchURL;
  var resultData = {
    value : '',
    address : '',
    country : '',
    intervention : '',
    status : '' ,
    data : ''
  };
  resultData.value = value;
  if(value == 'within'){
    //DONE: set up long and lat from address
    var long = place.geometry.location.lat();
    var lat = place.geometry.location.lng();
    searchURL = searchUseMiles(long,lat,distance.label,status,intervention);
    resultData.address = place.formatted_address;
    resultData.status = status;
    resultData.intervention = intervention;
  }
  if(value == 'Country'){
    searchURL = searchUseAddress(country,status,intervention);
    resultData.country = country;
    resultData.intervention = intervention;
    resultData.status = status;
  }
  //console.log(searchURL);
  axios.get(searchURL).then(response => {
      resultData.data = response.data;
  });
  //{
  //  address: address
  //  country: ? 
  //  invention:
  //  status:
  //  data: {[
  //   ....
  //]}
  //}
  console.log(resultData);
  let path = `dashboard`; 
  navigate(path,{state : resultData});
}

const inputRef = useRef();

const handlePlaceChanged = () => { 
  // console.log('test point here');
  // console.log(address);
    const [ place ] = inputRef.current.getPlaces();
    if(place) { 
        console.log(place.formatted_address);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
        setPlace(place);
    }
     
    
}


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: 'relative',
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          IWMF
        </Typography>
      </Toolbar>
    </AppBar>

    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
      <Typography component="h1" variant="h4" align="center">
        Search
      </Typography>
      <br></br>
      <Divider />
    <React.Fragment>
    <br></br>
      <Grid container spacing={6}>

      <Grid item xs={12} sm={1.5}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="within"
            name="radio-buttons-group"
            value={value}
            onChange={(e)=>setValue(e.currentTarget.value)}
        >
        <FormControlLabel value="within" control={<Radio />} label="within" />
        </RadioGroup>
        </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={distances}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Distance" />}
            onChange={(event,value)=>setDistance(value)}
        />
        </Grid>

        <Grid item xs={12} sm={7.5}>        
        <LoadScript googleMapsApiKey = {data.REACT_GOOGLE_API_KEY} libraries={["places"]}>
        <StandaloneSearchBox
            onLoad={ref => inputRef.current = ref}
            onPlacesChanged={handlePlaceChanged}
                >
          <TextField
            required
            id="address1"
            name="address1"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            onChange={(event)=>setAddress(event.currentTarget.value)}
          />       
        </StandaloneSearchBox>
        </LoadScript>
        </Grid>



      <Grid item xs={12} sm={4}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={value}
            onChange={(e)=>setValue(e.currentTarget.value)}
        >
        <FormControlLabel value="Country" control={<Radio />} label="In Country, State, or City" />
        </RadioGroup>
        </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="Country"
            name="Country"
            label="Country"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            onChange={(event)=>setCountry(event.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="Zipcode"
            name="Zipcode"
            label="Zipcode"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            onChange={(event)=>setZipcode(event.currentTarget.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="Intervention"
            name="Intervention"
            label="Intervention/Treatment"
            fullWidth
            variant="outlined"
            defaultValue="Waldenstrom"
            onChange={(event)=>setIntervention(event.currentTarget.value)}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="Status"
            name="Status"
            label="Status"
            fullWidth
            variant="outlined"
            defaultValue="Recruiting"
            onChange={(event)=>setStatus(event.currentTarget.value)}
          />
        </Grid>

      </Grid>
      {/* </StandaloneSearchBox>
        </LoadScript> */}
      <React.Fragment>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  sx={{ mt: 3, ml: 1 }}
                  onClick={handleSearch}
                >Search
                </Button>
              </Box>
            </React.Fragment>
    </React.Fragment>
    </Paper>
    </Container>
    </ThemeProvider>
  );
}

