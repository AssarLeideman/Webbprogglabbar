
import { useOutletContext } from "react-router-dom";

function ViewOrder() {
    const shoppingCart=useOutletContext()['shoppingCart'];
    console.log(shoppingCart);
    return (<div className="row h-200 p-5 bg-light border rounded-3">
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