require 'rails_helper'

RSpec.describe CharacterTrait, :type => :model do
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

  let(:opposite_trait) do
    Trait.create({
      name: "Cruel",
      description: <<~DESC.strip,
        This character is an evil sadist, taking pleasure in the suffering of others.
      DESC
      cost: 0,
      effects: {
        morale_damage: 10,
        intrigue: 1,
        diplomacy: -1,
        personal_combat_skill: 3,
        vassal_opinion: -5
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

  let(:character_trait) do
    CharacterTrait.new()
  end

  context "when a valid character and trait exist and their ids are assigned" do
    before do
      character_trait.character_id = valid_character.id
      character_trait.trait_id = valid_trait.id
      character_trait.save
    end

    it "belongs to a character and a trait" do
      expect(character_trait.trait).to eq(valid_trait)
      expect(character_trait.character).to eq(valid_character)
    end
  end

  context "when an education is joined to a character" do
    before do
      character_trait.character_id = valid_character.id
      character_trait.trait_id = valid_education.id
      character_trait.save
    end

    it "is not valid" do
      expect(character_trait).to_not be_valid
    end
  end

  context "when a character is accociated with the same trait twice" do
    before do
      character_trait.character_id = valid_character.id
      character_trait.trait_id = valid_trait.id
      character_trait.save
    end

    it "is not valid" do
      expect(CharacterTrait.create(character_id: valid_character.id, trait_id: valid_trait.id)).to_not be_valid
    end
  end

  context "when a character gets accociated with a trait that is an opposite of one of its current traits" do
    before do
      valid_trait.opposites = [opposite_trait.id]
      opposite_trait.opposites = [valid_trait.id]
      valid_trait.save && opposite_trait.save
      CharacterTrait.create(character_id: valid_character.id, trait_id: valid_trait.id)

      character_trait.character_id = valid_character.id
      character_trait.trait_id = opposite_trait.id
      character_trait.save
    end

    it "is not valid" do
      expect(character_trait).to_not be_valid
    end
  end

end