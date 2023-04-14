import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import Dashboard from './Dashboard';
import Review from './Review';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Dashboard />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}



const leftSquareBracket = '%5B';
const rightSquareBracket = '%5D';
const leftBracket = '%28';
const righBracket = '%29';
const spaceRep = '+';
const LOCATIONSECTION = 'Location';
const LocationCountry = 'LocationCountry';
const LocationState = 'LocationState';
const LocationCity = 'LocationCity';
const LocationZip = 'LocationZip';
const LocationStatus = 'LocationStatus';


const API_QUERY_ADDRESS_HEADER = 'https://clinicaltrials.gov/api/query/full_studies';


function AND() {
  return spaceRep+'AND'+spaceRep;
}

function SEARCH(subSection, condition){
  return 'SEARCH' + leftSquareBracket + subSection + rightSquareBracket + leftBracket + condition + righBracket;
}

function AREA(subSubSection, target){
  return 'AREA' + leftSquareBracket + subSubSection + rightSquareBracket + spaceRep + target;
}

/**
 * This function is aim to create expression string for invention
 * @param {String} expression 
 * @returns URL part for inventury
 * for example pthe expreesion is Waldenstrom
 * it should give ?expr=Waldenstrom
 */

function createInvention(expression) {
  expression = expression.trim();
  return '?expr=' + expression.replace(' ', spaceRep);;
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
function createSearchEXP(country,state,city, zip, status) {
  var expressiongURL;
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
  if(!status == ''){
    expressiongURL += AREA(LocationStatus,status);
    expressiongURL += AND();
    added = true;
  }
  if(added){
    expressiongURL = expressiongURL.substring(0,expressiongURL.length - ANDLength);
  }
  return SEARCH(LOCATIONSECTION,expressiongURL);
}


const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Search
          </Typography>
          {/* <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}