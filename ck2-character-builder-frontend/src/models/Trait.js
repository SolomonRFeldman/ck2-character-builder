import Boots from 'bootstrap.native';

class Trait {

  constructor({ id, name, description, cost, effects, opposites}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.effects = effects;
    this.opposites = opposites;
  };

  buildSelect(listenerFunction = () => {}) {
    const traitSelect = document.createElement("a");
    traitSelect.setAttribute("class", "dropdown-item");
    traitSelect.setAttribute("href", "#");
    traitSelect.setAttribute("id", `trait_${this.id}`);
    traitSelect.innerHTML = `<img src="https://via.placeholder.com/24"> ${this.name} <div class="float-right">${this.cost}</div>`
    traitSelect.addEventListener('click', () => { listenerFunction(this) });
    return traitSelect;
  };

  static all(callback = () => {}) {
    return fetch(`http://localhost:3000/traits`).then((response) => { return response.json() }).then((json) => {
      const traits = json.map((trait) => new Trait(trait));
      callback(traits);
    });
  };

  static buildTraitList(traits, listenerFunction) {
    const dropdown = document.createElement("div");
    dropdown.setAttribute("class", "dropdown");
    dropdown.innerHTML +=
      `<img class="dropdown-toggle" src="https://via.placeholder.com/24" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <div class="dropdown-menu" style="max-height: 200px; overflow-x: hidden;" aria-labelledby="dropdownMenuButton"></div>`
    for (const trait of traits) {
      dropdown.querySelector('.dropdown-menu').append(trait.buildSelect(listenerFunction));
    };
    dropdown.querySelector(".dropdown-menu").addEventListener('click', function (event) {
      event.stopPropagation(); 
    });
    new Boots.Dropdown(dropdown.children[0]);
    console.log(traits);
    return dropdown;
  };

};

export default Trait;