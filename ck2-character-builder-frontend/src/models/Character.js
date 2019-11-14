import Attribute from './Attribute.js'
import Trait from './Trait.js'

const BASE_URL = "http://localhost:3000"
const CHARACTER_URL = BASE_URL + "/characters"

const displayHealth = (attr) => attr.base.toFixed(2) + ` ( ${attr.effective.toFixed(2)} )`;
const displayFertility = (attr) => attr.base + '%' + ` ( ${attr.effective}% )`;
const displayKin = (attr) => attr.base;

const CHARACTER_ATTR = {
  diplomacy: (base) => new Attribute({base}),
  martial: (base) => new Attribute({base}),
  stewardship: (base) => new Attribute({base}),
  intrigue: (base) => new Attribute({base}),
  learning: (base) => new Attribute({base}),
  health: (base) => new Attribute({base, increment: 0.1, displayFunction: displayHealth}),
  fertility: (base) => new Attribute({base, minVal: 50, increment: 5, displayFunction: displayFertility}),
  sons: (base) => new Attribute({base, minVal: 0, cost: 3, displayFunction: displayKin}),
  daughters: (base) => new Attribute({base, minVal: 0, cost: 2, displayFunction: displayKin})
};

const DEFAULT_ATTR = {
  diplomacy: 5,
  martial: 5,
  stewardship: 5,
  intrigue: 5,
  learning: 5,
  health: 5,
  fertility: 50,
  sons: 0,
  daughters: 0
}

const IDENTITY_ATTR = ["name", "dynasty", "religion", "culture", "sex"]

class Character {
  constructor({ 
      character_attribute = DEFAULT_ATTR,
      traits = [], 
      name = "", 
      dynasty = "", 
      religion, 
      culture, 
      marriage_status, 
      sex, 
      id 
    } = {}) {
    this.attributes = {}
    this.id = id;
    this.name = name;
    this.dynasty = dynasty;
    this.religion = religion;
    this.culture = culture;
    this.marriage_status = marriage_status;
    this.sex = sex;
    this.traits = [];
    for(const trait of traits) { this.traits.push(new Trait(trait)) };
    for(const attr in DEFAULT_ATTR) { this.attributes[attr] = CHARACTER_ATTR[attr](character_attribute[attr]) };
    this.age = this.calculateAge();
  };

  saveCharacter() {
    const characterInfo = { id: this.id }
    for(const attr of IDENTITY_ATTR) { characterInfo[attr] = document.querySelector(`#${attr}`).value }
    characterInfo.marriage_status = document.querySelector(`#marriage_status`).checked
    characterInfo.character_attribute = {}
    for(const key in this.attributes) { characterInfo.character_attribute[key] = this.attributes[key].base }

    const character_trait_ids = [];
    for(const trait of this.traits) { character_trait_ids.push(trait.id)}
    
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( { character: characterInfo, character_trait_ids: character_trait_ids } )
    };

