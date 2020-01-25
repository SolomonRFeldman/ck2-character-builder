require 'rails_helper'

RSpec.describe Trait, :type => :model do
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

  let(:primary_character) do
    Character.create({
      name: "Ragnarr",
      dynasty: "Loðbrók",
      marriage_status: true,
      culture: "Norse",
      religion: "Germanic",
      sex: "Male"
    })
  end

  let(:secondary_character) do
    Character.create({
      name: "William",
      dynasty: "de Normandy",
      marriage_status: true,
      culture: "Norman",
      religion: "Catholic",
      sex: "Male"
    })
  end

  let(:character_trait) { CharacterTrait.new }

  it "is valid with a name, description, cost, group, and effects" do
    expect(valid_trait).to be_valid
  end

  context "when multiple characters have this trait" do
    before do
      valid_trait.characters = [primary_character, secondary_character]
      valid_trait.save
    end

    it "has many characters" do
      expect(valid_trait.characters).to include(primary_character)
      expect(valid_trait.characters).to include(secondary_character)
    end
  end

  context "when a trait is destroyed" do
    before do
      character_trait.trait = valid_trait
      character_trait.character = primary_character
      character_trait.save
      valid_trait.destroy
    end

    it "destroys its character_trait links" do
      expect(CharacterTrait.find_by(id: character_trait.id)).to be_nil
    end
  end

end