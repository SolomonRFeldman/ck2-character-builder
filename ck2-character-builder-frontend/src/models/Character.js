const DEFAULT_ATTR = {
  diplomacy: 5,
  martial: 5,
  stewardship: 5,
  intrigue: 5,
  learning: 5
};

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
    value.innerText = this.attributes[attr];
    return value;
  }
};

export default Character;