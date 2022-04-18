import logo from './logo.svg';
import './App.css';
import { Home } from './Home';
import { Site } from './Site';
import { Employee } from './Employee';
import { Navigation } from './Navigation';
import { Attendance } from './Attendance';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { Expense } from './Expense';
import { AdvancePayment } from './AdvancePayment';
import { HoursReport } from './HoursReport';

function App() {
  return (
    <BrowserRouter>
    
    <div className="container">
     <h3 className='m-3 d-flex justify-content-center'>
       מערכת לניהול עובדים
     </h3>

     <Navigation/>
     <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/site" element={<Site/>} />
       <Route path="/employee" element={<Employee/>} />
       <Route path="/attendance" element={<Attendance/>} />
       <Route path="/advancePayment" element={<AdvancePayment/>} />
       <Route path="/expense" element={<Expense/>} />
       <Route path="/hoursReport" element={<HoursReport/>} />
     </Routes>
    </div>
    </BrowserRouter>
  );
}


export default App;
