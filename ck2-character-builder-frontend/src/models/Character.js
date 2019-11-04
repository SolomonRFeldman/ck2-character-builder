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
    card.append(this.buildAttrs());
    return card;
  };

  buildAttrs() {
    const list = document.createElement("ul");
    list.setAttribute('class', 'list-group');
    for(const attr in this.attributes) {
      const item = document.createElement("li");
      item.setAttribute('class', 'list-group-item');
      item.innerHTML = `${attr[0].toUpperCase() + attr.slice(1)}: <div class="float-right">${this.attributes[attr]}</div>`;
      list.append(item);
    };
    return list;
  };
};

export default Character;