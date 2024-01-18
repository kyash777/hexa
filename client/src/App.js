import './App.css';
import User from './comp';
import Login from './login.jsx';
import { useState } from 'react';
import {BrowserRouter,Navigate,Routes,Route,Outlet} from "react-router-dom";

const PrivateRoute=({isAuthenticated})=>{
  {console.log(isAuthenticated)}
  return (isAuthenticated?
  <Outlet/>
  :
  <Navigate replace to="/login"/>
  )

}
function App() {
  const [isAuthenticated,setAuthenticated]=useState(false);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login setAuthenticated={setAuthenticated}/>} ></Route>
      <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
        <Route path="/" element={<User/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
