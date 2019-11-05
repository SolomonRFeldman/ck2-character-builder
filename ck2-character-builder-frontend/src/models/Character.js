const DEFAULT_ATTR = {
  diplomacy: 5,
  martial: 5,
  stewardship: 5,
  intrigue: 5,
  learning: 5
};

const ATTRIBUTE_INCREMENT = {
  diplomacy: 1,
  martial: 1,
  stewardship: 1,
  intrigue: 1,
  learning: 1,
}

class Character {
  constructor(attributes = DEFAULT_ATTR, traits) {
    this.attributes = attributes;
  };

  buildCard() {
    const card = document.createElement("div");
    card.setAttribute("style", "width: 800px;");
    card.setAttribute("class", "card mx-auto my-4");
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
    value.innerHTML = `<span id="base">${this.attributes[attr]}</span>`;
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
      if (parseFloat(target.querySelector('#base').innerText) > 5) {
        this.plusMinusAttr(attr, target, -1);
      };
    }); 
  }

  plusMinusAttr(attr, target, direction) {
    const base = target.querySelector('#base');
    let newVal = parseFloat(base.innerText) + (ATTRIBUTE_INCREMENT[attr] * direction);
    if (newVal % 1 !== 0) { newVal = newVal.toFixed(2) };
    base.innerText = newVal
    this[attr] = newVal
  };
};

export default Character;