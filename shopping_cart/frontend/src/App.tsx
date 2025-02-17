import Home from './components/Home';
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Register from './components/auth/Register';
import NotFound from './components/404NotFound';
import Login from './components/auth/Login';
import { ToastContainer } from 'react-toastify';




function App() {


  return (
    <>
    <div>

      <BrowserRouter>
      <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/not-found" element={<NotFound/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
      
        
    </>
  )
}

export default App;
