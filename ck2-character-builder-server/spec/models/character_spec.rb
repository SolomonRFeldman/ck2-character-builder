require 'rails_helper'

RSpec.describe Character, :type => :model do
  let(:valid_character) do
    Character.create({
      name: "Ragnarr",
      dynasty: "Loðbrók",
      marriage_status: true,
      culture: "Norse",
      religion: "Germanic",
      sex: "Male"
    })
  end

  let(:valid_character_attribute) do
    CharacterAttribute.create({
      diplomacy: 5,
      martial: 5,
      stewardship: 5,
      intrigue: 5,
      learning: 5,
      health: 5,
      fertility: 50,
      sons: 0,
      daughters: 0
    })
  end

  let(:valid_trait) do
    Trait.create({
      name: "Kind",
      description: <<~DESC.strip,
        This character is kind and full of empathy. \
        The sixth virtue, 'Humanitas', is popular with vassals, but makes for a rather poor Spymaster.
      DESC
      cost: 5,
      effects: {
        intrigue: -2,
        diplomacy: 2,
        personal_combat_skill: -5,
        vassal_opinion: 5,
        same_trait_opinion: 5,
        opposite_trait_opinion: -5
      }
    })
  end

  let(:secondary_trait) do
    Trait.create({
      name: "Hunter",
      description: <<~DESC.strip,
        This character only feels truly alive when killing God's little creatures.
      DESC
      cost: 10,
      effects: {
        pursuit: 20,
        martial: 2,
        diplomacy: 1,
        personal_combat_skill: 10,
        same_trait_opinion: 10
      }
    })
  end

  let(:valid_education) do
    Education.create({
      name: "Amateurish Plotter",
      description: <<~DESC.strip,
        The Amateurish Plotter has received an education emphasizing intrigue skills. Unfortunately, it didn't stick.
      DESC
      cost: 0,
      effects: {
        intrigue: 1,
        stewardship: -1,
        personal_combat_skill: 4
      }
    })
  end

  let(:character_trait) { CharacterTrait.new }

  it "is valid with a name, dynasty, marriage_status, religion, culture, and sex" do
    expect(valid_character).to be_valid
  end

  context "when a valid character has been created" do
    before do
      character = valid_character
      character.character_attribute = valid_character_attribute
      character.traits = [valid_trait, secondary_trait]
      character.education = valid_education
      character.save
    end

    it "can be serialized" do
      serialized_character = CharacterSerializer.new(Character.all.last).to_serialized_json
      expect(serialized_character).to include('"name":"Ragnarr"')
      expect(serialized_character).to include('"dynasty":"Loðbrók"')
      expect(serialized_character).to include('"marriage_status":true')
      expect(serialized_character).to include('"culture":"Norse"')
      expect(serialized_character).to include('"religion":"Germanic",')
      expect(serialized_character).to include('"sex":"Male"')
    end

    it "can serialize it's attributes" do
      expect(CharacterSerializer.new(valid_character).to_serialized_json).to include(valid_character_attribute.to_json(except: [:id, :character_id]))
    end

    it "has one attribute set" do
      expect(valid_character.character_attribute).to eq(valid_character_attribute)
    end

    it "has many traits" do
      expect(valid_character.traits).to include(valid_trait)
      expect(valid_character.traits).to include(secondary_trait)
    end

    it "can serialize its traits" do
      expect(CharacterSerializer.new(valid_character).to_serialized_json).to include(valid_trait.to_json)
      expect(CharacterSerializer.new(valid_character).to_serialized_json).to include(secondary_trait.to_json)
    end

    it "belongs to an education" do
      expect(valid_character.education).to be(valid_education)
    end

    it "can serialize its education" do
      expect(CharacterSerializer.new(valid_character).to_serialized_json).to include(valid_education.to_json)
    end
  end

  context "when a character has a default trait set as its education" do
    before do
      valid_character.education_id = valid_trait.id
      valid_character.save
    end

    it "fails to validate" do
      expect(valid_character).to_not be_valid
    end
  end

  context "when a character is destroyed" do
    before do
      valid_character.character_attribute = valid_character_attribute
      valid_character.save
      character_trait.trait = valid_trait
      character_trait.character = valid_character
      character_trait.save
      valid_character.destroy
    end

    it "destroys its character_trait links" do
      expect(CharacterTrait.find_by(id: character_trait.id)).to be_nil
    end

    it "destroys its character_attributes" do
      expect(CharacterAttribute.find_by(id: valid_character_attribute.id)).to be_nil
    end
  end

end