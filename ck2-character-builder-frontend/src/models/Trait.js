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

  get tooltip() {
    let effects = ''
    for (const key in this.effects) { effects += `<div class="ml-n5">${key[0].toUpperCase() + key.slice(1)}: ${this.effects[key]}</div>` }
    return `<h4>${this.name}:</h4>
    -------------------------
    <p>${this.description}</p>
    <ul>
    ${effects}
    </ul>`
  }

  buildSelect(listenerFunction = () => {}) {
    const traitSelect = document.createElement("a");
    traitSelect.setAttribute("class", "dropdown-item");
    traitSelect.setAttribute("href", "#");
    traitSelect.setAttribute("id", `trait_${this.id}`);
    traitSelect.setAttribute('data-toggle', 'tooltip');
    traitSelect.setAttribute('data-placement', 'right');
    traitSelect.setAttribute('title', this.tooltip)
    new Boots.Tooltip(traitSelect);
    traitSelect.innerHTML = `<img src="../public/images/${this.nameSlug}.png"> ${this.name} <div class="float-right">${this.cost}</div>`
    traitSelect.addEventListener('click', () => { listenerFunction(this) });
    return traitSelect;
  };

  buildIcon() {
    const icon = document.createElement("img")
    icon.setAttribute('src', `../public/images/${this.nameSlug}.png`)
    icon.setAttribute('id', `character_trait_${this.id}`)
    icon.setAttribute('data-toggle', 'tooltip');
    icon.setAttribute('data-placement', 'bottom');
    icon.setAttribute('title', this.tooltip)
    new Boots.Tooltip(icon);
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