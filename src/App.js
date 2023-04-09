import './App.css';
import Dashboard from './search/Dashboard';
import AddressForm from './search/AddressForm';
import { Routes,Route } from 'react-router-dom';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<AddressForm/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </>
  )
}

export default App;
