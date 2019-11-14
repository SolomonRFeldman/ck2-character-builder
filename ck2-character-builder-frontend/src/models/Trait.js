import Boots from 'bootstrap.native';

class Trait {

  constructor({ id, name, type, description, cost, effects, opposites}) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.cost = cost;
    this.effects = effects;
    this.opposites = opposites;
  };

  get nameSlug() {
    return this.name.replace(/[ ]/g, '_').replace('-', '').toLowerCase();
  }

  buildSelect(listenerFunction = () => {}) {
    const traitSelect = document.createElement("a");
    traitSelect.setAttribute("class", "dropdown-item");
    traitSelect.setAttribute("href", "#");
    traitSelect.setAttribute("id", `trait_${this.id}`);
    traitSelect.innerHTML = `<img src="../public/images/${this.nameSlug}.png"> ${this.name} <div class="float-right">${this.cost}</div>`
    traitSelect.addEventListener('click', () => { listenerFunction(this) });
    return traitSelect;
  };

  buildIcon() {
    const icon = document.createElement("img")
    icon.setAttribute('src', `../public/images/${this.nameSlug}.png`)
    icon.setAttribute('id', `character_trait_${this.id}`)
    return icon
  };

  static all(callback = () => {}) {
    return fetch(`http://localhost:3000/traits`).then((response) => { return response.json() }).then((json) => {
      const traits = {}
      traits.default = json.default.map((trait) => new Trait(trait));
      traits.education = json.education.map((trait) => new Trait(trait));
      callback(traits);
    });
  };

  static buildTraitList(traits, listenerFunction) {
    const dropdown = document.createElement("span");
    dropdown.setAttribute("class", "dropdown");
    dropdown.innerHTML +=
      `<img class="dropdown-toggle mb-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <div class="dropdown-menu" style="max-height: 200px; overflow-x: hidden;" aria-labelledby="dropdownMenuButton"></div>`
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
    for (const trait of traits) { dropdownMenu.append(trait.buildSelect(listenerFunction)) };
    new Boots.Dropdown(dropdown.children[0]);
    return dropdown;
  };

};

export default Trait;