class Attribute {
  constructor(value, minVal, increment, cost, displayFunction = (value) => this.value) {
    this.value = value;
    this.minVal = minVal;
    this.increment = increment;
    this.cost = cost
    this.display = displayFunction
  };
};

export default Attribute;