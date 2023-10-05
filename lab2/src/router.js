import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ViewOrder from './ViewOrder';
import ComposeSalad from "./ComposeSalad";
import Welcome from './Welcome'

async function inventoryLoader() {
  const foundationsList = await safeFetchJson("http://localhost:8080/foundations/");
  const proteinList = await safeFetchJson("http://localhost:8080/proteins/");
  const dressingList = await safeFetchJson("http://localhost:8080/dressings/");
  const extrasList = await safeFetchJson("http://localhost:8080/extras/");

  const foundations = await fetchIngredients(foundationsList, "foundations");
  const proteins = await fetchIngredients(proteinList, "proteins");
  const dressings = await fetchIngredients(dressingList, "dressings");
  const extras = await fetchIngredients(extrasList, "extras");

  const inventory = { foundations, proteins, dressings, extras };

  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("using slow loader");
  return inventory;
}

async function fetchIngredient(category, name) {
  const url = "http://localhost:8080/" + category + "/" + name + "/";
  const prop = safeFetchJson(url);
  return prop;
}

async function fetchIngredients(array, category) {
  const promises = [];
  const resolvedIngredients = {};
  for (const ingredientName of array) {
    promises.push(fetchIngredient(category, ingredientName));
  }
  
   await Promise.all(promises).then(result => {
    array.forEach((name, index) => {
      //console.log(result[index]);
      resolvedIngredients[name] = result[index];
    });

      
  }).catch(error => {
    console.log(error);
  });

  return resolvedIngredients;
}

function safeFetchJson(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("url" + url + "returned status " + response.status);
      }
      return response.json();
    }).catch(error => {
      throw new Error("Connection failed");
    });
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/compose-salad",
        loader: inventoryLoader,
        element: <ComposeSalad />,
        children: [
          {
            path: "/compose-salad/view-ingredient/:name",
            element: <ComposeSalad />,
          }
        ]
      }, {
        path: "/view-order",
        element: <ViewOrder />,
        children: [
          {
            path: "/view-order/confirm/:uuid",
            element: <ViewOrder />
          }
        ]
      }, {
        index: true,
        element: <Welcome />
      }, {
        path: "/*",
        element: (<> <h1>404 Page Not Found</h1>
          <h2>Invalid URL</h2> </>)

      }

    ]
  },
]);
export default router