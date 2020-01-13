export default class Trait {

  constructor({ id, name, type, description, cost, effects, opposites}) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.description = description;
    this.cost = cost;
    this.effects = effects;
    this.opposites = opposites;
  };

  get nameSlug() {
    return this.name.replace(/[ ]/g, '_').replace('-', '').toLowerCase();
  }

}