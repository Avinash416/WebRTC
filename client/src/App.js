import {BrowserRouter,Routes,Route, Outlet, Navigate}  from "react-router-dom"
import Login from './components/login'
import Register from "./components/Register";
import RecordAndUpload from "./components/RecordAndUpload";
import { loginContext } from "./Context/LoginContext";
import { useContext } from "react";


const ProtectedRoute =({isAuthenticated,...props})=>{
  console.log(isAuthenticated)
  return isAuthenticated ?  <><Outlet/></>:<Navigate replace to='/' />
} 

function App() {
  const {login}=useContext(loginContext);
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<Login />}/>
    <Route exact path='/register' element={<Register />}/>
    
    <Route path="/record" element={<ProtectedRoute isAuthenticated={login}/>}>
    <Route exact path='/record' element={<RecordAndUpload />}/>
    </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
