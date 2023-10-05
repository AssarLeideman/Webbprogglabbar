import { useState } from 'react';
import { useNavigate, useLoaderData, useOutletContext } from 'react-router-dom';
import Salad from './Salad'
import 'bootstrap/dist/css/bootstrap.css';
import ViewComponent from './ViewComponent';

function ComposeSalad() {

  const props = useLoaderData();
  const context=useOutletContext();
  
  const foundations = props.foundations;
  const proteins = props.proteins;
  const dressings = props.dressings;
  const extras = props.extras;

  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [dressing, setDressing] = useState('');
  const [extra, setExtra] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  function changeFoundation(newFoundation) {
    setFoundation(newFoundation);
  }

  function changeProtein(newProtein) {
    setProtein(newProtein);
  }

  function changeDressing(newDressing) {
    setDressing(newDressing);
  }

  function changeExtras(newExtra) {
    const newObject = { ...extra, [newExtra]: !extra[newExtra] };
    setExtra(newObject);

  }
  return (

    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">

        <h2>Välj bas</h2>
        <form className="needs-validation" id={"theform"} noValidate onSubmit={(e) => {
          e.preventDefault();

          if (selectedOptions.length < 3 || selectedOptions.length > 9) {

            setAlert(true);
            return;
          } else {
            setAlert(false);
          }
          if (!e.target.checkValidity()) {

            e.target.classList.add("was-validated");
            e.stopPropagation();
            return;
          }
        
          const newSallad = createNewSallad(foundation, protein, dressing, extra,props);
          
          context.addNewSallad(newSallad);

          setFoundation('');
          setProtein('');
          setDressing('');
          setExtra({});
          setSelectedOptions([]);

          e.target.classList.remove("was-validated");

          navigate("/view-order/confirm/" + newSallad.uuid);
        }
        }>

          <MyComponentSelector
            props={foundations}
            value={foundation}
            onChange={e => {

              changeFoundation(e.target.value)
            }}
          />

          <h2 className="p-1">Välj protein</h2>

          <MyComponentSelector
            props={proteins}
            value={protein}
            onChange={e => changeProtein(e.target.value)}
          />


          <h2 className="p-1">Välj innehållet i din sallad</h2>

          <MyAlerter alert={alert} />

          <MyExtrasSelect
            props={extras}
            onChange={name => changeExtras(name)}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <ViewComponent />

          <h2 className="p-1">Välj en dressing</h2>

          <MyComponentSelector
            props={dressings}
            value={dressing}
            onChange={e => changeDressing(e.target.value)}
          />
          <div>

            <button className="btn-lg"
              key={"add_order"}
              type="submit"
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '5px'
              }}
            >
             Lägg till i varukorgen
            </button>



          </div>
        </form>
      </div>
    </div >
  );
}

function MyAlerter({ alert }) {
  if (alert) {
    return (
      <div id={"alerter"} className="alert alert-warning" role="alert">
        Var god välj minst 3 och max 9 tillbehör
      </div>
    );
  }
}


function MyComponentSelector({ props, value, onChange }) {
  return (
    <div className="col-3">
      <div className="dropdown">
        <select value={value} onChange={onChange} className="form-select" required>
          <option value={""} key={"None-selected"} defaultValue> Gör ditt val </option>
          {
          Object.keys(props).map(name => <option className="btn" key={name} value={name} > {name} {"(" + props[name].price + " kr)"} </option> )};
            
        </select>
        <div className="valid-feedback"></div>
        <div className="invalid-feedback">Var god gör ett val</div>
      </div>
    </div>);

}


function MyExtrasSelect({ props, onChange, selectedOptions, setSelectedOptions }) {
  const navigate = useNavigate();
  const extras = Object.keys(props).filter(name => props[name].extra);

  function handleChange(name) {
    let newSelectedOptions = [...selectedOptions];

    if (!newSelectedOptions.includes(name)) {
      newSelectedOptions.push(name);
    } else {
      newSelectedOptions = newSelectedOptions.filter(x => x !== name);
    }
    setSelectedOptions(newSelectedOptions);
  }

  return (
    <div className="">
      {extras.map(name => (
        <label key={name} className="col-4">

          <div className="col-10"> <input
            type="checkbox"
            id={name}
            className="form-check-input"
            name={name}
            checked={selectedOptions.includes(name)}
            onChange={() => {
              onChange(name);
              handleChange(name);
            }}>
          </input>
            <div className="d-inline" onClick={() => navigate("view-ingredient/" + name)}> {name} {"(" + props[name].price + " kr)"}</div>  </div>

        </label>))}
    </div>);
}



function createNewSallad(foundation, protein, dressing, extras,props) {
  let nySallad = new Salad();
 // console.log("vald foundation " + foundation);
  
  nySallad.add(props.foundations[foundation],foundation)
          .add(props.proteins[protein],protein)
          .add(props.dressings[dressing],dressing);

  //console.log("i createnewsallad: " + nySallad);
  Object.keys({ ...extras }).forEach(e => {
    if (extras[e] === true) {
      nySallad.add(props.extras[e],e);
    }
  });
  return (nySallad);
}

export default ComposeSalad;