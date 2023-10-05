import { v4 as uuidv4 } from 'uuid';

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
    add(ingredient,name) {
      this.ingredienser[name] = ingredient;
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
  
  Salad.parse = function(json){
    const newSallads = JSON.parse(json);
  
    let emptySallad = new Salad();
  
    if (Array.isArray(newSallads)){
      let emptySallads = [];
      for(const sallad of newSallads){
        let emptySallad = new Salad();
        emptySallad.uuid=sallad.uuid;
        for (let ingredient in sallad.ingredienser){
          emptySallad.add(sallad.ingredienser[ingredient],ingredient);
        }
        emptySallads.push(emptySallad);
      }
      return emptySallads;
    }
    else{
    
      emptySallad.uuid=newSallads.uuid;
      
      for (let ingredient in newSallads.ingredienser){
        
        emptySallad.add(newSallads.ingredienser[ingredient],ingredient);
      }
    }
    return emptySallad;
  }
  export default Salad;