    return fetch(CHARACTER_URL, configObj).then((response) => { return response.json() }).then((char) => {
      this.id = char.id
      this.refreshLoadList()
    });
  }

  static loadCharacter(id) {
    return fetch(CHARACTER_URL + `/${id}`).then((response) => { return response.json() }).then((char) => {
      const mainBody = document.querySelector("main");
      while (mainBody.firstChild) {
        mainBody.removeChild(mainBody.firstChild);
      };
      console.log(char)
      const character = new Character(char)
      mainBody.append(character.buildCards());
    });
  }

  calculateAge() {
    let age = Object.values(this.attributes).reduce( (age, attr) => {
      return age + ((attr.effective - attr.minVal) * (attr.cost / attr.increment));
    }, 16);
    if (this.marriage_status) { age += 2 };
    return age
  };

  changeAge(amount) {
    const age = document.querySelector('#age');
    const newAge = this.age + amount;
    age.innerText = newAge;
    this.age = newAge;
  };

  buildCards() {
    const grid = document.createElement("div");
    grid.setAttribute("class", "card-group mx-auto");
    grid.setAttribute("style", "width: 800px;")
    grid.append(this.buildDetailsCard());
    grid.append(this.buildAttrCard())
    return grid;
  };

  buildDetailsCard() {
    const card = document.createElement("div")
    card.setAttribute("class", "card mx-auto my-4");
    card.innerHTML += 
      `<div class="card-header" style="height: 49px;">
        <span id="nameDisplay">${this.name} </span>
        <span id="dynastyDisplay">${this.dynasty}</span>
      </div>
      <div class="card-body p-0">
        <div class="card"></div>
        <div class="card"></div>
        <div class="card"></div>
      </div`
    const cardBody = card.children[1]
    cardBody.children[0].append(this.buildIdentity())
    cardBody.children[1].append(this.buildTraits())
    cardBody.children[2].append(this.buildDBConnection())
    return card
  }

  buildDBConnection() {
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    cardBody.setAttribute("style", "height: 150px;");
    cardBody.innerHTML +=
      `<div class="row"></div>`
    cardBody.children[0].append(this.buildSaveButton());
    cardBody.children[0].append(this.buildLoadButton());
    cardBody.children[0].append(this.buildLoadList());
    return cardBody
  }

  buildSaveButton() {
    const save = document.createElement("button");
    save.setAttribute("class", "btn btn-success");
    save.setAttribute("style", "height: 40px;")
    save.innerText = "Save";
    save.addEventListener('click', () => this.saveCharacter());
    return save;
  };

  buildLoadButton() {
    const load = document.createElement("button");
    load.setAttribute("class", "btn btn-secondary mx-3");
    load.setAttribute("style", "height: 40px;")
    load.innerText = "Load";
    load.addEventListener('click', () => Character.loadCharacter(document.querySelector("#character_load").value));
    return load;
  };

  buildLoadList() {
    const list = document.createElement("div");
    list.setAttribute("class", "form-group col");
    list.setAttribute("id", "load_list")
    list.innerHTML += 
      `<div class="form-group row">
        <select class="custom-select" id="character_load">
        </select>
      </div>`;
    fetch(CHARACTER_URL).then((response) => { return response.json() }).then((characters) => {
      const formList = list.querySelector(`#character_load`);
      for (const character of characters) {
        formList.innerHTML += `<option id="character_${character.id}" value="${character.id}">${character.name} ${character.dynasty}</option>`
      };
      if (this.id) { list.querySelector(`#character_${this.id}`).setAttribute('selected', true) };
    });
    return list
  };

  refreshLoadList() {
    const listParent = document.querySelector("#load_list");
    listParent.removeChild(listParent.lastChild);
    listParent.append(this.buildLoadList());
  }

  buildTraits() {
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    cardBody.setAttribute("style", "height: 150px;");
    Trait.all((traits) => {
      // cardBody.append(this.buildEducationTraitsCard(traits.education))
      cardBody.append(this.buildDefaultTraitsCard(traits.default))
      for (const trait of this.traits) { this.addTrait(trait) };
    });
    return cardBody;
  }

  buildDefaultTraitsCard(traits) {
    const cardBody = document.createElement("div");
    this.traitsCard = cardBody;
    cardBody.append(Trait.buildTraitList(traits, this.addTrait.bind(this)));
    cardBody.querySelector('.dropdown-menu').addEventListener('click', function (event) { event.stopPropagation() });
    cardBody.append(this.buildTraitBox());
    return cardBody;
  }

  buildTraitBox() {
    const box = document.createElement("span");
    box.setAttribute('id', 'character_traits');
    return box
  }

  addTrait(trait) {
    if (!this.traits.find(char_trait => trait.id === char_trait.id)) { this.traits.push(trait) }
    this.parseTraitEffect(trait, 1)
    this.traitsCard.querySelector(`#trait_${trait.id}`).setAttribute('hidden', true);
    for (const oppositeID of trait.opposites) { this.traitsCard.querySelector(`#trait_${oppositeID}`).setAttribute('hidden', true) };
    const traitElement = trait.buildIcon()
    this.traitsCard.querySelector('#character_traits').append(traitElement);
    traitElement.addEventListener('contextmenu', (event) => { 
      event.preventDefault();
      this.removeTrait(trait);
    });
  };

  removeTrait(trait) {
    this.traits.splice(this.traits.findIndex((character_trait) => character_trait.id === trait.id), 1);
    this.parseTraitEffect(trait, -1);
    document.querySelector('#character_traits').removeChild(document.querySelector(`#character_trait_${trait.id}`));
    document.querySelector(`#trait_${trait.id}`).removeAttribute('hidden');
    for (const oppositeID of trait.opposites) { document.querySelector(`#trait_${oppositeID}`).removeAttribute('hidden') };
  }

  parseTraitEffect(trait, weight) {
    this.changeAge(trait.cost * weight);
    for (const attr in this.attributes) {
      if (trait.effects[attr]) { 
        this.attributes[attr].effective += (trait.effects[attr] * weight)
        document.querySelector(`#${attr}_display`).querySelector('.value').innerText = this.attributes[attr].display();
      }
    };
  }

  buildIdentity() {
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    cardBody.setAttribute("style", "height: 198px");
    cardBody.innerHTML = 
      `<div class="row"></div>
      <div class="row"></div>
      <div class="row"></div>`
    cardBody.children[0].append(this.buildTextForm("name"));
    cardBody.children[0].append(this.buildDropDown("religion"));
    cardBody.children[1].append(this.buildTextForm("dynasty"));
    cardBody.children[1].append(this.buildDropDown("culture"));
    cardBody.children[2].append(this.buildMarriageCheckbox());
    cardBody.children[2].append(this.buildSexDropDown());
    return cardBody;
  };

  buildTextForm(detail) {
    const form = document.createElement("div");
    form.setAttribute("class", "col");
    form.innerHTML +=
      `<div class="form-group row">
        <label for="${detail}" class="col-form-label">${detail[0].toUpperCase() + detail.slice(1)}: </label>
        <div class="col px-1">
          <input type="text" class="form-control" id="${detail}" value="${this[detail]}"></input>
        </div>
      </div>`
    form.children[0].children[1].children[0].addEventListener('input', (event) => {
      document.querySelector(`#${detail}Display`).innerText = event.target.value;
    });
    return form;
  };

  buildDropDown(detail) {
    const form = document.createElement("div");
    form.setAttribute("class", "col");
    form.innerHTML +=
      `<div class="form-group row">
        <label for="${detail}" class="col-form-label">${detail[0].toUpperCase() + detail.slice(1)}: </label>
        <div class="col px-1">
          <select class="custom-select" id="${detail}">
          </select>
        </div>
      </div>`;
    fetch(BASE_URL + `/${detail}s`).then((response) => { return response.json() }).then((detailList) => {
      const formList = form.querySelector(`#${detail}`);
      for (const category in detailList) { 
        formList.innerHTML += `<optgroup label="${category}:">`;
        for (const item of detailList[category]) { formList.innerHTML += `<option id="${item}" value="${item}">${item}</option>` };
        formList.innerHTML += `</optgroup">`;
      };
      if (this[detail]) { form.querySelector(`#${this[detail]}`).setAttribute('selected', true) };
    });
    return form;
  };

  buildSexDropDown() {
    const form = document.createElement("div");
    form.setAttribute("class", "col");
    form.innerHTML +=
      `<div class="form-group row">
      <label for="sex" class="col-form-label">Sex: </label>
      <div class="col px-1">
        <select class="custom-select" id="sex">
          <option id="Male" value="Male">Male</option> 
          <option id="Female" value="Female">Female</option> 
        </select>
      </div>
    </div>`;
    if (this.sex) { form.querySelector(`#${this.sex}`).setAttribute("selected", true) };
    return form;
  };

  buildMarriageCheckbox() {
    const form = document.createElement("div")
    form.setAttribute("class", "col");
    form.innerHTML +=
      `<div class="form-group row mt-1">
        <label for="marriage_status">Married: </label>
        <div class="col px-1 ml-4">
          <input class="form-check-input" type="checkbox" id="marriage_status">
        </div>
      </div>`
    if (this.marriage_status) { form.querySelector("#marriage_status").setAttribute("checked", true) };
    form.querySelector("#marriage_status").addEventListener('change', (event) => { 
      if (event.target.checked) { this.changeAge(2) } else { this.changeAge(-2) }
    });
    return form
  }

  buildAttrCard() {
    const card = document.createElement("div");
    card.setAttribute("class", "card mx-auto my-4");
    card.innerHTML += 
      `<div class="card-header">
        <div class="float-right">Age: <span id="age">${this.age}</span> ( Max: 50 )</div>
      </div>`;
    card.append(this.buildAttrList());
    return card;
  };

  buildAttrList() {
    const list = document.createElement("ul");
    list.setAttribute('class', 'list-group');
    for(const attr in this.attributes) {
      list.append(this.buildAttrItem(attr));
    };
    return list;
  };

  buildAttrItem(attr) {
    const item = document.createElement("li");
    item.setAttribute('class', 'list-group-item');
    item.setAttribute('id', `${attr}_display`);
    item.innerText = `${attr[0].toUpperCase() + attr.slice(1)}`;
    item.append(this.buildAttrValue(this.attributes[attr]));
    return item;
  }

  buildAttrValue(attr) {
    const value = document.createElement('div');
    value.setAttribute('class', 'float-right');
    value.innerHTML = `<span class="value">${attr.display()}</span>`;
    this.appendPlusMinusButtons(attr, value);
    return value;
  };

  appendPlusMinusButtons(attr, target) {
    const plus = document.createElement('button');
    plus.setAttribute('class', 'btn btn-success btn-sm mx-2');
    plus.innerText = '➕';
    target.append(plus); 
    plus.addEventListener('click', () => { this.plusMinusAttr(attr, target, 1) }); 

    const minus = document.createElement('button');
    minus.setAttribute('class', 'btn btn-danger btn-sm');
    minus.innerText = '➖';
    target.append(minus);
    minus.addEventListener('click', () => { 
      if (parseFloat(target.querySelector('.value').innerText) > attr.minVal) {
        this.plusMinusAttr(attr, target, -1);
      };
    }); 
  }

  plusMinusAttr(attr, target, direction) {
    const base = target.querySelector('.value');
    let newVal = attr.base + (attr.increment * direction);
    if (newVal % 1 !== 0) { newVal = parseFloat(newVal.toFixed(2)) };
    attr.base = newVal;
    base.innerText = attr.display();

    this.changeAge(attr.cost * direction)
  };
};

export default Character;