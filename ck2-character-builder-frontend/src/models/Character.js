const DEFAULT_ATTR = {
  diplomacy: 5,
  martial: 5,
  stewardship: 5,
  intrigue: 5,
  learning: 5
};

class Character {
  constructor(attributes = DEFAULT_ATTR, traits) {
    this.attributes = attributes
  };
};

export default Character;