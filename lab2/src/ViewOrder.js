import { useContext } from "react";

function ViewOrder() {
    const shoppingCart=useContext().shoppingCart;
    console.log(shoppingCart);
    console.log("hej från view order");
    return (<div>
      <table>
        <thead>
          <tr>
            <th>Ingredienser </th>
            <th>Pris </th>
          </tr>
        </thead>
        <tbody>
  
          {shoppingCart.map(sallad => {
  
            return <tr key={sallad.uuid}>
              <td >{sallad.printSallad()}</td>
              <td>{sallad.getPrice()} Kr </td>
            </tr>
  
          })}
        </tbody>
      </table>
    </div>);
  }
  export default ViewOrder;