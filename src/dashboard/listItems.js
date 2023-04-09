import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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

const distance = [
  {label:'20 miles'},
  {label:'50 miles'},
  {label:'100 miles'},
  {label:'200 miles'}
];


export const mainListItems = (
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
            defaultValue="Within"
            name="radio-buttons-group"
        >
        <FormControlLabel value="None" control={<Radio />} label="within" />
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
        />
        </Grid>

        <Grid item xs={10}>
        <TextField
            required
            id="Country"
            name="Country"
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            variant="outlined"
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

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);
