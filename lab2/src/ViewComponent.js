import 'bootstrap/dist/css/bootstrap.css';
import { useParams, useLoaderData} from 'react-router-dom';


function ViewComponent() {
    const ingredientName = useParams()['name'];
    const allProps=useLoaderData();
    const props=allProps.extras;
    if(!ingredientName) {
        return;
    }

    const isLactose=props[ingredientName]['lactose'];
    const isVegan=props[ingredientName]['vegan'];
    const isGluten=props[ingredientName]['gluten'];
    
    
    return (
        <div className="row bg-white col-4 border rounded-2 p-12"> 
            <h6>{ingredientName}</h6>
            <p>Veganskt: {isVegan?"ja":"nej"}</p>
            <p>Glutenfritt: {isGluten?"nej":"ja"}</p>
            <p>Laktosfritt: {isLactose?"nej":"ja"}</p>
        </div>);
}

export default ViewComponent;