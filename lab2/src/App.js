import React, {useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import inventory from './inventory.mjs';
import {Outlet} from 'react-router-dom'
import {NavLink} from 'react-router-dom';


function App() {
  const [shoppingCart, setShoppingCart] = useState([]);

  function addNewSallad(sallad) {
    console.log(sallad);
    let newShoppingCart = [...shoppingCart];
    console.log("hej addnewsallad");
    newShoppingCart.push(sallad);
    setShoppingCart(newShoppingCart);
    console.log(newShoppingCart);
    console.log("nu är kundvagnen:" + shoppingCart);
    console.log(shoppingCart);
  }

  return (
    <div className="container py-4">
      <Header />
      <Navbar />
      <Outlet context={{ addNewSallad, inventory }} /> 
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
        </NavLink>
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




export default App;
