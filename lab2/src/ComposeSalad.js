import { useState } from 'react';

function ComposeSalad(props) {
  const foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const [foundation, setFoundation] = useState('Pasta');
  const [extra, setExtra] = useState({ Bacon: true, Fetaost: true });

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj bas</h2>
        <select name="bas" id="bas-select">
          <option value="">--Please choose an option--</option>
        </select>
        {foundations.map(name => <div key={name} className="col-4">{name}</div>)}

        <h2>Välj protein</h2>
        <select name="protein" id="protein-select">
          <option value="">--Please choose an option--</option>
        </select>

        <h2>Välj innehållet i din sallad</h2>
        
        {extras.map(name => <div key={name} className="col-4"> <input type="checkbox" id={name} name={name} /> {name} 
        
        </div>)}

      </div>
    </div>
  );
}

export default ComposeSalad;