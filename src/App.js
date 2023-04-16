import './App.css';
import Dashboard from './search/Dashboard';
import AddressForm from './search/AddressForm';
import { Routes,Route } from 'react-router-dom';
import Detail from './search/Detail';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<AddressForm/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/dashboard/detail' element={<Detail/>} />
    </Routes>
    </>
  )
}

export default App;
