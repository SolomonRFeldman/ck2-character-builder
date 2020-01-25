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

end