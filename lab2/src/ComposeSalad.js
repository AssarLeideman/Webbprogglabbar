import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


function ComposeSalad() {
  const props = useOutletContext();
  const foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);

  const [foundation, setFoundation] = useState('');
  const [protein, setProtein] = useState('');
  const [dressing, setDressing] = useState('');
  const [extra, setExtra] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [alert, setAlert] = useState(false);


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

    let newObject = { ...extra };
    if (newObject[newExtra]) {
      newObject[newExtra] = false;
    } else {
      newObject[newExtra] = true;
    }
    setExtra(newObject);

  }
  return (

    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">

        <h2>Välj bas</h2>
        <form className="needs-validation" id={"theform"} noValidate onSubmit={(e) => {
          e.preventDefault();

          e.target.classList.add("was-validated");

          if (selectedOptions.length < 3 || selectedOptions.length > 9) {
            
            setAlert(true);
            return;
          } else {
            setAlert(false);
          }
          if (!e.target.checkValidity()) {
            
           
            e.stopPropagation();
            return;
          }

          let newSallad = createNewSallad(foundation, protein, dressing, extra, props);
          props.addNewSallad(newSallad);
          setFoundation('');
          setProtein('');
          setDressing('');
          setExtra({});
          setSelectedOptions([]);

          e.target.classList.remove("was-validated");

        }
        }>

          <MyComponentSelector
            options={foundations}
            props={props}
            value={foundation}
            onChange={e => {

              changeFoundation(e.target.value)
            }}
          />

          <h2>Välj protein</h2>

          <MyComponentSelector
            props={props}
            options={proteins}
            value={protein}
            onChange={e => changeProtein(e.target.value)}
          />


          <h2>Välj innehållet i din sallad</h2>

          <MyAlerter alert={alert}/>
         
          <MyExtrasSelect
            props={props}
            onChange={name => changeExtras(name)}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />

          <h2>Välj en dressing</h2>

          <MyComponentSelector
            options={dressings}
            props={props}
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
              Lägg beställning!
            </button>

          </div>
        </form>
      </div>
    </div >
  );
}

function MyAlerter({alert}) {
  if(alert) {
  return (
    <div id={"alerter"} className="alert alert-warning" role="alert">
      Var god välj minst 3 och max 9 tillbehör
    </div>
  );
  }
}


function MyComponentSelector({ options, props, value, onChange }) {
  return (<div className="dropdown">
    <select name="bas" value={value} onChange={onChange} className="dropdown" required>
      <option className="btn-lg" key={"None-selected"} value={""} defaultValue> Gör ditt val </option>
      {options.map(name => <option className="btn-lg" key={name} value={name} > {name} {"(" + props.inventory[name].price + " kr)"} </option>)}
    </select>
    <div className="valid-feedback"></div>
    <div className="invalid-feedback">Var god gör ett val</div>
  </div>);

}

function createNewSallad(foundation, protein, dressing, extras, props) {
  let nySallad = new Salad();
  nySallad.add(foundation, props.inventory[foundation]);
  nySallad.add(protein, props.inventory[protein]);
  nySallad.add(dressing, props.inventory[dressing]);


  Object.keys({ ...extras }).forEach(e => {
    if (extras[e] === true) {
      nySallad.add(e, props.inventory[e]);
    }
  });
  return (nySallad);
}
function MyExtrasSelect({ props, onChange, selectedOptions, setSelectedOptions }) {

  const extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);

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
    <div>
      {extras.map(name => (
        <label key={name} className="col-4">
          <input
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
          {name} {"(" + props.inventory[name].price + " kr)"}

        </label>))}
    </div>);
}

class Salad {
  static #instanceCounter = 0;

  constructor(otherSalad) {
    const uuid = uuidv4();  // use this in the constructor

    //Ändra ordning
    if (otherSalad instanceof Salad) {
      this.ingredienser = { ...otherSalad.ingredienser };
      this.id = 'salad_' + Salad.#instanceCounter++;
      this.uuid = uuid;
      return this;
    } else {
      this.uuid = uuid;
      this.id = 'salad_' + Salad.#instanceCounter++;
      this.ingredienser = {};
    }
  }
  add(name, properties) {
    this.ingredienser[name] = properties;
    return this;
  }
  remove(name) {
    delete this.ingredienser[name];
    return this;
  }
}
Salad.prototype.getPrice = function () {
  return Object.values(this.ingredienser).reduce((totalPrice, ingredient) => totalPrice + ingredient.price, 0);
}
Salad.prototype.count = function (property) {
  return Object.values(this.ingredienser).filter(x => x[property]).length;
}

Salad.prototype.printSallad = function () {
  return Object.keys(this.ingredienser).map(ing => ing + ', ').reduce((a, b) => a + b, '').toLocaleLowerCase().slice(0, -2);
}


export default ComposeSalad;