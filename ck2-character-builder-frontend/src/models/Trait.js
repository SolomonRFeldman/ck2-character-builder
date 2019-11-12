class Trait {

  constructor({ name, description, cost, effects, opposites}) {
    this.name = name;
    this.description = description;
    this.cost = cost;
    this.effects = effects;
    this.opposites = opposites;
  };

  static all(callback = () => {}) {
    return fetch(`http://localhost:3000/traits`).then((response) => { return response.json() }).then((json) => {
      const traits = json.map((trait) => new Trait(trait));
      callback(traits);
    });
  };

};

export default Trait;