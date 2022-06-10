import './App.css';
import { useState } from 'react';
import { UserProvider } from './UserContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'; 
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductPage from './pages/ProductPage';
import Register from './pages/Register';
import Logout from './pages/Logout';
import SpecificProduct from './pages/SpecificProduct';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ErrorPage from './pages/ErrorPage';

function App() {

  const [user, setUser] = useState({
    accessToken: localStorage.getItem('accessToken'), 
    isAdmin: localStorage.getItem('isAdmin') === 'true'
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  return (

    <UserProvider value={{user, setUser, unsetUser}}>
      <BrowserRouter>
        <AppNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/products" element={<ProductPage />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/cart" element={<CartPage />}/>
            <Route path="/products/:productId" element={ <SpecificProduct /> }/>
            <Route path="/orders" element={<OrdersPage />}/>
            <Route path="*" element={<ErrorPage />}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </UserProvider>

    
  );
}

export default App;
