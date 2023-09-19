import { createBrowserRouter} from "react-router-dom";
import App from './App';
import ViewOrder from './ViewOrder';
import ComposeSalad from "./ComposeSalad";
import Welcome from './Welcome'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/compose-salad",
        element: <ComposeSalad/>
      }, {
        path: "/view-order",
        element: <ViewOrder/>
      }, {
        index: true,
        element: <Welcome/>
      }
    
    ]
  },
]);
export default router