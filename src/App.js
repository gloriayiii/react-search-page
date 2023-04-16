import React from "react";
import './App.css';
import Dashboard from './search/Dashboard';
import AddressForm from './search/AddressForm';
import Details from './search/details';
import { Routes,Route } from 'react-router-dom';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<AddressForm/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/details' element={<Details/>} />
    </Routes>
    </>
  )
}

export default App;
