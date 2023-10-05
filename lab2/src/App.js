import React, {useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Outlet} from 'react-router-dom'
import {NavLink,useNavigation} from 'react-router-dom';
import "bootstrap/dist/js/bootstrap.bundle.min";
import Salad from './Salad'

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    
      Object.keys(localStorage).forEach(uuid => {
        
      if(!shoppingCart.find(sallad => sallad.uuid===uuid)) {
      const sallad = Salad.parse(window.localStorage.getItem(uuid));
      
      setShoppingCart([...shoppingCart,sallad]);
      }
   });
  });

  function addNewSallad(sallad) {
    let newShoppingCart = [...shoppingCart,sallad];
    setShoppingCart(newShoppingCart);
    window.localStorage.setItem(sallad.uuid,JSON.stringify(sallad))
  }

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      
      <Outlet context={{shoppingCart, addNewSallad,setShoppingCart }} /> 
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">
          Komponera en sallad
          <BootstrapSpinner/>
        </NavLink>
        </li>
        <li>
        <NavLink className="nav-link" to="/view-order">
          Visa beställning
          </NavLink>
        </li>
    </ul>);
}
function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Min egen salladsbar</span>
    </header>
  );
}

function Footer() {
  return (
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
  );
}

function BootstrapSpinner() {
  const nav = useNavigation();
  if(nav.state==="loading") {
    return <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
  }
}



export default App;
