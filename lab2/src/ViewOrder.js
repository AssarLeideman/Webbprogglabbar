import { useOutletContext, useParams} from "react-router-dom";
import {useState} from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import ViewOrderConfirmation from "./ViewOrderConfirmation";


function ShowDisplay() {
  const params = useParams();
  const uuid = params['uuid'];
  const shoppingCart = useOutletContext().shoppingCart;
  
  
  if (uuid) {
    const newSallad = shoppingCart.find(s => s.uuid === uuid);

    if (newSallad) {

      return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <p id={"alerter-text"}> Ny sallad tillagd: {newSallad.printSallad() + "(" + newSallad.getPrice() + " kr)"} </p>
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>);
    }
  }
}

function ViewOrder() {
  const shoppingCart = useOutletContext().shoppingCart;
  const setShoppingCart = useOutletContext()['setShoppingCart'];
  const [orderConfirmation, setOrderConfirmation] = useState([]);
 

  return (<>
    <ShowDisplay />

    <div className="row h-200 p-5 bg-light border rounded-3">
      <table>
        <thead>
          <tr>
            <th>Ingredienser </th>
            <th>Pris </th>
            <th></th>
          </tr>
        </thead>
        <tbody>

          {shoppingCart.map(sallad => {

            return <tr key={sallad.uuid}>
              <td >{sallad.printSallad()}</td>
              <td>{sallad.getPrice()} Kr </td>
              <td><button type="button" className="btn-close" aria-label="close" onClick={() => {
                setShoppingCart(shoppingCart.filter(s => 
                  s.uuid !== sallad.uuid));

                console.log(sallad.uuid);  
                window.localStorage.removeItem(sallad.uuid);
              }}></button></td>
            </tr>
          })}
        </tbody>
      </table>
      <div className="p-5">
        {shoppingCart.length>0 ?<button className="btn-lg"
          key={"add_order"}
          id={"oc"}
          type="submit"
          onClick={() => {
            handleSubmit(shoppingCart).then(res => setOrderConfirmation(res));
            setShoppingCart([]);
            window.localStorage.clear();
            }
          }
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px'
          }}
        >
          Lägg beställning!
        </button>:<></> }
        <ViewOrderConfirmation orderConfirmation={orderConfirmation}/>
        
      </div>
    </div >
  </>);
}

async function handleSubmit(mySalads) {
  
  let salads=[];
  for(const salad of mySalads) {
  
    salads.push(Object.keys(salad.ingredienser));
  }
  
  const response = await fetch("http://localhost:8080/orders/", {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
    'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(salads)
    });
    const data = await response.json();
    
   return data
}


export default ViewOrder;