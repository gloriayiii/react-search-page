import React from "react";
import './App.css';
import Dashboard from './search/Dashboard';
import AddressForm from './search/AddressForm';
import Details from './search/details';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import Detail from './search/Detail';
import Filters from './search/listItems';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<AddressForm/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/dashboard/detail' element={<Details/>} />
      {/* <Route path='/dashboard/test' element={<Filters/>} /> */}
    </Routes>
    </>
  )
}

export default App;
