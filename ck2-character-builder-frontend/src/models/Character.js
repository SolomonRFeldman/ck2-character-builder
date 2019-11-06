import Attribute from './Attribute.js'

const CHARACTER_ATTR = {
  diplomacy: (base) => new Attribute(base, 5, 1, 1),
  martial: (base) => new Attribute(base, 5, 1, 1),
  stewardship: (base) => new Attribute(base, 5, 1, 1),
  intrigue: (base) => new Attribute(base, 5, 1, 1),
  learning: (base) => new Attribute(base, 5, 1, 1),
  health: (base) => new Attribute(base, 5, 0.1, 1, (attr) => attr.base.toFixed(2) + ` ( ${attr.effective.toFixed(2)} )`),
  fertility: (base) => new Attribute(base, 50, 5, 1, (attr) => attr.base + '%' + ` ( ${attr.effective}% )`),
  sons: (base) => new Attribute(base, 0, 1, 3, (attr) => attr.base),
  daughters: (base) => new Attribute(base, 0, 1, 2, (attr) => attr.base)
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
  constructor(attributes = DEFAULT_ATTR, traits) {
    this.attributes = {}
    for(const attr in DEFAULT_ATTR) { this.attributes[attr] = CHARACTER_ATTR[attr](DEFAULT_ATTR[attr]) };
    this.age = this.calculateAge();
  };

  calculateAge() {
    return Object.values(this.attributes).reduce( (age, attr) => {
      return age + ((attr.base - attr.minVal) * (attr.cost / attr.increment));
    }, 16);
  };

  buildCard() {
    const card = document.createElement("div");
    card.setAttribute("style", "width: 800px;");
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