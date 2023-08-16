import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SignUp from './component/SignUp';
import SignIn from "./component/SignIn";
import DashBoard from "./component/Dashboard";
import ProductDetail from "./component/ProductDetail";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/dashboard/:params" element={<DashBoard />} />
          <Route path="/details/:paramsone" element={<ProductDetail />} />
          <Route path="*" element={<h1>Oops Error!</h1>} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
