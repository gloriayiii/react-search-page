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

const theme = createTheme();

const distances = [
  {label:'20 miles'},
  {label:'50 miles'},
  {label:'100 miles'},
  {label:'200 miles'}
];

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

const inputRef = useRef();
const handlePlaceChanged = () => { 
  // console.log('test point here');
  // console.log(address);
    const [ place ] = inputRef.current.getPlaces();
    if(place) { 
        console.log(place.formatted_address)
        console.log(place.geometry.location.lat())
        console.log(place.geometry.location.lng())
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
                  onClick={routeChange}
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

