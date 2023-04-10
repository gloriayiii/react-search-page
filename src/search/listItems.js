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
import Button from '@mui/material/Button';

const distance = [
  {label:'20 miles'},
  {label:'50 miles'},
  {label:'100 miles'},
  {label:'200 miles'}
];


export default function Filters() {
  const [value, setValue] = React.useState('within');
  const [distance, setDistance] = React.useState('');
  const [address, setAddress] = React.useState('');

  return(
  <React.Fragment>
      <div style={{marginLeft:"20px"}}>
      <br></br>
      <Button variant="text">Condition or diease</Button>
      <Grid container xs={12} sm={10}>
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

        <Grid item xs={12} sm={7}>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={distance}
            // sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Distance" />}
            onChange={(event,value)=>setDistance(value)}
        />
        </Grid>

        <Grid item xs={10}>
        <TextField
            required
            id="Address"
            name="Address"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
            onChange={(event)=>setAddress(event.currentTarget.value)}
          />
        </Grid>

        </Grid>
        {/* </div>

      <div style={{marginLeft:"20px"}}> */}
      <br></br>
      <Button variant="text">In Country, State or City</Button>
      <Grid container spacing={2}>
      <Grid item xs={10}>
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
      <br></br>
      <Grid item xs={12} sm={6}>
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
        </Grid>

      <br></br>
      <div>
      <div>
        <Button variant='contained' size='large' style={{float:'left'}}>Back</Button>
        {/* <Button variant='contained' size='large' style={{marginRight:'10px'}}>Update</Button> */}
        {/* <Button variant='contained' size='large' marginLeft='100px'>Update</Button> */}
      </div>
      <div style={{marginRight:'80px'}}>
        <Button variant='contained' size='large' style={{float:'right'}}>Update</Button>
      </div>
      </div>
      </div>

   <br></br>  
  </React.Fragment>
  );
};



