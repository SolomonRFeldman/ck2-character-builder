import Attribute from './Attribute.js'

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

const IDENTITY_ATTR = ["name", "dynasty", "religion"]

class Character {
  constructor(attributes = DEFAULT_ATTR, traits, name = "", dynasty = "", religion, id) {
    this.attributes = {}
    this.id = id;
    this.name = name;
    this.dynasty = dynasty;
    this.religion = religion;
    for(const attr in DEFAULT_ATTR) { this.attributes[attr] = CHARACTER_ATTR[attr](DEFAULT_ATTR[attr]) };
    this.age = this.calculateAge();
  };

  saveCharacter() {
    const characterInfo = { id: this.id }
    for(const attr of IDENTITY_ATTR) { characterInfo[attr] = document.querySelector(`#${attr}`).value }
    characterInfo.character_attribute = {}
    for(const key in this.attributes) { characterInfo.character_attribute[key] = this.attributes[key].base }
    
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( { character: characterInfo } )
    };

    return fetch(CHARACTER_URL, configObj).then((response) => { return response.json() }).then((char) => {
      this.id = char.id
    });
  }

  calculateAge() {
    return Object.values(this.attributes).reduce( (age, attr) => {
      return age + ((attr.effective - attr.minVal) * (attr.cost / attr.increment));
    }, 16);
  };

  buildCards() {
    const grid = document.createElement("div");
    grid.setAttribute("class", "card-group mx-auto ");
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
        <div class="card"><div class="card-body" style="height: 150px;"></div></div>
        <div class="card"></div>
      </div`
    const cardBody = card.children[1]
    cardBody.children[0].append(this.buildIdentity())
    cardBody.children[2].append(this.buildDBConnection())
    return card
  }

  buildDBConnection() {
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    cardBody.setAttribute("style", "height: 150px;");
    cardBody.append(this.buildSaveButton())
    return cardBody
  }

  buildSaveButton() {
    const save = document.createElement("button");
    save.setAttribute("class", "btn btn-success");
    save.innerText = "Save"
    save.addEventListener('click', () => this.saveCharacter());
    return save
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
    return cardBody
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
        </div>
      </div>`;
    fetch(BASE_URL + `/${detail}s`).then((response) => { return response.json() }).then((detailList) => {
      const formList = form.querySelector(`#${detail}`);
      for (const category in detailList) { 
        formList.innerHTML += `<optgroup label="${category}:">`;
        for (const item of detailList[category]) { formList.innerHTML += `<option id="${item}" value="${item}">${item}</option>` };
        formList.innerHTML += `</optgroup">`;
      };
      if (this.religion) { form.querySelector(`#${this.religion}`).setAttribute('selected', true) };
    });
    return form;
  };

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
    item.innerText = `${attr[0].toUpperCase() + attr.slice(1)}`;
    item.append(this.buildAttrValue(this.attributes[attr]));
    return item;
  }

  buildAttrValue(attr) {
    const value = document.createElement('div');
    value.setAttribute('class', 'float-right');
    value.innerHTML = `<span id="base">${attr.display()}</span>`;
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
      if (parseFloat(target.querySelector('#base').innerText) > attr.minVal) {
        this.plusMinusAttr(attr, target, -1);
      };
    }); 
  }

  plusMinusAttr(attr, target, direction) {
    const base = target.querySelector('#base');
    let newVal = attr.base + (attr.increment * direction);
    if (newVal % 1 !== 0) { newVal = parseFloat(newVal.toFixed(2)) };
    attr.base = newVal;
    base.innerText = attr.display();

    const age = document.querySelector('#age');
    const newAge = this.age + (attr.cost * direction);
    age.innerText = newAge;
    this.age = newAge;
  };
};

export default Character;