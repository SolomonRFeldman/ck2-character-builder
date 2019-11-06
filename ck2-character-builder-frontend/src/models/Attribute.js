class Attribute {
  constructor(base, minVal, increment, cost, displayFunction = (value) => value) {
    this.base = base;
    this.minVal = minVal;
    this.increment = increment;
    this.cost = cost
    this.display = displayFunction
  };
};

export default Attribute;