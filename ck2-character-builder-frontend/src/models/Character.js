import Attribute from './Attribute.js'

const DEFAULT_ATTR = {
  diplomacy: new Attribute(5, 5, 1, 1),
  martial: new Attribute(5, 5, 1, 1),
  stewardship: new Attribute(5, 5, 1, 1),
  intrigue: new Attribute(5, 5, 1, 1),
  learning: new Attribute(5, 5, 1, 1),
  health: new Attribute(5, 5, 0.1, 1, (value) => value.toFixed(2)),
  fertility: new Attribute(50, 50, 5, 1, (value) => value + '%'),
  sons: new Attribute(0, 0, 1, 3),
  daughters: new Attribute(0, 0, 1, 2)
};

class Character {
  constructor(attributes = DEFAULT_ATTR, traits) {
    this.attributes = attributes;
    this.age = this.calculateAge();
  };

  calculateAge() {
    return Object.values(this.attributes).reduce( (age, attr) => {
      return age + ((attr.value - attr.minVal) * (attr.cost / attr.increment));
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
    item.append(this.buildAttrValue(attr));
    return item;
  }

  buildAttrValue(attr) {
    const value = document.createElement('div');
    value.setAttribute('class', 'float-right');
    value.innerHTML = `<span id="base">${this.attributes[attr].display(this.attributes[attr].value)}</span>`;
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
      if (parseFloat(target.querySelector('#base').innerText) > this.attributes[attr].minVal) {
        this.plusMinusAttr(attr, target, -1);
      };
    }); 
  }

  plusMinusAttr(attr, target, direction) {
    const base = target.querySelector('#base');
    let newVal = this.attributes[attr].value + (this.attributes[attr].increment * direction);
    if (newVal % 1 !== 0) { newVal = parseFloat(newVal.toFixed(2)) };
    this.attributes[attr].value = newVal;
    base.innerText = this.attributes[attr].display(this.attributes[attr].value);

    const age = document.querySelector('#age');
    const newAge = this.age + (this.attributes[attr].cost * direction);
    age.innerText = newAge;
    this.age = newAge;
  };
};

export default Character;