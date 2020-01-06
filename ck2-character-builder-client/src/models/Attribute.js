export default class Attribute {
  constructor({ base, minVal = 5, increment = 1, cost = 1, displayFunction = (attr) => attr.base + ` ( ${attr.base + attr.bonus} )` }) {
    this.base = base;
    this.bonus = 0;
    this.minVal = minVal;
    this.increment = increment;
    this.cost = cost
    this.display = displayFunction;
  };
};
