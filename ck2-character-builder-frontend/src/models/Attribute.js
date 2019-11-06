class Attribute {
  constructor({ base, minVal = 5, increment = 1, cost = 1, displayFunction = (attr) => attr.base + ` ( ${attr.effective} )` }) {
    this.base = base;
    this.effective = base;
    this.minVal = minVal;
    this.increment = increment;
    this.cost = cost
    this.display = () => displayFunction(this);
  };

  set base(newVal) {
    this.effective += newVal - this.base;
    this._base = newVal;
  };

  get base() { return this._base };
};

export default Attribute;