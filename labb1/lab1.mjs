'use strict';
/**
 * Reflection question 1
 * Because if the property is lacking it will default to false
 */

import inventory from './inventory.mjs';
console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory);

console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
names
  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'case' }))
  .forEach(name => console.log(name));

console.log('\n--- for ... in ---------------------------------------')
for (const name in inventory) {
  console.log(name);
}
/**
 * Reflection question 2
 * .forEach does not include properties of the property chain. the for loop iterates over everything, including the property chain.
 * If an
 */

console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
  return Object.keys(inv).filter(name => inv[name][prop]).
  map(item => '<option value="' + item + '" key="' + item + '"> ' + item + ', ' + inv[item].price + ' kr</option> \n').
  reduce((a,b)=> a + b, '');
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
class Salad {
  constructor(otherSalad) {
    if(otherSalad instanceof Salad) {
      return otherSalad;
    } else {
      this.ingredienser = {};
    }
   }
  add(name, properties) { 
    this.ingredienser[name] = properties;
    return this;
}
  remove(name){
      delete this.ingredienser[name];
      return this;

  }
}
let myCaesarSalad = new Salad()
  .add('Sallad', inventory['Sallad'])
  .add('Kycklingfilé', inventory['Kycklingfilé'])
  .add('Bacon', inventory['Bacon'])
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'])
  .add('Ceasardressing', inventory['Ceasardressing'])
  .add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');


console.log('\n--- Assignment 3 ---------------------------------------')

Salad.prototype.getPrice = function() {
  return Object.values(this.ingredienser).reduce((totalPrice, ingredient) => totalPrice + ingredient.price,0);
}
console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');

Salad.prototype.count = function(property) {
  return Object.values(this.ingredienser).filter(x => x[property]).length;
}
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör

//GÖR REFLECTION QUESTION 3 FÖR I HELVETE!!!!!
console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad);
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype);
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')

Salad.parse = function(json){
  const newSallads = JSON.parse(json);

  let emptySallad = new Salad();

  if (Array.isArray(newSallads)){
    let emptySallads = [];
    for(const sallad of newSallads){
      let emptySallad = new Salad();
      
      for (let ingredient in sallad.ingredienser){
        emptySallad.add(ingredient, sallad.ingredienser[ingredient]);
      }
      emptySallads.push(emptySallad);
    }
    return emptySallads;
  }
  else{
    for (let ingredient in newSallads.ingredienser){
      emptySallad.add(ingredient, newSallads.ingredienser[ingredient]);
    }
  }
  return emptySallad;
}

const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')

class GourmetSalad extends Salad{
  constructor(otherSallad) {
    super(otherSallad);
  }

  add(name, properties,size=1) { 
    if(this.ingredienser[name]?.size){
      this.ingredienser[name].size += size;
    }
    else{
      const propertiesWithSize = { ...properties,size}
      super.add(name,propertiesWithSize);
      
    }
    return this;
}
}

  GourmetSalad.prototype.getPrice = function(){
    return Object.values(this.ingredienser).reduce((totalPrice, ingredient) => 
      totalPrice + (ingredient.price ? ingredient.price * ingredient.size : ingredient.size) ,0) ;
}


let myGourmetSalad = new GourmetSalad()
  .add('Sallad', inventory['Sallad'], 0.5)
  .add('Kycklingfilé', inventory['Kycklingfilé'], 2)
  .add('Bacon', inventory['Bacon'], 0.5)
  .add('Krutonger', inventory['Krutonger'])
  .add('Parmesan', inventory['Parmesan'], 2)
  .add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log("checkpoint charlie");

console.log('\n--- Assignment 6 ---------------------------------------')
/*
console.log('Min gourmetsallad har id: ' + myGourmetSalad.id);
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);
*/

/**
 * Reflection question 4
 */
/**
 * Reflection question 5
 */
/**
 * Reflection question 6
 */
