import Attribute from './Attribute.js'

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

class Character {
  constructor(attributes = DEFAULT_ATTR, traits, name = "", dynasty = "") {
    this.attributes = {}
    this.name = name;
    this.dynasty = dynasty;
    for(const attr in DEFAULT_ATTR) { this.attributes[attr] = CHARACTER_ATTR[attr](DEFAULT_ATTR[attr]) };
    this.age = this.calculateAge();
  };

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
        <span id="name">${this.name} </span>
        <span id="dynasty">${this.dynasty}</span>
      </div>
      <div class="card-body p-0">
        <div class="card"><div class="card-body" style="height: 198px;"></div><div>
        <div class="card"><div class="card-body" style="height: 150px;"></div><div>
        <div class="card"><div class="card-body" style="height: 150px;"></div><div>
      </div`
    const cardBody = card.children[1]
    return card
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