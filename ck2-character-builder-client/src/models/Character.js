import Attribute from "./Attribute";

const displayHealth = (attr) => attr.base.toFixed(2) + ` ( ${(attr.base+ attr.bonus).toFixed(2)} )`;
const displayFertility = (attr) => attr.base + `% ( ${attr.base + attr.bonus}% )`;
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

export default class Character {
  constructor({ 
      character_attribute = DEFAULT_ATTR,
      name = "", 
      dynasty = "",
      id
    } = {}) {

    this.attributes = {}
    this.id = id;
    this.name = name;
    this.dynasty = dynasty;
    
    for(const attr in DEFAULT_ATTR) { this.attributes[attr] = CHARACTER_ATTR[attr](character_attribute[attr]) };
    this.age = this.calculateAge()
  }

  calculateAge() {
    let age = Object.values(this.attributes).reduce( (age, attr) => {
      return age + ((attr.bonus + attr.base - attr.minVal) * (attr.cost / attr.increment))
    }, 16)
    return Math.round(age)
  }
}